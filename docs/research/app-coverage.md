# Yawmy Care: app coverage vs landing page (2026-10-23)

Method: `get_metadata` on the 4 app pages (saved to disk, parsed for every frame name and every text string), `get_screenshot` on 2 frames, reading `src/i18n/en.json` + `src/i18n/sections/*.en.json`, `docs/research/us-players.md`, `docs/research/mena-players.md`. Figma file `oSQUBKWEqG5XrY4sHCzjzy`. Read-only for `src/`.

## 0. What the designs are

| App page (id) | Frames (375 or 1440 wide) | Notes |
|---|---|---|
| Nursery Admin Dashboard (`1640:3535`) | 136 desktop frames (many are modal/state variants; about 40 distinct screens) | Web, 1440. Sidebar: Dashboard, Rooms, Enrollment, Attendance, Incident Log, Announcements, Events, Data Export, Set Up, Chat, Log Out. Header has a globe + "EN" switcher, a second icon (probably switch nursery/branch, unverified), bell, profile. |
| Parent UI App (`598:74094`) | 46 | Sign Up 6, Home 7, Daily Logs 3, Chat 6, Announcement 4, Profile 14, Sign In 6 |
| Teacher UI App (`598:82112`) | 151 (two near-identical copies of every flow, about 75 unique) | Sign Up, Home and rooms, Daily Logs, Media, Chat and Announcements, Profile, Sign In |
| Nursery Admin UI App (`598:105594`) | 164 | Sign Up + Set Up 13, Home 10, Rooms 51, Enrollment 39, Chat 12, More 33, Sign In 6 |
| Total | about 497 frames, about 230 distinct screens | |

Final or wireframe? They are **high fidelity, near-final UI** (real type, colour, illustration, GIF success pop-ups, empty/error/success/discard states for every flow; `Design Notes` frames say "Show a success popup after every action performed by the teacher or admin" and "All icons used in the pop-ups are GIFs"). Residual placeholders: lorem ipsum in chat bodies, announcement details and incident descriptions; repeated names (Kaylynn Arcand x30); stat cards all "20"; December 2016 / "April 5 2026" mixed dates; geofence chips read "50 Km / 100 Km / 200 Km" (typo, the setup text says 100 m). **English only**: no Arabic text or RTL frame anywhere in the four app pages (only a globe + "EN" control in the dashboard header). Wireframe (`56:3940`) and UX FLOW (`14:2`) pages were not opened.

**Not designed anywhere in the app pages** (searched all frame names and text): billing, fees, invoices, payments, wallet; meal planner / menu; transport / bus; NFC or any pickup verification (only a static "Authorized Pickup Contacts" list); learning, milestones, curriculum, observations; waiting list / admissions / lead pipeline; payroll / staff scheduling / shifts; multi-branch (possible icon only); photo albums (media is per child or per room, no album concept); video calls; AI features; analytics beyond the dashboard (4 stat cards, one attendance bar chart, recent activity); staff-facing reports.

## 1. Module inventory

Counts are distinct frames (state variants included), summed across apps; "Teacher" counts one of the two copies.

