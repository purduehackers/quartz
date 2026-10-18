---
title: "Arhan - podman stuff"
---

If you want a long-running Podman container or service that restarts reliably across system reboots, we recommend using a Podman Quadlet, which help manage your containers using systemd. You may refer to the [documentation](https://docs.podman.io/en/latest/markdown/podman-container.unit.5.html) for helpful information; setting up a Quadlet is usually just a one-to-one translation of a `podman run` command.
For example, say you want to deploy a [FreshRSS](https://github.com/FreshRSS/FreshRSS/tree/edge/Docker) container. We want to translate the following `podman run` command to a Quadlet:
```javascript
podman run -d --restart unless-stopped
	-p <YOUR_PORT>:80
	-e TZ=America/Indiana/Indianapolis
	-e CRON_MIN=1,31
	-v freshrss_data:/var/www/FreshRSS/data
	-v freshrss_extensions:/var/www/FreshRSS/extensions
	freshrss/freshrss:edge
```
The rough equivalent is:
`freshrss.container`
```javascript
[Unit]
Description=FreshRSS Quadlet

[Container]
Image=freshrss/freshrss:edge
PublishPort=127.0.0.1:<YOUR_PORT>:80
Environment=TZ=America/Indiana/Indianapolis
Environment=CRON_MIN=1,31
Volume=freshrss_extensions:/var/www/FreshRSS/extensions
Volume=freshrss_data:/var/www/FreshRSS/data

[Install]
WantedBy=default.target
```
Which can be installed using:<br><br>`$ podman quadlet install freshrss.container` 
<empty-block/>