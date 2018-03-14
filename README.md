# Glowforge Material Manager

Set a material.

window.store.dispatch({ type: "SET_MATERIAL", id: 'Glowforge:35' });

Add a material

window.store.dispatch({ type: "ADD_MATERIAL", material: {} });

Add materials

window.store.dispatch({ type: "ADD_MATERIALS", materials: [] });


Filter pro and basic for diffing.
jq '.[].settings[] | select(.tube_type | contains("basic"))' materials.json > basic.json
jq '.[].settings[] | select(.tube_type | contains("pro"))' materials.json > pro.json


Clear all of the stored materials. Run this in the background file.

chrome.storage.sync.clear()

 # Branding Guidelines

 Logos and branding are supplied by the team at Glowforge more information can
 be found in this [discussion](https://community.glowforge.com/t/lets-talk-about-glowforge-logo-and-brand-guidelines/6576).