| Module | Roles | # screens | Key capabilities visible in the designs | Example node ids |
|---|---|---|---|---|
| Onboarding and invitation-only sign-up | Owner, Teacher, Parent | ~45 (Admin app 13, Teacher 6, Parent 6, Dashboard 8, plus error/contact/success states) | Invitation link validation ("start with link"), invalid-invite error, "Contact nursery/admin", set password, activation success. Admin app 3-step nursery setup wizard: name + logo upload, location pin, hours/days, confirm | Admin app 598:106539, 598:106803; Dashboard 3047:47788; Parent 598:74099; Teacher 598:82120 |
| Sign-in, password reset, security | All | ~50 (Sign In 6-8 per app, Privacy & Security 5 per app, dashboard profile/password/sign-out 6) | Login, forgot password, OTP, set password, change password, sign out of all devices, log out | Parent 598:77966, 598:78181; Parent privacy 598:77809, 598:77889; Dashboard 1663:32946, 1663:33377 |
| Attendance and check-in | Parent, Teacher, Owner | ~30 (Parent 7, Teacher ~14, Dashboard 5, Admin app 4) | Parent "Check Out" button with "safely checked in at 08:12" (parent home), "Checked in by Parent, at 08:05" and manual "Mark as Checked-in" on teacher child view, not-arrived / absent / no-check-in states, previous-day view, attendance history (45% overall, present/absent days, calendar), owner attendance by room with check-in/out times, week strip, filter, calendar | Parent 606:38038, 598:75666, 598:75779; Teacher 598:82888, 869:34041, 598:83129, 598:83439, 598:84437; Dashboard 3021:46643, 3021:47275, 3021:48028 |
| Geofenced check-in settings | Owner | ~8 (Dashboard 4, Admin app 4) | Pin nursery on map, "Automatic Check in range 100m", geofence radius edit, nursery days and hours | Dashboard 3047:47788, 3065:50146, 3065:51270, 3066:80365; Admin app 598:115905, 598:115995, 598:115826 |
| Daily logs and activities | Teacher (write), Parent (read), Owner (stats only) | ~45 (Teacher 17-19 per copy, Parent 3, plus history) | Mood (playful/upset/feeling unwell), meals, nap, diaper change, activities, medication; add/edit/delete log; save as draft, delete draft, republish; success pop-up; history; Parent view with timeline, empty and absent states | Teacher 876:53138, 876:53248, 876:53425, 876:53584, 876:53786, 876:53944, 876:60756, 883:68119, 598:84918; Parent 598:76336, 598:75994, 598:76165 |
| Photos and media | Teacher (share), Parent (view) | ~19 (Teacher 7-8, Parent 3, child media history 4, chat media) | Share to a selected child or the entire room with upload progress, success confirmation, "Child Media History", parent Media Gallery with photo viewer, empty state, "Today's Media" strip on home. No album/folder concept | Teacher 598:86808, 889:69472, 598:85205; Parent 598:77345, 598:77458, 598:77368 |
| Health, safety and incidents | Teacher (log), Owner (review), Parent (profile data) | ~22 (Teacher 4, Dashboard 2, Admin app 3, Parent child profile 1, plus data in child info) | Incident report form (type, description, action taken, affected area), incident log with search and filter, list "Sunshine Room, Fall incident", "Parent Ack:" field; child profile with allergies, medical notes, immunization records (last vaccine / next due), emergency contacts, authorised pickup contacts | Teacher 598:85336, 598:85316; Dashboard 3023:48843; Admin app 598:116437; Parent 598:77267 |
| Messaging and chat | Owner, Teacher, Parent | ~50 (Parent 6, Teacher 8-10, Admin app 12, Dashboard 11) | Chat list with Parent Chat / Room Group Chat / Staff Chat, 1:1 and room group chat, typing, replies, emoji reactions, attachments menu (camera, photos and videos), mute user, delete message, **send broadcast** (dashboard), search | Parent 598:76474, 598:76508, 598:76817; Teacher 598:86976, 598:87196; Admin app 598:114850, 840:27472; Dashboard 3009:7356, 3019:9291, 3021:13543, 3021:11643 |
| Announcements | Owner, Teacher, Parent | ~35 (Dashboard 9, Admin app 8, Teacher 4, Parent 4 and more) | Create / edit / delete / preview, target all or a **specific room**, attach link, success state, parent list + empty + detail ("Room-targeted") | Dashboard 3030:51606, 3030:52047, 3030:52429, 3030:53049; Teacher 598:87379, 598:87411; Parent 598:76886, 598:77013 |
| Events and calendar | Owner (create), Parent (view/save) | ~16 (Dashboard 6, Admin app 8, Parent 3) | Add event (name, type e.g. Holiday, date, time, description), details, edit, preview, delete; parent upcoming/saved/empty events; notification "New event scheduled"; "Official Holiday, nursery closed" | Dashboard 3034:55570, 3038:57662, 3037:55975; Admin app 598:117271, 598:117329; Parent 598:77462, 598:77541 |
| Notifications | All | ~12 (Parent 2, Teacher 2, Admin app 2, Dashboard 2, plus empty states) | Notification centre, mark as read, delete all, empty state; **quiet hours** (parent: silence notifications from-to) | Parent 598:75949, 598:77145; Dashboard 1663:33967 |
| Rooms, classes and schedules | Owner, Teacher, Parent (reads) | ~75 (Admin app 51, Dashboard 28) | Rooms list with capacity and "available slots", add / edit / archive / unarchive room, assign and reassign children (bulk or individual), assign teachers, **room schedule** (sessions with teacher and time, add/delete), parent sees "Today's Schedule" | Dashboard 1697:37780, 1717:69092, 1699:49243, 1724:21091; Admin app 598:107476, 598:108252, 598:111178; Parent 606:38038; Teacher "switch room" 876:66041 |
| Enrolment: children, parents, staff | Owner | ~85 (Admin app 39, Dashboard 46) | Staff / Parents / Children tabs, add member (review + confirm), link child to parent, edit, archive/delete, filters, emergency contacts, pickup contacts, reassign child/teacher, invite on creation | Dashboard 1724:30380, 1734:38510, 1762:27472, 1734:41018, 1715:57555; Admin app 598:111992, 598:112876, 598:113296 |
| Dashboard and reporting | Owner | ~14 (Dashboard 2 plus empty state, Admin app Home 10) | Good morning header; total children, total teachers, checked in, incident reports; daily attendance bar chart; recent activity feed; admin-app nursery summary (new daycares, new parents); empty state for new nurseries | Dashboard 1659:29977, 1642:20628; Admin app 598:106917, 1604:43819 |
| Data export | Owner | ~14 (Dashboard 8, Admin app 6) | Export child records (select a child), attendance logs, incident log, date range | Dashboard 3042:58465, 3047:12181, 3047:13121, 3047:14060, 3047:14284; Admin app 598:116903 |
| Roles and permissions | Owner, Teacher | implicit (no dedicated screen) | Invite-only accounts, teacher assigned to rooms ("Home, teacher assigned to 1 room", switch room), staff roles (Lead / Assistant / Nursery Supervisor / Classroom / Subject Teacher), archive member | Teacher 598:82715; Dashboard 1734:41018 |
| Languages | All | 0 screens | Only the "EN" globe control in the dashboard header; **no Arabic frames** | Dashboard 3021:46643 |
| Profile and nursery profile | All | ~15 | My profile, nursery profile (name, logo, joined date) | Teacher 598:87500; Dashboard 1663:32569, 3065:50146 |

