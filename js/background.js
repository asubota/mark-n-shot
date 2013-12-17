
var _actions = (function() {
  var get_blob = function(screenshotUrl) {
    var base64Image = screenshotUrl.split("data:image/png;base64,")[1],
      binaryImg = atob(base64Image),
      length = binaryImg.length,
      ab = new ArrayBuffer(length),
      ua = new Uint8Array(ab);

    for (var i = 0; i < length; i++) {
      ua[i] = binaryImg.charCodeAt(i);
    }

    return new Blob([ab], {type: "image/png"});
  },

  crop = function() {
    
  },

  page = function() {
    chrome.tabs.captureVisibleTab(null, {format:'png'}, function (screenshotUrl) {
      var blob = get_blob(screenshotUrl);
      saveAs(blob, _get('screenshot_name'));
    });
  },

  listen = function (port) {
    bindEvents(port);
  },

  bindEvents = function(port) {

    chrome.browserAction.onClicked.addListener(function() {
      port.postMessage({"action": "start"});
    });

    port.onMessage.addListener(function (response) {
      if (response.action === 'crop') {
        crop();
      }
      if (response.action === 'page') {
        page();
      }
    });
  };

  // Public Endpoints
  return {
    "listen": listen
  }

})();

chrome.runtime.onConnect.addListener(function (port) {
  _actions.listen(port);
});
