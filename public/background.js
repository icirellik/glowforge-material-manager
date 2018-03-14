// function listener(details) {
//   // let filter = chrome.webRequest.filterResponseData(details.requestId);
//   // let decoder = new TextDecoder("utf-8");
//   // let encoder = new TextEncoder();

//   // filter.ondata = event => {
//   //   let str = decoder.decode(event.data, {stream: true});
//   //   // Just change any instance of Example in the HTTP response
//   //   // to WebExtension Example.
//   //   console.log(str)
//   //   str = str.replace(/Maple/g, 'Cat');
//   //   filter.write(encoder.encode(str));
//   //   filter.disconnect();
//   // }

//   // let data = Base64.encode(JSON.stringify(materials));

//   //https://stackoverflow.com/questions/45714237/chrome-webrequest-redirect-data-urls


//   var xhr = new XMLHttpRequest();
//   var data;
//   xhr.onreadystatechange = function () {
//     data = {
//       redirectUrl: "data:application/json;charset=utf-8," + JSON.stringify(JSON.parse(xhr.responseText))
//     };
//   };
//   xhr.open("GET", chrome.extension.getURL('/materials.json'), false);
//   xhr.send();

//   return data;
// }

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    var xhr = new XMLHttpRequest();
    var data;
    xhr.onreadystatechange = function () {
      data = JSON.parse(xhr.responseText);
    };
    xhr.open("GET", chrome.extension.getURL('/material.json'), false);
    xhr.send();

    sendResponse({
      counter: request.counter + 1,
      material: data
    });
  }
);

// chrome.webRequest.onBeforeRequest.addListener(
//   listener,
//   {
//     urls: ["*://app.glowforge.com/api/materials"]
//   },
//   ["blocking"]
// );

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//     console.log(response.farewell);
//   });
// });