Roles using each module (owner = nursery admin dashboard + admin app; teacher; parent): attendance (O,T,P), daily logs (T writes, P reads, O sees counts), media (T,P), incidents (T,O; P sees child medical profile), chat (O,T,P), announcements (O creates; T creates; P reads), events (O,P), rooms/schedule (O manages, T/P read), enrolment (O), export (O), setup/geofence (O).

## 2. Coverage matrix (landing page vs designs)

Page keys: `hero`, `features`, `day`, `compare`, `commitments`, `pricing`, `security`, `setup`, `faq`, `testimonials`, `founders`.

| Module | On the page today | Strength | Accurate vs designs? |
|---|---|---|---|
| Attendance and check-in | `hero.lead` ("attendance"), `features.one-tap-checkin`, `day` 7:30 and 8:15, `compare.rows[2]` | Headline-level (feature card 1, 2 timeline cards, compare row) | Mostly. Parent check-in, teacher manual mark, room view, absent states and 100 m geofence are all designed. Caveats: "No PIN, QR code, or tablet at the door" and "no book" are fine. "Teachers see who is in, late or out": the designs show checked-in / not arrived / absent / no check-in, no explicit "late" state (lateness is implied by "not arrived"). Parent screen shows a **Check Out** button after check-in: the page never mentions check-out. "Parents check in from the gate" does not appear as a map or distance UI in the parent app, it is a setting in the owner app. |
| Geofence settings | `features.one-tap-checkin` ("within 100 metres") | Bullet | Yes (setup screens). Owner can set radius; design typo "Km" |
| Daily logs / activities | `hero.lead`, `day` 12:30 and 4:30, `compare.rows[0]` | Headline | Yes: meals, nap, mood, nappies, medication, activity all designed. "Sent in one tap to every parent in their own language" is half-true: publish and success screens exist (drafts, republish), but "own language" has no design (EN only). "Filed for good, searchable next year": history exists, no search shown in logs. "Mood" options are 3 (playful, upset, feeling unwell). |
| Photos / media | `day` 10:00, `compare.rows[3]` | Bullet + timeline card | Yes for "each photo goes to that child's gallery" (share to child or whole room, parent media gallery). "Album": the page says "the right album"; the design has a gallery, not albums. |
| Health, incidents, medication | `day` 12:30 ("medication"), `security.items[3]` ("Incident reports for two years"), `features.know-who-read` ("illness alert") | Passing mention only; **no incident module described** | Medication logging yes. Incident reports yes (form, log, "Parent Ack"). "See which parents opened a closure notice or illness alert. Know who has seen it" is **not supported by any screen** (no read-receipt UI; closest is the "Parent Ack:" line in the incident log and "Mark As Read" on notifications). "Illness alert" and "closure notice" are not designed as distinct types (events have type "Holiday"; notifications show "Official Holiday, nursery closed"). Retention (2 years incidents, chat deleted after six months) has no screen. |
| Child medical profile (allergies, immunisations, emergency and pickup contacts) | not at all | None | n/a |
| Parent chat / messaging | `hero.lead` ("parent chat"), `day` 8:00 PM, `compare.rows[1]` indirectly, `testimonials` | Headline-level | Yes: parent-nursery chat is designed (1:1, group, reactions, photo attachments). "Parents see when they are messaging outside nursery hours, before they hit send" (`features.evenings`): **no screen supports it**. Designed instead: parent-side **Quiet hours** (silence notifications), and nursery operating hours in setup. Reword or confirm with the designer. "Admin cannot read private teacher and parent conversations" (`security.items[2]`, `faq`) sits oddly with the admin chat, which lists Parent Chat and Room Group Chat threads and has mute-user / delete-message / broadcast moderation. Verify the rule before shipping the claim. |
| Announcements | `hero.lead` | Hero mention only | Yes (create / room-targeted / edit / preview). Not shown in `day` or `features`. |
| Events / calendar | not at all | None | n/a (designed, 16 screens) |
| Notifications | `day` 4:30 ("every parent gets a notification") | Bullet | Yes (notification centre). "In their own language" is not designed. |
| Rooms, classes, schedule | `setup.faq` ("add your classes"), `pricing.school` ("rooms") | FAQ only | n/a (designed, 75 screens). Room schedule shown to parents ("Today's Schedule") is absent from the page. |
| Enrolment (children, parents, staff) | `faq` (setup: "add your classes, children and teachers, invite parents"), `setup` | FAQ and setup steps | Yes for add / invite. "We help you bring your existing lists across" (`faq`) is a service claim, no import screen exists (manual add with review/confirm). |
| Dashboard / owner overview | not described (hero image is toddlers, not a product shot) | None | Designed: 4 stat cards, attendance chart, recent activity. |
| Data export | `commitments.dataYours`, `commitments.dataStays`, `faq` (cancel) | Bullet/FAQ | Yes: Export child records, attendance logs, incident log by date range. "Everything" is not true: **chat, photos and daily logs are not in the export screens**. "Export your records whenever you want, without asking us" matches the self-serve screen. "90 days to export, then permanent deletion" is policy, not a screen. |
| Roles and access | `security.items[2]`, `faq` (who can see) | Bullet + FAQ | Mostly. Teacher sees only assigned rooms (designed: "teacher assigned to 1 room", room switch). Fine-grained permissions UI does not exist; roles are Owner/admin, Teacher, Parent. |
| Security (encryption, backups) | `security`, `faq` | Section | No screens, not testable against designs (backend claims). Privacy & Security screens exist: change password, sign out all devices. Do not claim 2FA (OTP appears only for password reset). |
| Languages (Arabic/English) | `hero`, `features.arabic`, `commitments.arabic`, `faq`, `header` | Headline, badge, section | **Not supported by the file**: all app screens are EN, no RTL frames; a language switcher control exists only in the owner dashboard. The page's "Staff and parents each pick their own language" has no design for the parent and teacher apps (no switch screen in Profile). Treat as roadmap or confirm AR builds exist outside Figma. |
| Pricing / "Nursery pays, not parents" | `pricing`, `commitments.charge`, `faq`, `founders` | Section | Business model, not a product mechanism. **No billing, invoice, fee or payment screen exists in any app**, so the page correctly makes no payment-feature claim; keep it that way (do not add wallet, fees, invoices). "No tuition commission" is consistent with the product not handling tuition at all. |
| Onboarding / setup | `setup`, `faq` | Section | Yes: invitation-based activation and a 3-step nursery setup are designed. "20 minutes" is plausible, not provable. |
| NFC / pickup | not mentioned | None | Correct. Only a static authorised-pickup contact list exists. Do not add NFC/QR pickup. |
| Transport, meals planner, learning/milestones, billing, admissions/waiting list, payroll, multi-branch, analytics beyond dashboard | not mentioned | None | Not designed. Do not promise. |
| Multi-branch | not mentioned | None | Not evidenced (one uncertain header icon). |
| Offline / older Android | `faq` | FAQ | No design evidence; keep as a support statement. |

