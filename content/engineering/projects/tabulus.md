---
title: "Tabulus"
---

*Originally written by @stopwatchtt*
## Design Doc
- **DRI**: @stopwatchtt
### Objective
The goal of this project is creating a Discord bot that can help keep track of attendance at Hack Night.
### Background
#### Problem
- Keeping track of attendance during Hack Night requires people to remember to take attendance, and people are prone to forget to do so.
- Usually attendance is stored by noting a headcount in an attendance thread. Making the thread and sorting through the data is annoying to do by hand.
- Currently we do not have a very accessible central storage location for attendance data, except for threads on Discord, but that is not conducive to being analyzed.
#### Stakeholders
This project is primarily useful for organizers. It would allow organizers to analyze when attendance peaks, when attendance dies down, how this changes per hack night, and therefore allow organizers to predict future attendance.
#### Existing Solutions
The current solution is for an organizer to manually open a thread in Discord in the attendance threads forum. Organizers then have to remember periodically throughout the night to go and perform a headcount.
### Requirements
#### Goals
- Can create threads upon request (or potentially automatically per Hack Night)
- Allow users in a thread to type a single number and have that value be saved
	- The bot should provide active confirmation whenever this happens
- For all members joined into the current attendance thread, the bot should ping everyone every hour to request a headcount
- Command to "end" hack night and save the time when that happens
#### Stretch Goals
- Full functionality for accessing a database of each hack night with attendance values
- Capability to request a line plot of current hack night attendance
- Capability to request a readout of each individual attendance value and the time it was taken
- Capability to adjust attendance values from the current hack night
### Design
- Developed in Python
- Will be ran on Purdue Hackers' Vulcan server
- Attendance data stored in a CSV file
### Milestones
- Some time during Fall 2024: Bot was initially created
- Hack Night 5.15: Bot code will be on Github
- No later than end of February 2025: bot should have all core functionality completed
### Constraints
- It's currently hosted on @stopwatchtt's laptop and needs to be moved to Vulcan