# Glowforge Material Manager

Browser extension that allows users to save and modify their own materials for
use in the Glowforge web interface.

#### Managing Materials

When adding a new material it should show up in the Glowforge UI after a few
seconds. There is an syncronization indicator in the title that will be green if
the Glowforge UI is fully synchronized. It will otherwise be yellow. If the
indicator is yellow just wait a few seconds and it will turn green.

When removing a material the Glowforge UI will be refreshed, this is currently
the only way that a material can be removed.

Setting explanations:

Power
Speed
Passes: Can be set to any value that you wish, the Glowforge UI restricts this
to 1, 2, and 3 passes only. Be careful not to set the passes to high.
Focal Offset

Features to be added:

* Multple Named Scores
* Vector Engrave Settings
* Bitmap Engrave Settings
* Basic CSV export.

# Development

This chrome extension is a basic React application with no frills. The project
uses yarn as its package manager and as such the install and build process is as
follows:

```sh
$ yarn install
$ yarn build
```

Once you have a successful build of the extension you can manually load it into
chrome by opening the `chrome://extensions/` tab, enabling `developer mode`, and
loading the upacked extension by selecting the `build` folder.

This project relies on the fact that the Glowforge UI is a React/Redux
application and makes use of the actions that are available to inject custom
materials that may be used.

Set a material.

```node
window.store.dispatch({ type: "SET_MATERIAL", id: 'Glowforge:35' });
```

Add a material

```node
window.store.dispatch({ type: "ADD_MATERIAL", material: {} });
```

Add materials

```node
window.store.dispatch({ type: "ADD_MATERIALS", materials: [] });
```

If you want to force reset the local storage for the plugin, open up the
background.js in chrome developer tools and run the following command. This can
be useful when you changed the properties that local storage references or when
you just want to quickly force a reset.

```sh
chrome.storage.local.clear()
```

## Data

The data folder contains an up-to-date list of materials that Glowforge has
available. You can use `jq` to query the material list for interesting data.
Here are a few interesting filters:

Get all Glowforge Pro Settings

```sh
jq '.[].settings[] | select(.tube_type | contains("pro"))' ./data/materials.json | jq -s '.'
```

Get all Glowforge Basic Settings

```sh
jq '.[].settings[] | select(.tube_type | contains("basic"))' ./data/materials.json | jq -s '.'
```

Get all Glowforge Pro cut settings

```sh
jq '.[].settings[] | select(.tube_type | contains("pro"))' ./data/materials.json | jq -s '.' | jq '.[] | [ .description, .cut_setting ]' | jq -s '.'
```

## Branding Guidelines

Logos and branding are supplied by the team at Glowforge more information can
be found in this [discussion](https://community.glowforge.com/t/lets-talk-about-glowforge-logo-and-brand-guidelines/6576).
