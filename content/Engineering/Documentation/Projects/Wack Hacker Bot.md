---
title: "Wack Hacker Bot"
---

Wack Hacker is a Discord Bot in the Purdue Hackers Discord server. It is multi-functional and meant to be interacted with by both members of the community and organizers.
## Quick Links
- [Github Repo](https://github.com/purduehackers/wack-hacker)
## Key Information
- **Status**: Active
- **Maintainer**: Ray Arayilakath (@rayhanadev)
## Getting Started
1. Clone the repository:
```bash
git clone https://github.com/purduehackers/wack-hacker.git
cd wack-hacker
```
1. Install the dependencies:
```bash
bun install
```
## Usage
```bash
bun dev
```
## Design Doc
- **DRI**: Ray
### Objective
Wack Hacker is meant to provide access to multiple utilities and tools that are useful for organizers and community members via Discord commands and interactions.
### Background
Wack Hacker was created because we used to use a Discord bot called @nightcrawler for everything related to Purdue Hackers, however I didn't have easy access to the codebase nor the Discord bot itself, so I created a new bot to develop on.
### Architecture
- **Language**: TypeScript (Bun)
- **Dependencies**: `discord.js`
- **Hosting**: [Fly.io](http://Fly.io), deployed via GitHub Actions
### Implementation
Wack Hacker uses Discord.js v14. It hooks into external APIs such as OpenAI and Groq for certain AI features. It uses a Tigris KV store on [Fly.io](http://Fly.io) for data persistence. Designed to be extensible and easy to add new commands to.
## Troubleshooting
If you encounter any issues, please create an issue on the [Github Repo](https://github.com/purduehackers/wack-hacker/issues).
<page url="https://www.notion.so/309181f3b6ed81f4a41fc47f554f8f34">Birthdays</page>
<page url="https://www.notion.so/309181f3b6ed81d09f1cf1324c9b703f">Evergreen It</page>
<page url="https://www.notion.so/309181f3b6ed819fac23ef131655489b">Summarize</page>
<page url="https://www.notion.so/309181f3b6ed81e9b427fdb4e15ad3b6">Transcription</page>