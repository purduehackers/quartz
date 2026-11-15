---
title: "Checkpoints: Admin Guide"
---

For organizers running checkpoints at Hack Night.
## 1. Pages
<table header-row="true">
<colgroup>
<col>
<col>
<col width="289.9375">
</colgroup>
<tr>
<td>Page</td>
<td>Use</td>
<td>Access</td>
</tr>
<tr>
<td>`/`</td>
<td>Join the queue and present</td>
<td>Purdue Hackers ID</td>
</tr>
<tr>
<td>`/admin`</td>
<td>Run the queue, preview shares, control time</td>
<td>ID with organizer role</td>
</tr>
<tr>
<td>`/host`</td>
<td>Projector display</td>
<td>Public</td>
</tr>
<tr>
<td>`/timer`</td>
<td>Speaker-facing countdown</td>
<td>Public</td>
</tr>
</table>
**Admin access**
- Organizer role: request from an ID admin.
- Preview/local without an ID issuer: admin password **123456**; participants can join without ID.
Names and project titles are public. Waiting shares are visible in the admin preview; only the live share appears on the projector.
## 2. Room setup
<table header-row="true">
<colgroup>
<col>
<col>
<col width="302">
</colgroup>
<tr>
<td>Step</td>
<td>Action</td>
<td>Check</td>
</tr>
<tr>
<td>1</td>
<td>Connect the screens to HIVE.</td>
<td>Follow the HIVE checklist; ask Artus or Andres for setup details.</td>
</tr>
<tr>
<td>2</td>
<td>Open `/host` on the projector laptop → **Fullscreen**.</td>
<td>Correct display; playback sound enabled by the click.</td>
</tr>
<tr>
<td>3</td>
<td>Open `/admin` → sign in.</td>
<td>Organizer access; keep this page connected. Use a separate laptop where possible.</td>
</tr>
<tr>
<td>4</td>
<td>**Start checkpoint** → cog → **Settings**.</td>
<td>Limit: **120 seconds**. Quality: **1080p**. Check sound and reactions.</td>
</tr>
<tr>
<td>5</td>
<td>Open `/timer` on the podium-facing display, if available.</td>
<td>Full countdown visible to the speaker.</td>
</tr>
<tr>
<td>6</td>
<td>Run a test presentation with audio.</td>
<td>Correct screen, sound, and timer; then announce the join address.</td>
</tr>
</table>
**Audio controls**
- `/admin` → **Projector sound**: presentation audio.
- `/host` → **Sounds**: time-up buzzer.
- HIVE controls: room audio output and volume.
**Admin title:** double-click the heading to rename it. Enter/click away to save; Escape to cancel. Updates for all admins; does not rename the projector heading.
## 3. Presentation flow
**Sign in → Join → Wait → Called → Start → Present → End → Next person called**
<table header-row="true">
<colgroup>
<col>
<col>
<col width="290">
</colgroup>
<tr>
<td>Stage</td>
<td>Participant / system</td>
<td>Admin action</td>
</tr>
<tr>
<td>**Join**</td>
<td>Sign in; enter name and project; pick a screen or choose **I won’t need to share**. Cancelling the picker leaves them outside the queue.</td>
<td>Confirm their entry appears.</td>
</tr>
<tr>
<td>**Wait**</td>
<td>Queue position shown. First waiting participant sees **You’re next in line!**</td>
<td>Check shares; reorder if needed.</td>
</tr>
<tr>
<td>**Called**</td>
<td>Automatically called when the stage is free. Card: **Getting ready**. Projector: go to the podium.</td>
<td>Let them walk up. Check the preview.</td>
</tr>
<tr>
<td>**Start**</td>
<td>At the podium: press **Start Presenting**. A connecting share finishes connecting before the timer starts.</td>
<td>Use admin **Start** only when they are ready; it starts time even without a share.</td>
</tr>
<tr>
<td>**Present**</td>
<td>Share on the projector, or an in-person display for a presentation without sharing.</td>
<td>Monitor time; pause or extend as needed.</td>
</tr>
<tr>
<td>**End**</td>
<td>Timer reaches zero, participant presses **End my checkpoint**, or admin presses **Stop**.</td>
<td>Next person is called automatically.</td>
</tr>
</table>
### Walking time
- **Countdown between presenters.**
	- Get them to stand up (+2 so 3 people up waiting)
