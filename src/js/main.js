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
$(document).ready(function() {
  $.getScript('config/'+configFile, function(data, textStatus, jqxhr) {
    getConfigFromAPI();
  });

  setInterval(iframeResize, 1000);
});


// Size the parent iFrame
function iframeResize() {
  var height = $('body').outerHeight();
  parent.postMessage("resize::"+height,"*");
}


// Function to get config from the API and put it into blank config vars
function getConfigFromAPI() {
  var url = "https://everydayhero.com/api/v2/charities/"+charityID+".jsonp?";
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

  if (!enable_featuredEvents || featuredEvents.length === 0) {
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
    if (campaignIDs.length > 0) {
      edh.widgets.renderWidget('goalBar', 'EntityGoalProgress', {
        campaignUid: campaignIDs,
        goal: (goal * 100),
        startAt: startDate,
        endAt: endDate
      });
    } else {
      edh.widgets.renderWidget('goalBar', 'EntityGoalProgress', {
        charityUid: charityID,
        goal: (goal * 100),
        startAt: startDate,
        endAt: endDate
      });
    }
  }


  // Metrics
  if (enable_raised) {
    if (campaignIDs.length > 0) {
      edh.widgets.renderWidget('raised', 'FundsRaised', {
        campaignUids: campaignIDs,
        format: '0,0',
        startAt: startDate,
        endAt: endDate
      });
    } else {
      edh.widgets.renderWidget('raised', 'FundsRaised', {
        charityUid: charityID,
        format: '0,0',
        startAt: startDate,
        endAt: endDate
      });
    }
  }

  if (enable_supporters) {
    if (campaignIDs.length > 0) {
      edh.widgets.renderWidget('supporters', 'TotalSupporters', {
        campaignUids: campaignIDs,
        format: '0,0',
        startAt: startDate,
        endAt: endDate
      });
    } else {
      edh.widgets.renderWidget('supporters', 'TotalSupporters', {
        charityUid: charityID,
        format: '0,0',
        startAt: startDate,
        endAt: endDate
      });
    }
  }

  if (enable_donations) {
    if (campaignIDs.length > 0) {
      edh.widgets.renderWidget('donations', 'TotalDonations', {
        campaignUids: campaignIDs,
        format: '0,0',
        startAt: startDate,
        endAt: endDate
      });
    } else {
      edh.widgets.renderWidget('donations', 'TotalDonations', {
        charityUid: charityID,
        format: '0,0',
        startAt: startDate,
        endAt: endDate
      });
    }
  }


  // Events
  edh.widgets.renderWidget('featuredEventsFix', 'UpcomingEvents', { charityUid: '' }); // This is a bug fix. For some reason without calling this first, the featuredEvents below comes out at full width? :(

  if (enable_featuredEvents && featuredEvents.length > 0) {
    edh.widgets.renderWidget('featuredEvents', 'UpcomingEvents', {
      charityUid: charityID,
      events: featuredEvents
    });
  }
  if (enable_upcomingEvents) {
    edh.widgets.renderWidget('upcomingEvents', 'UpcomingEvents', {
      charityUid: charityID,
      excludeEvents: excludedEvents
    });
  }


  // Top Supporters
  if (enable_topSupporters) {
    if (campaignIDs.length > 0) {
      edh.widgets.renderWidget('topSupporters', 'Supporters', {
        campaignUids: campaignIDs
      });
    } else {
      edh.widgets.renderWidget('topSupporters', 'Supporters', {
        charityUid: charityID
      });
    }
  }
}
