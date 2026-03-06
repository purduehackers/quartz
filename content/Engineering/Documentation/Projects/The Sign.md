---
title: "The Sign"
---

The Sign projects the glory of Purdue Hackers wherever there's an outlet and an internet connection. A meter-tall, 3D printed and metal monument that shines out into the night.
## Key Information
- **Status**: Active
- **Maintainer**: Jack
## Quick Links
- [Firmware Repo](https://github.com/purduehackers/sign-firmware)
- [Main Board Repo](https://github.com/purduehackers/sign-pcb)
- [ESP32 to Pico Repo](https://github.com/purduehackers/EspToPico)
## Troubleshooting
If the Sign doesn't successfully turn on, turn it off and turn it back on after a few minutes.
**Boot Status Table**
- Red: Connecting to Wi-Fi
	- If the Sign reboots here ensure `PAL3.0` is available and the credentials on the Sign are assigned from a current student. Sometimes `PAL3.0` is flaky and you may need to wait a few minutes.
- Blue: Checking for updates
	- If the Sign reboots here something is wrong with the Github repo or they changed their API. Contact the maintainer.
- Green: Installing update
	- If the Sign reboots here it either is installing the update (fine) or it lost its connection (wait a few minutes).
## Design Doc
- **DRI**: Jack
### Objective
Project the glory of Purdue Hackers with a monument of our logo, the glider from Conway's Game of Life.
### Background
Up to this point Purdue Hackers projects existed solely in the realm of software. While we were able to make very impressive apps and services, we needed something in the physical world as well. Hardware projects had never been attempted up to that point so exploration was necessary and we had a good idea for what it should look like.
### Requirements
- Take up the entire size of a window in Bechtel (about 1 meter)
- Display Lightning Time
- Be bright enough to see from outside
- Wi-Fi connectivity
- Self-updating
- Initial extendable budget of \$200
- Must be able to assemble with tooling we have access to (3D printing, basic soldering equipment)
### Design
#### Physical
The physical design is created in Fusion 360 then exported into whatever format is necessary for construction.
#### User Interface
The only exposed user interface item is a light-up button. This will print to the receipt printer but could also be used to change profiles or do other tasks.
#### Architecture
The Sign first boots and initializes the LEDs as a status display. It connects to Wi-Fi, checks for firmware updates (and if it finds one installs and reboots), then starts displaying Lightning Time. Code is written in Rust for the ESP32.
### Maintenance
The Sign is designed for low-to-no maintenance operation. It automatically restarts at any fault. Whenever the maintainer graduates, an update needs to be pushed with Wi-Fi credentials from a current student.