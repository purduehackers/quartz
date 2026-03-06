import { AgentFS } from "agentfs-sdk"
import { connect } from "@tursodatabase/serverless"
import { rm, mkdir } from "node:fs/promises"
import { join } from "node:path"

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

async function main() {
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const tursoToken = process.env.TURSO_AUTH_TOKEN

  if (!tursoUrl) {
    console.error("TURSO_DATABASE_URL environment variable is required")
    process.exit(1)
  }

  const db = new RemoteDatabase(tursoUrl, { authToken: tursoToken })
  type DatabasePromise = Parameters<typeof AgentFS.openWith>[0]
  const agent = await AgentFS.openWith(db as unknown as DatabasePromise)

  console.log("Fetching pages from cache...")
  const entries = await agent.kv.list("page:")
  const pages = entries.map((e) => e.value as CachedPage)

  console.log(`Found ${pages.length} pages`)

  await rm(CONTENT_DIR, { recursive: true, force: true })
  await mkdir(CONTENT_DIR, { recursive: true })

  let written = 0
  for (const page of pages) {
    const filePath = join(CONTENT_DIR, `${page.path}.md`)
    const dir = join(filePath, "..")
    await mkdir(dir, { recursive: true })

    const frontmatter = `---\ntitle: "${page.title.replace(/"/g, '\\"')}"\n---\n\n`
    await Bun.write(filePath, frontmatter + page.content)
    written++
  }

  console.log(`Done! ${written} pages written`)

  await db.close()
}

main()