- **Getting ready** has no running presentation timer.
- Sharing early does **not** start the turn.
- **Start Presenting** or admin **Start** begins the timer.
- Long waits still count toward the inactivity shutdown described below.
### Preview selection
1. Prefer a sharing participant among the called person and waiting queue.
2. Fall back to the current presenter, then the first waiting participant.
The preview may show someone farther down the queue. Check the name before acting.
- **Preview**: pin a participant.
- **follow next**: return to automatic selection.
- Preview selection does not change the projector.
### Bring back the previous presenter
<table header-row="true">
<tr>
<td>Available when</td>
<td>Action</td>
<td>Result</td>
</tr>
<tr>
<td>Within two minutes of their presentation ending, before another presenter starts</td>
<td>**Previous → +15s / +30s**</td>
<td>Previous presenter goes live immediately with that time; the called person returns to the front of the queue.</td>
</tr>
</table>
Ask the previous presenter to keep their page open briefly. This recovery window does not hold up the next turn.
## 4. Controls
### Session and queue
<table header-row="true">
<colgroup>
<col>
<col width="523">
</colgroup>
<tr>
<td>Control</td>
<td>Effect</td>
</tr>
<tr>
<td>**Start checkpoint**</td>
<td>New session; empty queue.</td>
</tr>
<tr>
<td>**End checkpoint**</td>
<td>Stop the current turn and close the queue. Starting again does not restore the old queue.</td>
</tr>
<tr>
<td>**↑ / ↓**</td>
<td>Move a waiting participant one place.</td>
</tr>
<tr>
<td>**Skip**</td>
<td>Move back one place. For the called person: call the next waiting person instead. No effect without someone to swap with.</td>
</tr>
<tr>
<td>**Remove**</td>
<td>Remove a waiting participant; blocks rejoining that session.</td>
</tr>
<tr>
<td>**Undo**</td>
<td>Restore the last removed participant to their queue position. Available for 10 seconds.</td>
</tr>
</table>
### Current presenter
<table header-row="true">
<colgroup>
<col>
<col width="560">
</colgroup>
<tr>
<td>Control</td>
<td>Effect</td>
</tr>
<tr>
<td>**Start**</td>
<td>Begin the called person’s timer and presentation. Works without a share.</td>
</tr>
<tr>
<td>**Stop**</td>
<td>End the turn; call the next person. Repeated clicks for the old presenter do not stop the next one.</td>
</tr>
<tr>
<td>**Pause / Resume**</td>
<td>Freeze/resume the clock. Video and audio remain live.</td>
</tr>
<tr>
<td>**+15s / +30s**</td>
<td>Add time, including while paused.</td>
</tr>
</table>
### Settings — cog icon
<table header-row="true">
<colgroup>
<col>
<col width="563">
</colgroup>
<tr>
<td>Setting</td>
<td>Values / behavior</td>
</tr>
<tr>
<td>**Limit (s)**</td>
<td>10–3600 seconds; default 120. Click/tab out to save. Applies when a turn starts; does not alter a running timer.</td>
</tr>
<tr>
<td>**Quality**</td>
<td>720p / 1080p / 1440p / Source. Default 1080p. Applies without restarting the share.</td>
</tr>
<tr>
<td>**Projector sound**</td>
<td>Enable/mute shared presentation audio.</td>
</tr>
<tr>
<td>**Reactions**</td>
<td>Enable/disable reactions from waiting participants. Requires the server’s reaction service.</td>
</tr>
</table>
## 5. Status and timing
<table header-row="true">
<colgroup>
<col>
<col width="564">
</colgroup>
<tr>
<td>Indicator</td>
<td>Meaning</td>
</tr>
<tr>
<td>**Sharing**</td>
<td>Participant is publishing a share.</td>
</tr>
<tr>
<td>**Not sharing**</td>
<td>No active share reported.</td>
</tr>
<tr>
<td>**Stopped**</td>
<td>Share has stopped.</td>
</tr>
<tr>
<td>**Disconnected**</td>
<td>Page closed or participant not seen recently. Check with them; the badge alone does not confirm media failure.</td>
</tr>
<tr>
<td>`/host` countdown</td>
<td>Visible in the last 10 seconds.</td>
</tr>
<tr>
<td>`/timer` countdown</td>
<td>Full countdown; red at 30 seconds; flashing in the last 10 seconds.</td>
</tr>
</table>
**Timing → Show**
- **Total:** session duration.
- **Presenting:** time from presentation start to end, including pauses.
- **Switching:** gap between consecutive presentations.
- **Percentages:** presenting vs. switching; excludes time before the first and after the last presentation.
- **Details:** presenter count, averages, median switching time, and per-person durations.
- **Refresh:** every five seconds while expanded.
## 6. Disconnects and shutdown
<table header-row="true">
<colgroup>
<col width="224">
<col width="479">
</colgroup>
<tr>
<td>Event</td>
<td>Behavior / action</td>
</tr>
<tr>
<td>Participant closes their page</td>
<td>Removed after five seconds. Reconnect within that window to keep the place.</td>
</tr>
<tr>
<td>Participant refreshes while live</td>
<td>Timer preserved; sharing may need to be restarted.</td>
</tr>
<tr>
<td>Network interruption</td>
<td>Automatic reconnect. Network loss alone does not remove the participant. **Skip** if called and unable to proceed.</td>
</tr>
<tr>
<td>No connected admin for five minutes</td>
<td>Session ends, including a live or paused turn.</td>
</tr>
<tr>
<td>No activity for 10 minutes; nobody live</td>
<td>Session ends. **Getting ready** does not prevent shutdown.</td>
</tr>
<tr>
<td>End of night</td>
<td>**End checkpoint**, then close the admin page.</td>
</tr>
</table>
## 7. Quick fixes
<table header-row="true">
<colgroup>
<col width="226">
<col width="493">
</colgroup>
<tr>
<td>Problem</td>
<td>Action</td>
</tr>
<tr>
<td>No presentation sound</td>
<td>Enable **Projector sound**; click on `/host`; check HIVE volume. Share a browser tab with **Share audio** enabled. Camera sharing sends no microphone audio.</td>
</tr>
<tr>
<td>Wrong screen</td>
<td>Participant: **Change window**. Verify in preview.</td>
</tr>
<tr>
<td>Presenter not ready</td>
<td>**Skip** before starting; **Pause** if already live.</td>
</tr>
<tr>
<td>Choppy share</td>
<td>Lower **Quality**. **Stats for nerds**: `bandwidth` → network limit; `cpu` → close apps/lower quality.</td>
</tr>
<tr>
<td>Blank or failed share</td>
<td>Try a browser tab; **Try basic share** if offered. Fallback: present without sharing or use HDMI.</td>
</tr>
<tr>
<td>Organizer access denied</td>
<td>Check organizer role with an ID admin; sign out and back in.</td>
</tr>
<tr>
<td>Accidental removal</td>
<td>**Undo** within 10 seconds.</td>
</tr>
<tr>
<td>Queue reset needed</td>
<td>End checkpoint → start checkpoint. Everyone must rejoin.</td>
</tr>
</table>