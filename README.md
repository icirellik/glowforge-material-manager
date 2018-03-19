# Glowforge Material Manager [![Build Status](https://travis-ci.org/icirellik/glowforge-material-manager.svg?branch=master)](https://travis-ci.org/icirellik/glowforge-material-manager)

Browser extension that allows users to save and modify their own materials for
use in the Glowforge web interface.

This project is not affiliated nor endorsed by Glowforge, Inc.

**USE AT YOUR OWN RISK!**

Please install from the chrome webstore unless you area developer and wish to
make changes to the source. If that is the case be sure to correctly set
extesion id for your browser in the `content.js` script.

[Install Extension](https://chrome.google.com/webstore/detail/glowforge-material-manage/adabmafjmdcjnihkmggljljeopjfghii)

#### Managing Materials

When adding a new material it will show up in the Glowforge UI after a few
seconds. There is a syncronization indicator in the title that will be yellow
after creating or editing any materials and will turn turn green once it has
fully synchronized with the Glowforge UI. It typically takes less than 15
seconds for the UI and extension to synchronize.

When removing a material the Glowforge UI will be refreshed, this is currently
the only way that a material can be removed from the UI aside from unistallation
of the extension.

**Adding a Custom Material**

When making a custom material you must specify a name for the thickness name,
thickness in millimeters, and a name for the material. The thickness name should
be an adjective such as thin, thick, medium, or anything that can be used to
describe these settings in relation to the material itself. The material name
should be a short description of the material that is being created. The
thickness should be the thickness of the material that is being created.

Each material requires cut settings. These setting include power, speed, passes,
and focal offset. Focal offset is optional and when empty the Glowforge UI will
assign a default.

Optional score settings can be added. The Glowforge UI allows for multiple named
score settings so you will find an additional name field along with the same
power, speed, passes, and focal offset fields that are available for cuts.

**Viewing a Custom Material**

To view the settings for an existing materials, click on its name and the
details will appear on the right.

**Editing a Custom Material**

Click the edit icon to the right of the custom material to open the material
for editing and click update to save the changes.

**Removing a Custom Material**

Click the `minus` icon to the right of the custom material. Be careful there is
currently no undo or confirmation prompt, the material will be removed
immediately.

Setting explanations:

**Power**

When choosing a power be aware that 100 enables the Full Power toggle in the
Glowforge UI. To select a precision power choose the value that you want to use
and enter that value minus 1 in the Material Manager.

If you wish to set the precision power to 100, set the value as 99.
If you wish to set the precision power to 50, set the value to 49.

**Speed**

The minimum speed that the Glowforge UI will allow is 100, if a value lower
than that is set in the Material Manager it will be overridden in the UI.

**Passes**

Can be set to any value that you wish, the Glowforge UI restricts this
to 1, 2, and 3 passes only. Be careful not to set the passes to high.

**Focal Offset**

This value is optional and the Glowforge UI will select a default if left blank.

This tool does not allow editing of the Proofgrade settings, it would not be
difficult to add this feature it just wansn't my main priority.

To verify the settings that you entered are correct in the Glowforge UI. First,
select the custom material in the Glowforge UI, choose the Proofgrade option you
want such as cut, and then select the manual version. The setting presented
should align with those set in the extension.

Features to be added:

* Vector Engrave Settings
* Bitmap Engrave Settings
* CSV export

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

Speed settings:

The min and max cut and score speeds are defined as 100/4000.
The min and max engrave speeds are defined as 100/8500.

The maximum speed as defined by constant `a.a` is 8500.
The constant `s` is defined as 100.
The constant `o` is defined as 1000.

Assumptions:

maxVRSpeed is the maximun speed for vertical ramping.

maxVRSpeed for cuts and scores is 500.
maxVRSpeed for engraves is 1000.

```javascript
const maxMotorSpeed = 8500;
const minUISpeed = 100;
const maxUISpeed = 1000;

function getMaxVRSpeed(minSpeed, maxSpeed) {
    const speedDifference = maxSpeed - minSpeed;
    const uiSpeedRange = maxUISpeed - minUISpeed
    const vrSpeed = speedDifference / maxMotorSpeed * uiSpeedRange + minUISpeed;
    return 100 * Math.round(vrSpeed / 100)
}
function calculateDisplaySpeed(displaySpeed, minSpeed, maxSpeed) {
    const maxVRSpeed = getMaxVRSpeed(minSpeed, maxSpeed) - minUISpeed;
    const speed = (displaySpeed - minSpeed) / (maxSpeed - minSpeed) * maxVRSpeed + minUISpeed;
    return Math.round(speed)
}
function getRealSpeed(displaySpeed, minSpeed, maxSpeed) {
    return (displaySpeed - minSpeed) / (getMaxVRSpeed(minSpeed, maxSpeed) - minUISpeed) * (maxSpeed - minSpeed) + minSpeed
}

// Cuts and Scores
console.log(getRealSpeed(100, 100, 4000));
console.log(getRealSpeed(200, 100, 4000));
console.log(getRealSpeed(300, 100, 4000));
console.log(getRealSpeed(400, 100, 4000));
console.log(getRealSpeed(500, 100, 4000));

console.log(calculateDisplaySpeed(100, 100, 4000));
console.log(calculateDisplaySpeed(200, 100, 4000));
console.log(calculateDisplaySpeed(300, 100, 4000));
console.log(calculateDisplaySpeed(400, 100, 4000));
console.log(calculateDisplaySpeed(500, 100, 4000));

// Engraves
console.log(getRealSpeed(100, 100, 8500));
console.log(getRealSpeed(200, 100, 8500));
console.log(getRealSpeed(300, 100, 8500));
console.log(getRealSpeed(400, 100, 8500));
console.log(getRealSpeed(500, 100, 8500));
console.log(getRealSpeed(600, 100, 8500));
console.log(getRealSpeed(700, 100, 8500));
console.log(getRealSpeed(800, 100, 8500));
console.log(getRealSpeed(900, 100, 8500));
console.log(getRealSpeed(1000, 100, 8500));
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
