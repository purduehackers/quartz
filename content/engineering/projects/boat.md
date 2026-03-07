---
title: "Boat"
---

- **DRI**: Ray
Boat is a custom-built solution to our documentation problem – composing itself of a collection manager, access control management, a paned editor, and documentation web host.
## Background
### Problem
Evergreen is currently composed of two Github repos. There have been many issues with this setup that were laid out in the [Path Forward retrospective](https://www.notion.so/309181f3b6ed81d78e80d777dc4b5f4c). I would like to build us a custom-fit documentation solution that integrates into our existing workflows well and gives us great extensibility into the platform.
### Alternative Solutions Considered
1. **HedgeDoc**: Has instant note creation and collaborative editing, but lacks organization, only allows editing a single note at once, and doesn't have good ACLs.
2. **Quartz + Obsidian**: Improved editing experience but Quartz is ultimately powered by Github as a CMS, posing the same problems. Lacks collaborative editing.
3. **MediaWiki**: Full-fledged wiki software with decent organization and ACLs, but the editor has a learning curve, introduces unnecessary friction, hard to browse, and has bad UI/UX.
## Requirements
### Goals
- Must be able to easily create notes
- Must have authentication to view and edit notes
- Must be able to easily edit notes (zero friction to open, make changes, and view)
	- Must be able to edit multiple notes in one view (projects)
	- Must be able to collaboratively edit
- Must be able to easily access/view notes (outside editor)
- Must be able to define access controls for viewing and editing notes (share links)
- Must be able to easily search notes (knowledgebase search)
### Non-Goals
- Be a project management platform
- Allow users to edit content other than Markdown
	- Exception: Excalidraw integrated into the editor for quick sketches/drawings
### Constraints
- Must be a web interface
- Must be mobile friendly
- Must be low-friction in all processes
- Must be easily browsable
## Design
### Architecture
- **Language**: TypeScript (Bun)
- **Dependencies**: `next.js`, `codemirror`, `postgres`
### Implementation
Inspiration from web IDEs like Replit and Glitch. Frontend in Next.js with `next-auth` for authentication. Data stored in Postgres (`drizzle-orm`). Backend using `elysia` server (Bun runtime) implementing operational transforms (OTs) for collaborative editing.
### Deployment
Hosted on Vulcan.
### Security
Authentication through Passports. ACLs mix of Github and Google Docs styles.
Roles:
- Admin: can manage all aspects of a collection
- Maintainer: can manage permissions and content
- Editor: can create/edit content
- Guest: can temporarily edit certain files
- Viewer: can view content (readonly)
Collections can be published (readonly), public (editable), internal, or fully private.
## Milestones
- Start Date: June 16th, 2025
- Auth + DB Structure: June 18th, 2025
- Dashboard + Collection Management: June 20th, 2025
- CodeMirror Implementation: June 25th, 2025
- WebRTC Collaboration Server: June 29th, 2025
- File Structuring: July 1st, 2025
- Document Web Hosting: July 5th, 2025
- Access Controls: July 7th, 2025
- Document Indexing + Search: July 10th, 2025
## References
- [HedgeDoc](https://github.com/hedgedoc/hedgedoc)
- [Replit](https://replit.com)
- [Obsidian](https://obsidian.md/)
- [iA Writer](https://ia.net/writer)