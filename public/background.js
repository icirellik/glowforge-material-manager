chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    var xhr = new XMLHttpRequest();
    var material;
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
      counter: request.counter + 1,
      material: material
    });
  }
);
