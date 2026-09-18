---
title: "Copyparty"
---

Owner: <mention-user url="user://05bbe8bd-8617-4aef-b990-0bcd7c353939"/> 
Division: Engineering
# Organizer access
There is a “Copyparty” entry in Vaultwarden which contains the password for the `root` user. Please only use the `root` user to [create your own user account](/p/3df181f3b6ed80efbe66eeb9c4a5b32c?pvs=25#3df181f3b6ed8038928cfc77a5e5b478), then do everything through there.
# Adding new users
Log in with an account in the `admins` group. Open `/config/members.conf` for editing.
To add a new user, under the `[accounts]` section, create a new line containing `username: hash`. To generate the hash, use this command (you can run it anywhere that has Docker/Podman, not just on the server):
```bash
docker run -it --rm ghcr.io/9001/copyparty-ac:1.20.23 --ah-alg=argon2 --ah-gen '<username>:<password>'
```
Note that in the above command, there is no space before/after the colon.
When a new user is added, they will automatically get a user site at `<username>.members.purduehackers.com` which they have read/write permissions on. Each user gets a quota of 100 MB.
# Adding a user to the `admins` group
Under the `[groups]` section, add the user to the list following `admins:`. The list should be comma-separated, not just whitespace-separated.
# Do not do these things
- Do not edit or delete any files in `/config` other than `members.conf`.
- Do not put any settings in `/config/members.conf` other than adding new users or adding users to the `admins` group.
- Do not put a plaintext password in `members.conf` without hashing it.
	- This is not just for security reasons. About 1 second will be added to the amount of time it takes the Copyparty server to start for each unhashed password.
- Do not touch anything in the `/sites-direct` volume unless you know what you’re doing.
	- `/sites/X` is the Copyparty volume for user `X`. `/sites-direct` is direct access to the `/var/www/member_sites` directory and all subdirectories, regardless of which users exist or not.
	- It should only be used to delete site directories for users who have been deleted from `members.conf`.