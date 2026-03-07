---
title: "PDF Concat"
---

This is a script that will concatenate Passport Data Pages in a single PDF file to conserve paper when printing.
## Quick Links
- [Github Repo](https://github.com/rayhanadev/passport-pdf-concat)
## Key Information
- **Status**: Active
- **Maintainer**: Ray Arayilakath (@rayhanadev)
## Getting Started
1. Clone the repository:
```bash
git clone https://github.com/rayhanadev/passport-pdf-concat.git
cd passport-pdf-concat
```
1. Install the dependencies:
```bash
bun install
```
## Usage
```bash
bun run src/index.ts <start> <end>
```
## Design Doc
- **DRI**: Ray
### Objective
Concatenate Passport Data Pages in a single PDF file.
### Problem
When printing Passport Data Pages, it takes forever to find the R2 bucket URL for each file, join them all together into a single file, and print them all. It is also wasteful to print each page individually.
### Architecture
- **Language**: TypeScript (Bun)
- **Dependencies**: `sade`, `satori`, some PDF library
### Data Flow
1. Fetch data for passport pages in a range from `<start>` to `<end>`
2. Render the pages
3. Convert the render into an image
4. Concatenate the images into a single PDF file
5. Provide the final PDF file to the user
### Milestones
- Start Date: September 28th, 2024
- End Date: October 5th, 2024
## Troubleshooting
If you encounter any issues, please create an issue on the [Github Repo](https://github.com/rayhanadev/passport-pdf-concat/issues).