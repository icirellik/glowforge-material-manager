chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    let material;
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

    console.log("Updating custom materials.");
    console.log(material)

    sendResponse({
      material: material
    });
  }
);
