# Roadmap

User stories for the extension, from an analysis of the extension and the
live Glowforge app (October 2026). Each story has an id that doesn't change,
a status and acceptance criteria. When a story ships, update its status and
link the PR. New ideas go at the end of the backlog unless they're
prioritized.

Statuses: **Done**, **In review**, **Partly done**, **Planned**,
**Speculative**.

## Ground rules

- Complement Glowforge's own saved step settings, which are probably Premium
  only, rather than replace them. The extension's value is whole materials, QR
  stickers, sync, sharing and calibration, all free. Never write into or
  unlock the native feature.
- Off limits: anything that starts or aligns a print, accepts a safety
  warning, unlocks Premium or feature flags, presents custom materials as
  Proofgrade, or changes job steps without the user reviewing it first.
- Check Glowforge's behaviour read-only before building on it.

## Done

### US-01 Materials reach every tab

**Done** in #136.

As a user with several Glowforge tabs open, I want my custom materials in
every tab, so that they're always in the material picker.

- [x] Each tab gets the materials from storage when it loads and whenever
  they change.
- [x] Materials removed by a Glowforge catalog refresh are added back.
- [x] The popup's Set button and QR matches only reach their own tab.

### US-02 The basics work against today's Glowforge app

**Done** in #136.

As a user, I want the extension to work with the current Glowforge app, so
that my materials, ids and sync don't break.

- [x] Materials restored from cloud sync no longer get `Custom:Custom:` ids,
  and old ones are fixed.
- [x] Migration 4 no longer re-enables sync or rewrites every cloud entry.
- [x] The store is read with `getIn`, the lid image from `lidImage` and the
  design id from the URL.
- [x] Values from the page are validated.

### US-03 QR auto-select works on real lid images

**Done** in #136 and #137, with review fixes in #139.

As a user who puts a material's QR sticker on the bed, I want the material
selected for me, like Proofgrade, so that I don't pick it by hand.

- [x] Our own QR library reads and writes codes, with no dependencies.
- [x] The service worker downloads the lid image directly, with a timeout.
- [x] Only `Custom:<7 hex>` payloads select a material, and only in the tab
  the lid image came from.
