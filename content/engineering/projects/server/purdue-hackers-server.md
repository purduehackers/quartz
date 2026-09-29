---
title: "Purdue Hackers server"
---

The server is a Linux machine which Purdue Hackers members can use to run experiments, host services, serve websites, etc.
# Specs
<table>
<colgroup>
<col width="239.66666666666666">
<col width="239.66666666666666">
</colgroup>
<tr>
<td>Hardware</td>
<td>Dell PowerEdge R710</td>
</tr>
<tr>
<td>OS</td>
<td>Rocky Linux 9</td>
</tr>
<tr>
<td>Storage</td>
<td>HDD, RAID 5, \~1 TB</td>
</tr>
<tr>
<td>Memory</td>
<td>32 GB DDR3 1066 MT/s</td>
</tr>
<tr>
<td>CPU</td>
<td>2x 12-core Intel Xeon X5650 @ 2.67GHz</td>
</tr>
</table>
# Rules
1. **Be reasonable.**
2. **Respect other users of the server.**
	E.g. don’t use up all of the memory/CPU/network bandwidth for prolonged amounts of time.
3. **No illegal activities.**
	Do not use the server to torrent copyrighted media, hack into things without authorization, etc.
4. **Don’t do anything that might get our IP address blocked.**
	Do not send spam emails (or even large amounts of non-spam email) from the server, don’t do aggressive web scraping, etc.
5. **If you’re unsure about anything, ask.**
	If you want to do something that might violate one of the rules above, ask us. Or if you think it doesn’t violate the rules but it’s close, please let us know anyways.
# Guides
## Resource limits {toggle="true"}
	Your user account has resource limits, in order to try to avoid one user starving others of resources.
	### Storage
	You have a storage quota of **5 GiB** in your home directory. You can exceed this limit and use up to **10 GiB** for **1 week**.
	If you need more storage, e.g. for a specific project, we can create a project directory for you. Just let us know how much you need and for how long, and as l