---
title: "Server admin guide"
---

# Creating new user accounts {toggle="true"}
	<callout icon="⚠️" color="red_bg">
		**Do not use ****`useradd`****!**
	</callout>
	Use `manage-users create` to add a new user account. Run with `--help` to see options.
	This will create the user account, create a Caddy drop-in config file to set up their web hosting, create their `~/www` directory with the right FACLs, and if provided, populate their `~/.ssh/authorized_keys`.
	The user will get a random initial password, which will be logged by the `manage-users` script. Give this to them. PAM will require them to change it upon first login.