---
title: "Beacons"
---

Shining a spotlight on the cool projects being worked on at Hack Night.
## Key Information
- **Status**: In Progress
- **Maintainer**: Jack
## Design Doc
- **DRI**: Jack
### Objective
Increasing project discoverability and social interaction outside of traditional groups at Hack Night.
### Background
Hack Night always has something interesting going on, but it's very difficult to know about projects outside of a few specific instances (mainly Checkpoints). This leads to projects being worked on by a very small group of people and lost potential social interactions and friendships.
#### Existing Solutions
- Posters at the entrance where people write what they're working on (too hard to maintain)
- Erasable mini-cards for projects placed next to each person (hard to find)
### Requirements
- Make people's projects discoverable with an easy-to-use interface
- Rechargeable batteries for portability
- Self-updates
- Know what someone is working on using either the beacon display or the web interface
- Easy construction
- Cheap-ish material cost for mass-producibility
### Design
#### Physical
A small device that can be taken anywhere in Hack Night and display basic information. Each beacon's ID is prominently displayed on the front alongside a short description of the project being worked on. A light on an extendable pole can be used to ping a beacon from the web interface to find it.
![The concept for Beacons](https://raw.githubusercontent.com/purduehackers/evergreen/main/engineering/beacons/images/concept.jpeg)
#### User Interface
A web interface for configuring each beacon with a description of the project. After each Hack Night the interface resets.
#### Deployment
Each Hack Night the beacons are left out in a prominent place. Attendees take and configure them and set them next to their spot. After Hack Night they are collected and recharged.
### Milestones
- Circuitry prototyping: Creating the circuit using a breadboard (few weeks)
- Full hardware design: Creating the final PCB and the CAD (a month)
- Final prototype assembly: Putting everything together and debugging (few weeks)
- Software: Writing the web interface (a week)
## Troubleshooting
To be completed later.