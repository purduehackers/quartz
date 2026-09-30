---
title: "Server admin guide"
---

# Creating new user accounts {toggle="true"}
	<callout icon="⚠️" color="red_bg">
		**Do not use ****`useradd`****!**
	</callout>
	Use `sudo manage-users create` to add a new user account. Run with `--help` to see options.
	<callout icon="⚠️" color="yellow_bg">
		If the command fails, notify <mention-user url="user://05bbe8bd-8617-4aef-b990-0bcd7c353939"/> and **include the output** of the command.
	</callout>
	This will create the user account, create a Caddy drop-in config file to set up their web hosting, create their `~/www` directory with the right FACLs, and if provided, populate their `~/.ssh/authorized_keys`.
	The user will get a random initial password, which will be logged by the `manage-users` script. Give this to them. PAM will require them to change it upon first login.
	Make sure to add the user on Discord to the “Server users” role.
# Creating project accounts {toggle="true"}
	Similar to creating new users. Use `sudo manage-users create --project`.
	The `--quota-soft` and `--quota-hard` options apply to project accounts, as one purpose for projects is more storage space than a normal user account gets.
	Note that the LV mounted on `/proj` only has 64 GiB of space, so large projects will need their own LV created and mounted manually.
# Adding users to project groups {toggle="true"}
	Use `sudo manage-users add-to-project <project> <user>`.