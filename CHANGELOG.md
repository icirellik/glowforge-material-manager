# Changelog

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

