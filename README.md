# Glowforge Material Manager

Browser extension that allows users to save and modify their own materials for
user in the Glowforge web interface.

Set a material.

```sh
window.store.dispatch({ type: "SET_MATERIAL", id: 'Glowforge:35' });
```

Add a material

```sh
window.store.dispatch({ type: "ADD_MATERIAL", material: {} });
```

Add materials

```sh
window.store.dispatch({ type: "ADD_MATERIALS", materials: [] });
```



Clear all of the stored materials. Run this in the background file.

```sh
chrome.storage.local.clear()
chrome.storage.sync.clear()
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
