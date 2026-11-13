---
title: "Directory"
---

The Purdue Hackers member directory: a place for members to search and connect with other members and alumni. Built by Artus in the week before the <mention-date start="2026-11-09"/> sync.
Repo: [purduehackers/directory](https://github.com/purduehackers/directory) (TypeScript), deployed at [directory.purduehackers.com](https://directory.purduehackers.com).
## Stack
Bun, Astro 7 (SSR) on Vercel, Tailwind CSS v4 with the Purdue Hackers Components, LibSQL (SQLite/Turso) with Drizzle ORM, and MiniSearch for fuzzy search.
## Features
- Sign-in with Purdue Hackers ID (OIDC + PKCE); all signed-in members have access
- Fuzzy search over full names, @usernames, emails, Discord tags, locations, headlines, bios and majors
- Role (Organizers, Alumni, Admins) and graduation-year filtering
- Member profiles at /u/\[username\], with a customisable Directory-specific profile at /settings/profile (personal website, social accounts, custom links, location, timezone with live clock, headline, bio, major)
- Community profile data lives entirely in Directory's own database and is never synced back to ID
- Server-side caching with automatic invalidation via /api/webhooks/id
## ID integration
1. User sign-in: authorization code + PKCE, scopes `openid profile email roles phone`
2. Data sync: client_credentials against `https://id.purduehackers.com/api/directory` with scopes `directory:roles directory:contact directory:discord`, querying `GET /api/directory/users`