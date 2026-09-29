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
<td>32 GB, DDR3, 1066 MT/s</td>
</tr>
<tr>
<td>CPU</td>
<td>2× 12-core Intel Xeon X5650 @ 2.67GHz</td>
</tr>
<tr>
<td>Hostname</td>
<td>hackers.student-orgs.purdue.edu</td>
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
## Accessing the server {toggle="true"}
	There are two main ways to access the server.
	### Web console
	Visit [https://server.purduehackers.com](https://server.purduehackers.com) for a web console. You can select the **Terminal** tab to get a shell.
	### SSH
	You can use Secure Shell (SSH) to log in to the server.
	The SSH service is listening on ports 22 and 10022. Port 22 is blocked by Purdue if you’re outside of Purdue’s network, but 10022 should always work.
	```bash
ssh -p 10022 <user>@server.purduehackers.com
	```
	You can add an entry in `~/.ssh/config` on your client device so you don’t have to specify the port every time. If you add the below, you can just run `ssh server.purduehackers.com`.
	```plain text
Host server.purduehackers.com
	User <user>
	Port 10022
	Hostname server.purduehackers.com
	```
## Resource limits {toggle="true"}
	Your user account has resource limits, in order to try to avoid one user starving others of resources.
	### Storage
	You have a storage quota of **5 GiB** in your home directory. You can exceed this limit and use up to **10 GiB** for **1 week**.
	If you need more storage, e.g. for a specific project, we can create a project directory for you. Just let us know how much you need and for how long.
	### Memory
	There is no limit on the amount of memory you can use. However, there are some settings which control what happens when multiple users/services want to use more memory than is available.
	You have a “protected” amount of memory, which is **2 GiB**. If your user is using less than 2 GiB, the system will try to reclaim memory from other users first. It will prioritize those whose memory usage is highest.
	If the system is not able to reclaim memory (see note below), then it may need to kill processes using too much memory. The server is running systemd-oomd, which will kill processes once 40% of time is spent waiting for memory among all user processes. If you are running something memory-intensive and it suddenly dies, this may be why.
	<callout icon="/icons/info-alternate_gray.svg" color="blue_bg">
		<details>
		<summary>**What is memory reclaim?**</summary>
			Allocated memory is categorized into *reclaimable* and *unreclaimable*. Most memory allocated by programs is unreclaimable. Reclaimable memory is most often used for caching. If a program is using some memory just to speed up operations but it can still operate if the data stored in that memory is lost, it may mark the region as reclaimable. Memory used by the kernel to cache filesystem I/O is also reclaimable.
			When the system runs out of memory, the kernel will first try to reclaim memory. Once there is no more reclaimable memory to take back, we enter the second stage described above.
		</details>
	</callout>
	### CPU
	Like memory, there is no hard limit on the amount of CPU you can use. However, if multiple users want to use the CPU, each user’s tasks will receive equal priority. This means if user A wants to use 14 cores and user B wants to use 24, they will each get 12 cores (half of the 24 available). System tasks (such as the web server, SSH server, etc.) have higher priority, so if the system is fully loaded, user tasks will wait for system ones.
	### I/O
	I/O is treated the same way as CPU. There is no limit on the amount of I/O bandwidth you can use, but if multiple users are competing, they will be scheduled fairly, and system tasks will get priority.
## Network {toggle="true"}
	The server has one public IP address (`128.210.6.104` as of <mention-date start="2026-09-29"/>).
	“Public” means that this IP is reachable from the internet. There are firewall rules in place to make some port ranges internet-accessible and some accessible only from Purdue’s network.
	Ports **10000-19999** are **open to the internet**. Ports **20000-29999** are open to **Purdue’s network only**. Ports outside these ranges are not open to the internet (they’re handled on a case-by-case basis, e.g. ports 80 and 443 are open to allow web traffic).
	If you want to host a service that is internet-accessible, make it listen on a port in the first range. If you want to host a service that is open to Purdue’s network only, make it listen on a port in the second range. If you want to host a service that is accessible only from the server itself, you can choose any port, but make it listen on the address `127.0.0.1`, e.g. `127.0.0.1:12345`.
	If you’re using a Podman container, the port you select inside the container doesn’t matter, but the port you forward that to on the host matters. E.g. if your service is listening on port 3000 in the container, you can use `-p 127.0.0.1:12345:3000` to expose this on port 12345 outside the container, but only bound to the local machine.
## Web hosting {toggle="true"}
	There is a Caddy web server running on the server.
	If you want to host a website on the server, you should do so through the central Caddy service. Essentially, web traffic comes in from the internet to Caddy, and Caddy passes it along to your service. Caddy handles things such as TLS certificates (the part that makes HTTPS secure), so you don’t have to worry about handling HTTPS on your end.
	For static websites (i.e. ones with just static files and no running “back-end”), you can just put files in `~/www`. They will be served at `https://<your-username>.members.purduehackers.com`.
	If you want to run a non-static web service, or you want to bring your own domain, let us know. We can configure Caddy to use custom domains or to reverse proxy to your web service.
	<callout icon="/icons/info-alternate_gray.svg" color="blue_bg">
		<details>
		<summary>**Reverse proxy & custom domain example**</summary>
			Let’s say you’re running a Node.js application that listens on port 3000. You want to publish this to the internet as your.domain.com.
			First, you’d set a CNAME DNS record for your domain with a value of [`server.purduehackers.com`](http://server.purduehackers.com). This means when clients look up your domain, the IP address they’ll get is whatever IP address server.purduehackers.com points to.
			Now when someone visits [your.domain.com](http://your.domain.com), the request will come to the Caddy web server. We will add a bit of configuration to Caddy to tell it to handle requests for your.domain.com and to reverse proxy to port 3000. So when such a request comes in, Caddy will handle the HTTPS security, then forward the request using plain HTTP to your Node.js service on port 3000. When your service responds, Caddy will send the response back to the original client over HTTPS.
			You don’t have to do both custom domain and reverse proxying at once. You can do either alone or both.
		</details>
	</callout>
## Hosting long-running services {toggle="true"}
	If you want to run something temporarily, you can just run the command in your shell session. However, if you want to keep a service running indefinitely (e.g. a web application), this won’t work, as it will stop once you log out.
	There are three options:
	1. Use `tmux`, which keeps your shell session open even when you’re not connected.
		This is the easiest, as it follows the exact same workflow as when you run the task in your shell. However it doesn’t take care of collecting logs or restarting the service if it fails.
	2. Create a systemd service running as your user.
		This is the most robust option. Systemd is a service manager which handles starting your task, monitoring it, collecting and storing logs, and optionally restarting it if it fails.
		Note that you’ll need to run `loginctl enable-linger` once to allow systemd to run your services when you’re not logged in.
	3. Have us run a system-level systemd service.
		This should be used for services which may be useful to multiple users, e.g. a database like PostgreSQL or MySQL, as multiple users can connect to one instance rather than each having to run their own.
		If you want a service which can be used by other users as well, let us know and we’ll set it up.
<empty-block/>