## 3. Gaps

### 3a. Designed but missing from the page, ranked for owner buyers

Competitor baseline: US leaders (Brightwheel, Procare, Famly, Lillio, illumine) lead with billing/payments, compliance reporting, enrolment/admissions, AI, and a role selector (owner / educator / parent); MENA leaders (Hadana, KinderLink, Wakeb, EduX, InstaKidz) lead with attendance + daily report + parent app, fees/invoices and cameras/buses, with WhatsApp as the default contact channel and "free for parents" claims. Billing is the owner's biggest pain in MENA and Yawmy has no design for it: that is a product gap, not a page gap.

| Rank | Missing module | Why it matters to an owner | Evidence |
|---|---|---|---|
| 1 | **Owner dashboard and daily overview** (stats, attendance chart, recent activity, rooms capacity) | The buyer is the owner, yet the page shows only toddlers and parent/teacher phones. Competitors (Brightwheel, Famly, KinderLink) show the admin view | 1659:29977, 598:106917 |
| 2 | **Safety and health record** (child medical profile, incident log with parent acknowledgement, emergency and authorised pickup contacts) | Parents' and owners' top trust concern; EduX and US players lead with licensing and safety. Currently only a retention line mentions incidents | 598:77267, 3023:48843, 598:85336 |
| 3 | **Announcements and broadcast to all or one room** | Direct WhatsApp-group replacement for owners; only a hero mention today | 3030:52047, 3021:13543 |
| 4 | **Events and calendar** (holiday, trips, parent meetings) | Daily owner task and a parent favourite (save event); entirely absent | 3034:55570, 598:77462 |
| 5 | **Rooms, capacity, teacher assignment and room schedule** | The owner's core control surface; parents see the schedule in their app | 1697:37780, 1717:69092, 598:108252 |
| 6 | **Enrolment records and invite flow** (staff / parents / children, link child to parent) | Replaces the Excel list (named in `compare`), but no row or screenshot shows it | 1724:30380, 598:112876 |
| 7 | **Data export (child records, attendance, incident log)** | Concrete proof of "your data is yours", currently only a promise | 3047:12181 |
| 8 | **Geofence and hours set-up screens** | A visible differentiator for "one-tap check-in" and "respects your hours" | 3047:47788 |
| 9 | **Quiet hours for parents, notification centre** | Backs the "respects your hours" feature honestly | 598:77145, 598:75949 |
| 10 | Admin mobile app ("owner in your pocket") | Third app of the "all platform applications" brief | 598:106917 |

