# Changelog

## 0.4.4-0.4.5

* Updating some of the copy-text.

## 0.4.3

* Add quick backup management solution.
* Add backup task before migrating to `0.4.x`.
* Better QR Code detection.

## 0.4.2

* Fixes several quirks with synchronizing materials.
* Enables validation on form submit.

## 0.4.1

* QR Code detection enhancements.
* Added a cloud sync toggle, only sync what you want.
* Added the ability to create a new material from search.
* Added better navigation between edit and display screens.
* Sorted the material list.
* Better input validation detection.
* Help text everywhere.

Plus an assortment of other minor UI/UX tweaks.

## 0.4.0

### QR Codes

* Added support for scannable QR code to create your own homemade "Proofgrade"
like material.
* Added QR codes that contain your full settings for sharing.
* TODO: Implement automatic importing.

### UI Enhancements

* Added the ability to set a material from the UI.
* Increase the syncronization speed.
* Added the ability to download your traces / svgs.
* Added a search filter to the materials list to make finding a material easier.
* Added some input validation, more to come.

### Internal Tweaks

* Added unique material ids
* Converted to TypeScript
* Overhaulded the UI.

## Release 0.3.4

* Fixes a bug where in certain cases the materials would keep trying to upgrade.

## Release 0.3.3

* Fix a bug where null thicknesses are causing the nodes to keep upgrading.

## Release 0.3.2

* Fix glowforge settings causing unknown errors.
* Fix refreshing the extension page.

## Release 0.3.1

* Fix power settings for values below 50.
* Fix padding when there are multiple score or engraves.

## Release 0.3.0

** User Features **

* Verify settings at startup against sync settings.
* Display LPI settings.
* Ability to clone existing materials.
- Fix macOS High Sierra display issues.

** Developer Features **

* Automatically set the extension id.

## Release 0.2.0

* Enable the material manager to work on all tabs.
* The sync icon is now gray when not in an active glowforge tab.
* Any temporary materials are save when the extension window closes thus allowing you to look at settings in a different window.
* Sync state is now correct upon opening the tab, it used to wait for 5 seconds before updating.
* Do not reload the page upon removing a material when outside of the GFUI tab.
* Enable cloud sync.
* Display power settings in each label.

