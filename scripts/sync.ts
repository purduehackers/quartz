import { createClient, type TreeNode } from "@rayhanadev/notion-fs"
import { rm, mkdir } from "node:fs/promises"
import { join } from "node:path"

const CONTENT_DIR = join(import.meta.dirname, "..", "content")

const ROOT_DOCUMENTS: Record<string, string> = {
  Home: "282181f3b6ed80ef94cdcae7e3ccf865",
  Design: "282181f3b6ed801ab5b7c1bd370febac",
  Engineering: "282181f3b6ed80a287baf7a1945b72a7",
  Comms: "282181f3b6ed80c5b09fec1f8b2997ef",
  Finances: "282181f3b6ed80c8b694daa51b155b7d",
  Events: "282181f3b6ed800c8878ee011d80784a",
}

function sanitize(name: string): string {
  return name.replace(/[/\0]/g, "_").trim() || "Untitled"
}

interface PageInfo {
  id: string
  path: string
  title: string
}

function collectPages(node: TreeNode, parentPath: string): PageInfo[] {
  const name = sanitize(node.title)
  const path = `${parentPath}/${name}`
  const pages: PageInfo[] = [{ id: node.id, path, title: node.title }]
  for (const child of node.children) {
    pages.push(...collectPages(child, path))
  }
  return pages
}

async function fetchBatch<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  concurrency: number,
): Promise<R[]> {
  const results: R[] = []
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency)
    const batchResults = await Promise.all(batch.map(fn))
    results.push(...batchResults)
  }
  return results
}

async function main() {
  const token = process.env.NOTION_API_TOKEN
  if (!token) {
    console.error("NOTION_API_TOKEN environment variable is required")
    process.exit(1)
  }

  const client = createClient({ token })

  console.log("Walking workspace trees...")
  const trees = await Promise.all(
    Object.entries(ROOT_DOCUMENTS).map(async ([name, id]) => ({
      name,
      tree: await client.walk(id),
    })),
  )

  const allPages: PageInfo[] = []
  for (const { name, tree } of trees) {
    allPages.push(...collectPages(tree, `/${name}`))
  }

  console.log(`Found ${allPages.length} pages`)

  // Clean and recreate content directory
  await rm(CONTENT_DIR, { recursive: true, force: true })
  await mkdir(CONTENT_DIR, { recursive: true })

  console.log("Fetching page contents...")
  let fetched = 0
  let errors = 0

  await fetchBatch(
    allPages,
    async (page) => {
      try {
        const content = await client.read(page.id)
        const filePath = join(CONTENT_DIR, `${page.path}.md`)
        const dir = join(filePath, "..")
        await mkdir(dir, { recursive: true })

        const frontmatter = `---\ntitle: "${page.title.replace(/"/g, '\\"')}"\n---\n\n`
        await Bun.write(filePath, frontmatter + content)

        fetched++
        if (fetched % 10 === 0) {
          console.log(`  ${fetched}/${allPages.length} pages fetched`)
        }
      } catch (err) {
        console.error(`Failed to fetch ${page.path}: ${err}`)
        errors++
      }
    },
    10,
  )

  console.log(`\nDone! ${fetched} pages written, ${errors} errors`)
}

main()