### 3b. What the page over-emphasises or over-claims

1. **Arabic** is the largest claim in `hero`, `features`, `commitments`, `faq`, `header`, `meta`, yet the designed apps are EN only. Not a wording issue to drop, but it needs Arabic screens (see recommendations) or a "Arabic and English" caveat as roadmap.
2. **"Know who read it"** (feature card 2): no screen. Closest evidence is "Parent Ack:" in the incident log. Either re-scope to "parents acknowledge incident reports" or drop.
3. **"Respects your hours / parents see when they are messaging outside nursery hours"**: not designed. Designed: parent quiet hours and nursery opening hours.
4. **Security retention and encryption lines**: no UI; fine as policy, but `security` takes a full section while the actual product (the 230 screens) gets none.
5. **Check-in over-weighting**: three cards plus a feature card for attendance (`features`, `day` x2, `compare`) versus one-line mentions for everything else; the "no tablet at the door" story is good, but 1 of 4 feature cards and 2 of 7 timeline cards is a lot.
6. **Daily report "in their own language"** and **"searchable next year"**: no design.
7. **"Everything you export / leave with everything"** (`commitments.dataStays`): the export covers child records, attendance and incident log only, not photos, chat or daily logs.
8. **Hero lead** lists "attendance, parent chat" but the lead's features show only 4 modules; five other designed modules are unnamed.

