---
title: "Squid - ID revamp"
---

We assign the name **squid** to distinguish from the current id. The reasoning behind the name is its ending in **id **& squids’ 8 arms symbolizing wider reach and deeper integration across other modules. Also homage to Jack. After it is implemented, we can go back to calling it just **id**.
# Auth
The only way of signing up should be through Discord since all of our members are on Discord and discord membership is what counts as club membership for official purposes. However, users can also add other integrations such as
1. Passports (optional)
2. GitHub (optional)
3. Email (optional for communications/newsletters(?))
# Roles
Although inconvenient to have two sources of truth for roles (Discord roles and ID), ID should definitely own that information. Making it pull from Discord roles would be awkward, so the options are to either accept this reality or to make ID the source of truth and through a Discord bot, automatically assign the roles when they are changed in ID.
# Authentication schema
User IDs will be migrated to UUID v7.
# Dashboard
<empty-block/>
# Stamps
A person could have their stamps in their virtual passport as well, automatically assigned by the door opener or manually assigned to avoid desynchronization.
<empty-block/>
<empty-block/>