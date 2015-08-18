// This is required for mobiles to work. It can be found under https://developers.facebook.com -> Your App -> Settings -> Add Platform -> Facebook Canvas -> Canvas Page
var canvasURL = "https://apps.facebook.com/fanstwofundraisers";

var charityID = "au-27";
var campaignIDs = [
  'us-22',
  'us-19'
];
var goal = 5000000;


// Start and end dates for goal progress bar, raised, donations & supporters widgets. Format: YYYY-MM-DD (leave start or end date blank for no start or end date)
var startDate = "";
var endDate = "";


// Defaut values populated via the API. Leave blank unless you want to override.
var clientName = "";
var logoURL = "";
var description = "";
var shortDescription = "";
var getStartedURL = "";
var getStartedLabel = "Start Fundraising";
var donateURL = "";
var donateLabel = "Give Now";
var taxNumberLabel = "";
var taxNumber = "";


// Enable or disable elements
var enable_edhLogo = true;
var enable_image = true;
var enable_description = true;
var enable_getStarted = true;
var enable_donate = true;

var enable_goalBar = true;
var enable_raised = true;
var enable_supporters = true;
var enable_donations = true;

var enable_featuredEvents = true;
var enable_upcomingEvents = true;
var enable_topSupporters = true;
var enable_footer = true;


// Feature / exclude events
var featuredEvents = [
];

var excludedEvents = [
];
