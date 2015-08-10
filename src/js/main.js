// Load config file
// -------------------------------------------------

// Read the GET variables
var $_GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
  function decode(s) {
    return decodeURIComponent(s.split("+").join(" "));
  }

  $_GET[decode(arguments[1])] = decode(arguments[2]);
});


// Which file?
var configFile = 'template.js';
if (typeof $_GET['client'] !== 'undefined') {
  configFile = $_GET['client']+'.js';
}


// Load file
$.getScript('../config/'+configFile)
.done(function(script, textStatus) {
  console.log('Loaded config file: /config/'+configFile);
})
.fail(function( jqxhr, settings, exception ) {
  console.log('Error loading config file :(');
})
