import { AgentFS } from "agentfs-sdk"
import { connect } from "@tursodatabase/serverless"
import { rm, mkdir, readFile } from "node:fs/promises"
import { join, dirname } from "node:path"
import slugify from "@sindresorhus/slugify"

const CONTENT_DIR = join(import.meta.dirname, "..", "content")

interface CachedPage {
  id: string
  path: string
  title: string
  content: string
  lastEditedTime: string
  cachedAt: string
}

class RemoteDatabase {
  private config: { url: string; authToken?: string }
  private conn: ReturnType<typeof connect>

  name = ""
  readonly = false
  open = true
  memory = false
  inTransaction = false

  constructor(url: string, options?: { authToken?: string }) {
    this.config = { url, authToken: options?.authToken }
    this.conn = connect(this.config)
  }

  async connect(): Promise<void> {}

  prepare(sql: string) {
    const config = this.config
    return new RemoteStatement(config, sql)
  }

  async exec(sql: string): Promise<void> {
    await this.conn.exec(sql)
  }

  async close(): Promise<void> {
    await this.conn.close()
  }

  transaction(fn: (...args: any[]) => Promise<any>) {
    return async (...args: any[]) => {
      await this.exec("BEGIN")
      try {
        const result = await fn(...args)
        await this.exec("COMMIT")
        return result
      } catch (e) {
        await this.exec("ROLLBACK")
        throw e
      }
    }
  }

  async pragma(): Promise<any[]> {
    return []
  }

  backup(): void {}
  serialize(): void {}
  function(): void {}
  aggregate(): void {}
  table(): void {}
  loadExtension(): void {}
  maxWriteReplicationIndex(): void {}
  interrupt(): void {}
  defaultSafeIntegers(): void {}
  async io(): Promise<void> {}
}

class RemoteStatement {
  private config: { url: string; authToken?: string }
  private sql: string

  constructor(config: { url: string; authToken?: string }, sql: string) {
    this.config = config
    this.sql = sql
  }

  private async prepare() {
    const conn = connect(this.config)
    return conn.prepare(this.sql)
  }

  async run(...bindParameters: any[]) {
    const stmt = await this.prepare()
    return stmt.run(bindParameters)
  }

  async get(...bindParameters: any[]) {
    const stmt = await this.prepare()
    return stmt.get(bindParameters)
  }

  async all(...bindParameters: any[]) {
    const stmt = await this.prepare()
    return stmt.all(bindParameters)
  }

  async *iterate(...bindParameters: any[]): AsyncGenerator<any, void, unknown> {
    const stmt = await this.prepare()
    yield* stmt.iterate(bindParameters)
  }

  raw() {
    return this
  }

  pluck() {
    return this
  }

  safeIntegers() {
    return this
  }

  bind() {
    return this
  }

  columns(): any[] {
    return []
  }

  get reader(): boolean {
    return false
  }

  get source(): void {
    return undefined
  }

  close(): void {}
  interrupt(): void {}
}

interface FileEntry {
  path: string // relative path without extension, e.g. "Comms/Documentation/Guide"
  title: string
  content: string
}

type Transform = (files: FileEntry[]) => FileEntry[]

/**
 * If a file has the same name as a folder (e.g. Documentation.md and Documentation/),
 * move Documentation.md -> Documentation/index.md
 */
const indexNormalization: Transform = (files) => {
  const folderPaths = new Set<string>()
  for (const file of files) {
    const dir = dirname(file.path)
    let current = dir
    while (current && current !== "." && current !== "/") {
      folderPaths.add(current)
      const parent = dirname(current)
      if (parent === current) break
      current = parent
    }
  }

  return files.map((file) => {
    if (folderPaths.has(file.path)) {
      return { ...file, path: join(file.path, "index") }
    }
    return file
  })
}

/**
 * If a folder contains a "Documentation" subfolder, merge it up.
 * e.g. content/Comms/Documentation/Guide -> content/Comms/Guide
 */
const rootNormalization: Transform = (files) => {
  return files.map((file) => {
    const parts = file.path.split("/")
    const docIndex = parts.indexOf("Documentation")
    if (docIndex !== -1) {
      parts.splice(docIndex, 1)
      return { ...file, path: parts.join("/") }
    }
    return file
  })
}

