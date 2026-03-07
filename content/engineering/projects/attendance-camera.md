---
title: "Attendance Camera"
---

> This is a draft proposal. It is open to be claimed by anyone interested.
- **DRI**: UNCLAIMED
## Objective
Surveillance state @ Hack Night.
## Background
### Problem
Taking attendance is a very manual process that can interrupt the flow of Hack Night. The attendance camera would automate this process by automatically counting incoming and outgoing Hack Night attendees in a private and secure way.
### Stakeholders
Organizers who take attendance.
### Existing Solutions
- [Tabulus](https://www.notion.so/309181f3b6ed81618f9ec6dcc0343a48) — Still requires manual counting
### Alternative Solutions
- Attendance drone (cool but very complicated)
- Attendance roomba (will get stuck on a cord or a badge)
## Requirements
### Goals
- Count the incoming and outgoing Hack Night attendees automatically on a rolling basis
- Show data in a spreadsheet or dashboard
### Non-Goals
- Send data to the US government (for now)
### Constraints
- All computation must happen on the gadget or Vulcan
- Privacy must be preserved
## Design
The physical implementation will consist of a Raspberry Pi and a camera on top of the ledge facing the main staircase. It will be able to see people going up or down the stairs.
The computation will happen either on the Pi or on Vulcan. It will output data to a source that can be analyzed by organizers.
## Milestones
- Acquire Pi and camera
- Create ML pipeline to count attendees
- Aggregate data in a database
## Security
All computation will be local on Purdue Hackers-owned hardware. No PII will be stored.