---
title: "ph-pmx-1"
---

# Custom configuration on Proxmox host
<details>
<summary>Enabled zswap</summary>
	Zswap acts like a cache for the swap device which compresses pages in-memory instead of writing them to the HDD.
	Added `/etc/tmpfiles.d/zswap.conf`, which writes the configuration parameters to the proper sysfs files in order to configure and enable the zswap module. Also sets `vm.swappiness` to 90 since we should prefer swapping (which now just means compressing pages) over purging I/O cache pages.
</details>
<details>
<summary>Installed Tailscale</summary>
	Installed Tailscale using their installation script. Results in Tailscale binaries and `tailscaled.service` being present.
</details>
<details>
<summary>Tailscale TLS for Proxmox UI</summary>
	Uses Tailscale to generate TLS certificates and configures Proxmox UI to use those for HTTPS.
	Presents as `/usr/local/bin/tailscale-tls-proxmox.sh` and `tailscale-tls-proxmox.{service,timer}` systemd units.
</details>