/**
 * Fix titles of index files to match their parent folder name.
 * e.g. Comms/index with title "Documentation" -> title "Comms"
 */
const fixIndexTitles: Transform = (files) => {
  return files.map((file) => {
    const parts = file.path.split("/")
    if (parts.at(-1) === "index" && parts.length >= 2) {
      return { ...file, title: parts.at(-2)! }
    }
    return file
  })
}

/**
 * Rename top-level folders.
 */
const renameRoots: Transform = (files) => {
  const renames: Record<string, string> = {
    home: "Meta",
  }
  return files.map((file) => {
    const parts = file.path.split("/")
    // paths may have a leading slash, so the root is at index 0 or 1
    const rootIndex = parts[0] === "" ? 1 : 0
    const oldRoot = parts[rootIndex]
    if (!oldRoot) return file
    const renamed = renames[oldRoot.toLowerCase()]
    if (renamed) {
      parts[rootIndex] = renamed
      const newTitle = file.title.toLowerCase() === oldRoot.toLowerCase() ? renamed : file.title
      return { ...file, path: parts.join("/"), title: newTitle }
    }
    return file
  })
}

/**
 * Lowercase and slugify all path segments.
 * e.g. "Comms/Getting Started" -> "comms/getting-started"
 */
const slugifyPaths: Transform = (files) => {
  return files.map((file) => {
    const slugged = file.path
      .split("/")
      .map((segment) => slugify(segment))
      .join("/")
    return { ...file, path: slugged }
  })
}

async function main() {
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const tursoToken = process.env.TURSO_AUTH_TOKEN

  if (!tursoUrl) {
    console.error("TURSO_DATABASE_URL environment variable is required")
    process.exit(1)
  }

  console.log("Connecting to Turso...")
  const db = new RemoteDatabase(tursoUrl, { authToken: tursoToken })
  type DatabasePromise = Parameters<typeof AgentFS.openWith>[0]
  const agent = await AgentFS.openWith(db as unknown as DatabasePromise)

  console.log("Fetching pages from cache...")
  const entries = await agent.kv.list("page:")
  const pages = entries.map((e) => e.value as CachedPage)

  console.log(`Found ${pages.length} pages`)

  const fileEntries: FileEntry[] = pages.map((page) => ({
    path: page.path,
    title: page.title,
    content: page.content,
  }))

  console.log("Running transform pipeline...")

  let transformed = fileEntries
  const steps: { name: string; fn: Transform }[] = [
    { name: "Rename roots", fn: renameRoots },
    { name: "Index normalization", fn: indexNormalization },
    { name: "Root normalization", fn: rootNormalization },
    { name: "Fix index titles", fn: fixIndexTitles },
    { name: "Slugify paths", fn: slugifyPaths },
  ]

  for (let i = 0; i < steps.length; i++) {
    const { name, fn } = steps[i]
    console.log(`  [${i + 1}/${steps.length}] ${name}...`)
    const before = transformed
    transformed = fn(transformed)
    const changes = transformed.filter((f, j) => f.path !== before[j].path)
    for (const f of changes) {
      const original = before[transformed.indexOf(f)]
      console.log(`    ${original.path} -> ${f.path}`)
    }
    console.log(`  ${changes.length} files renamed`)
  }

  // Preserve content/index.md since it's not generated
  const indexPath = join(CONTENT_DIR, "index.md")
  let indexContent: string | null = null
  try {
    indexContent = await readFile(indexPath, "utf-8")
  } catch {}

  await rm(CONTENT_DIR, { recursive: true, force: true })
  await mkdir(CONTENT_DIR, { recursive: true })

  if (indexContent !== null) {
    await Bun.write(indexPath, indexContent)
  }

  console.log("Writing files...")
  let written = 0
  for (const file of transformed) {
    const filePath = join(CONTENT_DIR, `${file.path}.md`)
    const dir = dirname(filePath)
    await mkdir(dir, { recursive: true })

    const frontmatter = `---\ntitle: "${file.title.replace(/"/g, '\\"')}"\n---\n\n`
    await Bun.write(filePath, frontmatter + file.content)
    written++
  }

  console.log(`Done! ${written} pages written`)

  await db.close()
  process.exit(0)
}

main()
