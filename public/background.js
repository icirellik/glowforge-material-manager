let materials;

function refreshMaterials() {
  chrome.storage.local.get(null, result => {
    console.log('Refreshing materials.');
    console.log(result);
    if (result && result.materials) {
      materials = result.materials;
    }
  });
}

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    sendResponse({
      materials: materials
    });

    // Refresh incase anything new was added in the app.
    refreshMaterials();
  }
);

chrome.storage.local.get(null, result => {

  console.log('Verifying Storage');
  console.log(result);

  if (result && result.materials) {
    materials = result.materials;
  } else {
    console.log('Initalizing storage.');

    let xhr = new XMLHttpRequest();
    xhr.open("GET", chrome.extension.getURL('/material.json'), false);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          material = JSON.parse(xhr.responseText);
        }
      }
    };
    xhr.send(null);

    chrome.storage.local.set({
      'materials': [ material ]
    }, function() {
      console.log('Value is set to:');
      console.log(material)

    });
    return;
  }
  console.log('Storage is initialized ' + result.materials);
});
