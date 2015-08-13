// CONFIG STUFF
// -------------------------------------------------
// Read the GET variables
var $_GET = {};
document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
  function decode(s) {
    return decodeURIComponent(s.split("+").join(" "));
  }
  $_GET[decode(arguments[1])] = decode(arguments[2]);
});

// Which config file?
var configFile = 'template.js';
if (typeof $_GET['client'] !== 'undefined') {
  configFile = $_GET['client']+'.js';
}

// Load config file
$.getScript('config/'+configFile, function(data, textStatus, jqxhr) {
  getConfigFromAPI();
});


// Function to get config from the API and put it into blank config vars
function getConfigFromAPI() {
  var url = "http://everydayhero.com/api/v2/charities/"+charityID+".jsonp?";
  var request = $.getJSON(url+'&callback=?', function(data) {
    var apiData = data.charity;

    if (clientName === "") {
      clientName = apiData.name;
    }
    if (logoURL === "") {
      logoURL = apiData.logo_url;
    }
    if (description === "") {
      description = apiData.description;
    }
    if (shortDescription === "") {
      shortDescription = description.substr(0, 300) + '&hellip;';
    }
    if (getStartedURL === "") {
      getStartedURL = apiData.get_started_url;
    }
    if (donateURL === "") {
      donateURL = apiData.donate_url;
    }
    if (taxNumberLabel === "") {
      taxNumberLabel = apiData.tax_number_label;
    }
    if (taxNumber === "") {
      taxNumber = apiData.tax_number;
    }

    // Once the config's all setup, populate and display the page
    populatePage();
  });

}



// POPULATE PAGE
// -------------------------------------------------
// Function to populate the page, then remove the loading bar and display it
function populatePage() {
  // Populate page
  if (enable_image) {
    $('#logo').attr('src', logoURL);
    $('#logo').attr('alt', clientName);
  }
  if (enable_description) {
    $('#description').html(shortDescription);
  }
  if (enable_getStarted) {
    edh.widgets.renderWidget('getStarted', 'CallToActionButton', {
      kind: 'cta',
      label: getStartedLabel,
      href: getStartedURL
    });
  }
  if (enable_donate) {
    edh.widgets.renderWidget('donate', 'CallToActionButton', {
      kind: 'secondary',
      label: donateLabel,
      href: donateURL
    });
  }
  if (enable_footer) {
    $('#clientName').html(clientName);
    $('#clientTax').html(taxNumberLabel+": "+taxNumber);
  }

  // Disable DOM elements (as per config)
  disableDOMElements();

  // Initiate widgets (as per config)
  initateWidgets();

  // Display page
  $('.loading').fadeOut(400, function() { $('.contentWrapper').fadeIn(400); });
}



// DISABLE DOM ELEMENTS
// -------------------------------------------------
function disableDOMElements() {
  if (!enable_edhLogo) {
    $('header').remove();
  }
  if (!enable_image) {
    $('#logo').remove();
  }
  if (!enable_description) {
    $('#description').remove();
  }
  if (!enable_getStarted) {
    $('#getStarted').remove();
  }
  if (!enable_donate) {
    $('#donate').remove();
  }

  if (!enable_goalBar) {
    $('#goalBar').remove();
  }
  if (!enable_raised) {
    $('#raised').remove();
  }
  if (!enable_supporters) {
    $('#supporters').remove();
  }
  if (!enable_donations) {
    $('#donations').remove();
  }

  if (!enable_featuredEvents) {
    $('#featuredEventsContainer').remove();
  }
  if (!enable_upcomingEvents) {
    $('#upcomingEventsContainer').remove();
  }
  if (!enable_topSupporters) {
    $('#topSupporters').remove();
  }
  if (!enable_footer) {
    $('footer').remove();
  }
}



// READ MORE / LESS
// -------------------------------------------------
var readState = 'less';
function readMore() {
  if (readState === 'less') {
    $('#description').html(description);
    $('.readMore').html('Hide');
    readState = 'more';
  } else {
    $('#description').html(shortDescription);
    $('.readMore').html('Continue reading');
    readState = 'less';
  }
}



// WIDGETS
// -------------------------------------------------
function initateWidgets() {
  // Goal bar
  if (enable_goalBar) {
    edh.widgets.renderWidget('goalBar', 'EntityGoalProgress', {
      charityUid: charityID,
      goal: (goal * 100)
    });
  }


  // Metrics
  if (enable_raised) {
    if (campaignIDs.length > 0) {
      edh.widgets.renderWidget('raised', 'FundsRaised', {
        campaignUids: campaignIDs,
        format: '0,0'
      });
    } else {
      edh.widgets.renderWidget('raised', 'FundsRaised', {
        charityUid: charityID
      });
    }
  }

  if (enable_supporters) {
    if (campaignIDs.length > 0) {
      edh.widgets.renderWidget('supporters', 'TotalSupporters', {
        campaignUids: campaignIDs
      });
    } else {
      edh.widgets.renderWidget('supporters', 'TotalSupporters', {
        charityUid: charityID
      });
    }
  }

  if (enable_donations) {
    if (campaignIDs.length > 0) {
      edh.widgets.renderWidget('donations', 'TotalDonations', {
        campaignUids: campaignIDs
      });
    } else {
      edh.widgets.renderWidget('donations', 'TotalDonations', {
        charityUid: charityID
      });
    }
  }


  // Events
  if (enable_featuredEvents) {
    edh.widgets.renderWidget('featuredEventsFix', 'UpcomingEvents', { }); // This is a bug fix. For some reason without calling this first, the next time comes out at full width? :(

    edh.widgets.renderWidget('featuredEvents', 'UpcomingEvents', {
      charityUid: charityID
    });
  }
  if (enable_upcomingEvents) {
    edh.widgets.renderWidget('upcomingEvents', 'UpcomingEvents', {
      charityUid: charityID
    });
  }


  // Top Supporters
  if (enable_topSupporters) {
    if (campaignIDs.length > 0) {
      edh.widgets.renderWidget('topSupporters', 'Supporters', {
        //campaignUids: campaignIDs
        charityUid: charityID
      });
    } else {
      edh.widgets.renderWidget('topSupporters', 'Supporters', {
        charityUid: charityID
      });
    }
  }
}
