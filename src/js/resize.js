// Send window vars to the iFrame
function edhSendWindow() {
  var topWindow = [];
  topWindow['scrollTop'] = window.pageYOffset || document.documentElement.scrollTop;
  topWindow['windowHeight'] = window.innerHeight;
  topWindow['windowWidth'] = window.innerWidth;
  topWindow['windowTop']  = window.screenTop ? window.screenTop : window.screenY;
  topWindow['windowLeft'] = window.screenLeft ? window.screenLeft : window.screenX;
  topWindow['iframeTop'] = document.getElementById('edh-iframe').offsetTop;

  left = window.pageXOffset || document.documentElement.scrollLeft;

  document.getElementById('edh-iframe').contentWindow.postMessage(topWindow, '*');
}

// Attach window stuff to scroll
if (window.attachEvent) {
  window.attachEvent('onscroll', edhSendWindow);
} else if (window.addEventListener) {
  window.addEventListener('scroll', edhSendWindow);
}

// Listen for messages sent from the iFrame
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

eventer(messageEvent,function(e) {
  // If the message is DOMREADY
  if (e.data == 'DOMREADY') {
    edhSendWindow();
  }

  // If the message is a link
  if (e.data.indexOf('link::') != -1) {
    var url = e.data.replace('link::', '');
    if (url != '#') {
      window.location = url;
    }
  }

  // If the message is a resize frame request
  if (e.data.indexOf('resize::') != -1) {
    var height = e.data.replace('resize::', '');
    document.getElementById('edh-iframe').style.height = height+'px';
  }
} ,false);