## 4. Recommendations

### 4.1 Where to feature what

| Placement | Recommended |
|---|---|
| Hero (visual) | Desktop dashboard `1659:29977` with the parent home `606:38038` (or `598:75365`) overlapping, plus the admin app `598:106917` as optional third device, to show the three apps. Hero lead: "Attendance, daily reports, photos, announcements and parent chat, in one app for owners, teachers and parents." Drop "In Arabic from day one" from the H1 until AR screens exist (or keep, if the AR build is confirmed). |
| Features (4 cards today) | Replace with 6 designed capabilities: (1) One-tap check-in (keep, add "and check-out"), (2) Daily logs with drafts (mood, meals, nap, nappies, medication), (3) Announcements and events to a room or the whole nursery, (4) Safety record (incident log, allergies, authorised pickups), (5) Rooms, schedules and enrolment in one place, (6) Your data, exportable (child records, attendance, incidents). Keep the Arabic card as a badge only if AR is real. |
| Day timeline (7 cards) | Keep 7:30, 8:15, 10:00, 12:30, 2:00 (parent), 4:30. Swap 8:00 PM for 3 cards or merge: 11:00 "Today's schedule" (parent home `606:38038`), 1:00 PM "Incident noted, parent acknowledged" (`598:85336` or `3023:48843`), and keep the chat as the last card (`598:76508`). Optional morning card: owner opens dashboard (`1659:29977`). |
| Compare table | Add rows: "Announcements" (WhatsApp group scroll vs room-targeted announcement `3030:52047`), "Events and holidays" (paper calendar vs events with notification `598:77462`), "Incidents" (paper form vs incident log with parent acknowledgement `3023:48843`), "Child records" (Excel and paper files vs child profile with allergies and contacts `598:77267`), "Exporting your data" (copy-paste vs export `3047:12181`). Do **not** add a "Fees/invoices" row. |
| FAQ | Add: "Can parents see their child's schedule?" (yes, daily schedule on home); "How do I tell parents about a closure?" (announcement or event, room-targeted); "What happens if a child is hurt?" (incident report logged, parent can acknowledge, kept two years: confirm); "Can I export my records?" (child records, attendance logs, incident log by date); "Can a teacher see another room?" (assigned rooms only, switch room); "Does Yawmy handle fees or payments?" (honest answer: not in the app today, the nursery's fee stays between nursery and parent: confirm with the founders). Edit "Is the app fully in Arabic?" to match reality. |
| Pricing / FAQ | Keep "nursery pays, parents never pay" as a business promise; do not describe a payment mechanism. |

### 4.2 Owner / Teacher / Parent switcher (3 columns x 4 capabilities)

| Role | Capability 1 | Capability 2 | Capability 3 | Capability 4 | Screenshot node (primary) |
|---|---|---|---|---|---|
| **Owner** (nursery admin, web + mobile) | See today's children, teachers and incidents on one dashboard | Manage rooms, capacity and teacher assignments, with schedules | Send announcements and events to a room or the whole nursery | Review attendance and incident logs; export records, set check-in radius and hours | `1659:29977` (alt: `3021:46643` attendance, `598:106917` mobile) |
| **Teacher** | Open her room and see who is in, not arrived or absent; mark a child in by hand | Log mood, meals, nap, nappies, activities and medication; save drafts and publish | Share photos with one child or the whole room | Write an incident report in a minute; message parents and post announcements | `876:53138` (alt: `598:83129` child view, `598:86808` media) |
| **Parent** | Check in and out from the gate, see attendance history | See the day: mood, meals, nap, schedule and photos | Message the nursery; read announcements and save events | Child profile with allergies, immunisations and authorised pickups; set quiet hours | `606:38038` (alt: `598:75365`, `598:76336`, `598:77345`) |

All twelve are backed by frames; "message parents" and "announcements" for teachers are `598:86976` and `598:87379`.

### 4.3 Wording (EN, only designed capabilities)

- Hero lead: "Check-in, daily reports, photos, announcements and parent chat in one app for owners, teachers and parents. Set up in about 20 minutes."
- Feature card (safety): "Incidents and health records in one place. Teachers log an incident in a minute, parents acknowledge it, and every child's allergies, medical notes and pickup contacts are one tap away."
- Feature card (announcements): "Tell the whole nursery or just one room. Announcements and events go to parents' phones, no group chat needed."
- Feature card (owner): "See the whole nursery at a glance: children in today, teachers, incidents and attendance by room."
- Feature card (data): "Export child records, attendance and incident logs whenever you need them."
- Replace `features.know-who-read`: "Parents acknowledge incident reports, so you know they were told." (matches "Parent Ack").
- Replace `features.evenings`: "Parents can set quiet hours, and you set your opening days and hours." (matches quiet hours + setup).
- Check-in: "Parents check in and out from the gate, within 100 metres. Teachers can mark a child in by hand."
- AR (optional): فقط لما يكون مصمّماً: "تسجيل حضور بلمسة واحدة"، "تقرير يومي"، "إعلانات للفصل أو للحضانة كلها"، "سجل الحوادث والبيانات الصحية"، "تصدير السجلات". Do not publish AR product screenshots until Arabic frames exist.

### 4.4 Top 8 actions

1. Add the owner dashboard (`1659:29977`) to the hero or directly under it: the page currently never shows what the buyer buys.
2. Add the Owner / Teacher / Parent switcher (table 4.2) with real Figma frames.
3. Add an announcements and events feature plus a "closure and events" FAQ and compare row (`3030:52047`, `3034:55570`).
4. Add a safety and incidents feature (`3023:48843`, `598:77267`, `598:85336`), the strongest owner trust asset after attendance.
5. Reword or drop "Know who read it" and "Respects your hours" so they match what is designed ("Parent ack", "quiet hours").
6. Resolve Arabic: ask the designer for AR/RTL frames of the app (none exist) or soften the AR claims in `hero`, `features`, `commitments`, `faq`, `meta`.
7. Rewrite the export promise to "child records, attendance, incident log" and avoid "everything"; add the export screen as proof (`3047:12181`).
8. Do not add billing, payments, wallet, NFC, transport, meals planner or learning claims, none is designed; confirm the admin chat vs "admin cannot read parent conversations" rule before keeping that sentence in `security` and `faq`.