- [x] A sticker selects its material when it appears, not in every lid image
  after, so a material picked by hand stays (#139).
- [x] Stickers next to sheet edges, on offcuts, among engravings, in a hard
  shadow, and blurred and tilted settings codes read (#139).

### US-04 The popup shows the active tab

**Done** in #138, with a reconnect option in #139.

As a user with several Glowforge tabs, I want the popup's sync light,
machine and trace download to describe the tab I'm looking at, so that I
can trust them.

- [x] Each tab keeps its own status, and the popup asks the active tab.
- [x] The light is green only when the active tab has the latest materials.
- [x] On other tabs, the serial and trace are hidden.
- [x] Tabs that were open before an install or update get the scripts
  without a reload.
- [x] A Glowforge tab without the scripts can be reconnected from the popup,
  and Set says when it can't reach the tab (#139).

### US-20 More materials fit in cloud sync

**Done** in #143.

As a user with a lot of materials, I want them all to sync, so that every
computer has them.

- [x] Materials are stored in a smaller format, about a quarter of the size,
  so up to 512 fit, Chrome's limit on items, instead of about 190.
- [x] Materials already in the cloud are rewritten the first time the popup
  opens, in one write, from the cloud's copies.
- [x] Older formats keep working, and values from newer versions are skipped
  instead of stopping sync.
- [x] The popup shows the materials used of 512, and says when the cloud
  refuses a material.
- [x] pako is replaced by our own compression module.

Notes: version 0.4.10 can't read the new format, and its popup stops
opening until it updates.

## Partly done

### US-05 Stable material ids

**Partly done.** The doubled-id bug is fixed in #136, and since #139 ids come
from one helper, `materialIdForTitle`.

As a user, I want a material's id to stay the same when I rename it, so that
printed QR stickers and saved designs keep working.

- [ ] Ids are created once and stored, not taken from a hash of the title.
- [ ] Existing materials keep their current ids.
- [ ] Renaming a material keeps its id, and its stickers still select it.

### US-06 Sync robustness

**Partly done.** Migration 4 is fixed in #136. Since US-20, a new computer
stores all of the cloud's materials in one write, and a material the cloud
refuses stays on this computer, with a message saying why.

As a user, I want cloud sync to be safe with many materials, so that I never
lose any.

- [ ] Writes are batched.
- [ ] Writes check Chrome's sync quotas first and report when they'd go
  over.
- [ ] Deleting a material deletes it on other computers too.

### US-12 Limits that match the machine

**Partly done.** Speeds are in review in #145.

As a Pro or Basic owner, I want the editor's limits to match my machine, so
that I can use its full range.

- [x] Speed ranges come from the machine selected in a Glowforge tab, or the
  last one selected, and speeds show the numbers the Glowforge app shows.
- [x] The suspected difference between typed and applied cut and score
  speeds is found and fixed: the Pro checked shows a speed of 4000 as 517,
  which the editor showed as 500.
- [ ] Power ranges and the tube type come from the selected machine. Power
  already matches the app on Basic, Plus and Pro; machines the app marks as
  GFD show power in tenths, which isn't handled.

## Backlog, in suggested order

### US-07 QR release prep

**Partly done** in #139. Do the rest before the next Web Store release.

As a user updating the extension, I want it to stay enabled, so that I
don't have to approve a new permission I may not need.

- [x] Access to `storage.googleapis.com/gf-app-imgl` is requested only when
  QR auto-select is turned on, so the update doesn't disable the extension.
- [ ] A downloaded sticker SVG imports into the Glowforge app and engraves
  as expected.
- [ ] A few more real lid photos are in the tests: the sticker in different
  places, different lighting. A dim one, which didn't read before, is in
  #144.
- [ ] Find whether real lid photos need heavily blurred codes tilted past
  35° to read, which loses the far finder today.

### US-08 Export and import

**Planned.** Small.

As a user, I want to export my materials to a file and import them again,
so that I have a backup and can share them.

- [ ] Export and import in JSON and CSV.
- [ ] Importing shows what will be added or replaced before it saves.
- [ ] The backup download no longer cuts off at `#` in a material name.

### US-09 Range checks

**Planned.** Small.

As a user, I want impossible settings rejected, so that a typo like 30
passes never reaches the laser.

- [ ] Passes, thickness and focal offset are range checked in the editor.
- [ ] Storage write errors are shown instead of failing silently.

### US-10 Match Glowforge's material format

**Planned.**

As a user, I want custom materials that look and behave like Glowforge's
own, so that every part of the app handles them.

- [ ] Records are built from a live Proofgrade template.
- [ ] A default outcome is marked the way Proofgrade marks one.
- [ ] A test catches changes to Glowforge's format.

Note: `radiantExposure` comes from Glowforge's own table, keyed by Proofgrade
id.

### US-11 New from Proofgrade

**Planned.**

As a user, I want to start a material from any Proofgrade material, so that
I only change what's different.

- [ ] Any of the 113 Proofgrade records can be cloned.
- [ ] Both tube types and all outcomes are included.

### US-13 Save current job as a material

**Planned.**

As a user who dialed in settings on uncertified material, I want to save
them as a material, so that I don't copy them by hand.

- [ ] Reads the open job's step settings, read-only.
- [ ] Shows them for review before saving.
- [ ] Shares the step reader with US-14 and US-19.

### US-14 Save settings per design

**Planned.** Medium effort, medium fragility.

As a user, I want a design to remember its material, thickness and step
settings, so that reopening it doesn't mean dialing everything in again.

- [ ] A popup button saves the open design's material, uncertified thickness
  and each step's settings, read-only, under the design id. Named variants
  are possible, like "on birch" and "on acrylic".
- [ ] Steps are matched by their layer and order, not session ids.
- [ ] When the design opens, the popup offers "Apply saved settings (date,
  material, N steps)". Nothing is written until the user confirms, then it
  selects the material and sends `UPDATE_STEP_MANUAL_SETTING` per step.

Check first, read-only:

- whether Glowforge already keeps manual step settings after a reload;
- what `steps.steps[id].manualSettings` looks like on a step set by hand;
- how Premium's print history restore (`RESTORE_PRINT_VERSION`) overlaps.

Glowforge already copies a fixed list of fields between steps: type, cut,
engrave and ignore modes, engrave level and manual settings. That's the
snapshot to save.

### US-15 Import from settings stickers

**Planned.** Small to medium.

As a user who received a "Material Id + Settings" sticker, I want scanning
it to add the material when I don't have it, so that stickers are a way to
share materials between people and machines.

- [ ] When a scanned sticker's material isn't in the library, the popup
  offers to add it from the sticker's settings.
- [ ] The settings are shown for review before saving.
- [ ] Today the settings part of the payload is ignored.
  `parseMaterialQrCode` already returns it, unchecked (#139).

### US-16 Diagnostics panel per tab

**Planned.**

As a user whose materials aren't showing up, I want to see what the extension
sees, so that I can fix it or report it.

- [ ] Shows whether the store was found, how many custom materials are live,
  the last delivery, the machine's ranges, the last QR result and storage
  use.
- [ ] Errors are visible in production builds too.

### US-17 Calibration wizard

**Planned.**

As a user with a new material, I want a guided test grid, so that I can find
good settings quickly.

- [ ] Generates a power and speed test grid and a temporary material for it.
- [ ] Picking the best cell turns it into a material.

### US-18 Library organization

**Planned.**

As a user with many materials, I want to organize them, so that I can find
the right one.

- [ ] Favorites, tags and notes.
- [ ] Clearer titles in Glowforge's flat, alphabetical list.
- [ ] A swatch per material.

### US-19 Save and reapply settings for each layer in a design

**Planned.** New. Medium effort, medium fragility.

As a user, I want to save the settings of each layer in a design and reapply
them later, layer by layer, so that I can restore one layer's settings
without touching the rest.

- [ ] The popup lists the open design's layers with their current settings,
  read-only.
- [ ] Each layer's settings can be saved, under the design id and the
  layer's name, color and order.
- [ ] Saved settings can be reapplied to one layer or to all of them, after
  showing what will change. Nothing is written until the user confirms.
- [ ] Layers that were added, removed or renamed since saving are shown as
  unmatched and left alone.
- [ ] Saved settings survive reloading the design.

Notes: this is the per-layer side of US-14 and shares its step reader and
writer, so the two are worth designing together. The same read-only checks
apply.

## Speculative

- **S-1** Save settings from a past job in print history.
- **S-2** Alert when Glowforge's measured thickness doesn't match the
  selected material.
- **S-3** For Premium users, a read-only import of Glowforge's own saved
  settings.
