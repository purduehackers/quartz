---
title: "Id"
---

ID is Purdue Hackers' identity and authentication provider: the **OpenID Connect (OIDC) provider** behind Purdue Hackers applications, living at [purduehackers/id](https://github.com/purduehackers/id) and deployed at [id.purduehackers.com](https://id.purduehackers.com). The **squid** revamp described below is now the repo's main implementation: a Deno-based OIDC provider that other apps sign in with.
## Current state (November 2026)
- Enhanced user profiles and catalogue: given/family name splitting, international phone numbers, custom profile pictures with a cropper, alumni status and graduation terms
- A directory API with `directory:roles`, `directory:contact` and `directory:discord` scopes, serving the new <mention-page url="https://app.notion.com/p/417181f3b6ed810fa592d31873fcfafb">Directory</mention-page> app; includes verified secondary emails
- Security emails, a red sign-out button, a "visit directory" button, and an animated passport scan page
- Versioned Drizzle migrations run on the production build
<page url="https://app.notion.com/p/31b181f3b6ed802c9237e29f18f99452">Integrating ID with Your Project</page>
<page url="https://app.notion.com/p/3d8181f3b6ed809c9662fea7b5063caf">Squid - ID revamp</page>