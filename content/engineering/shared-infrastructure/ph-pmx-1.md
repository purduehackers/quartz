---
title: "ph-pmx-1"
---

# Custom configuration on Proxmox host
<details>
<summary>Enabled zswap</summary>
	Zswap acts like a cache for the swap device which compresses pages in-memory instead of writing them to the HDD.
	Added `/etc/tmpfiles.d/zswap.conf`, which writes the configuration parameters to the proper sysfs files in order to configure and enable the zswap module. Also sets `vm.swappiness` to 90 since we should prefer swapping (which now just means compressing pages) over purging I/O cache pages.
</details>