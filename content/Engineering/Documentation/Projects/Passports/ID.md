---
title: "ID"
---

The universal, passport-based authentication system for Purdue Hackers.
## Key Information
- **Status**: Active
- **Maintainer**: Jack
## Quick Links
- [Main Repo](https://github.com/purduehackers/id)
- [Example Implementation](https://github.com/purduehackers/id-next-auth-example)
## Important Information
Currently adding new clients is a manual process. You must open a PR with a new client in `src/lib.rs`. Only add the scopes you need!
## Design Doc
- **DRI**: Jack
### Objective
Create a universal authentication system for Purdue Hackers.
### Background
Many Purdue Hackers projects necessitate keeping track of people's identities (e.g. passports) or signing into an interface (e.g. issuing office). Instead of using external services Purdue Hackers should use their own internal system based around passports and make it available to anyone who wants to use it.
### Requirements
- OAuth & [OIDC](https://openid.net/specs/openid-connect-core-1_0.html) compatibility
	- Usable with popular JS auth libs
	- Easy to implement
- Usable in a secure manner when necessary, configurable on a per-client basis
	- Some sites could require 2FA for all sign ins
	- Use either TOTP or Webauthn
- Store passport data and manage which one is active for each user
- A user management interface
- Metrics and event logging
- Groups integration through OIDC spec
### Architecture & Implementation
The server runs [Oxide Auth](https://github.com/HeroicKatora/oxide-auth), an OAuth server written in Rust. It interacts with the main database and manages all authentication requests.
### Data Model
Each user can have an arbitrary number of passports associated with them but only one can be active at any given time. Passports are registered through Passport Ceremonies.
### User Interface
A basic interface asks the user if they want to approve the connection with the target app and lists the scopes being requested after they verify passport ownership. Passport ownership is verified by entering the passport number then scanning the passport with a phone.
The user management system allows users to enroll/unenroll from 2FA and manage their profile. The admin side allows arbitrary user operations.
### Security
Passports on their own are not secure since they just use basic NFC tags. For most applications this is fine but for high-security apps, 2FA can be required. Sessions can be upgraded to 2FA-authenticated.
### Milestones
- User management
- Arbitrary user 2FA enrollment
- Advanced client management system
- Metrics and events active
- Groups API
- Future: Policies system