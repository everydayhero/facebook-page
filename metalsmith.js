var Metalsmith = require('metalsmith');
var changed    = require('metalsmith-changed');
var templates  = require('metalsmith-templates');
var Handlebars = require('handlebars');
var markdown   = require('metalsmith-markdown')
var sass       = require('metalsmith-sass');
var imagemin   = require('metalsmith-imagemin');
var permalinks = require('metalsmith-permalinks');
var path       = require('path');
var fs         = require('fs');

// Debug Helper. Type {{ debug }} to log current context.
Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);
  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});

// Register all partials in "./templates/partials".
fs.readdirSync('templates/partials').forEach(function(file) {
  var name = file.split(".")[0];
  var contents = fs.readFileSync(__dirname + "/templates/partials/" + file).toString();
  Handlebars.registerPartial(name, contents);
});

module.exports = function metalSmith(done) {
  Metalsmith(__dirname)
    .clean(false)
    .use(changed())
    .use(markdown())
    .use(templates('handlebars'))
    .use(sass({
      outputDir: 'css/'
    }))
    .use(permalinks({
      pattern: ':title'
    }))
    .use(imagemin())
    .destination('./dist') 
    .build(function(err, files) {
      if (err) {
        console.log(err);
      } else {
        console.log('Forged!');
        if (typeof done === 'function') done();
      }
    });
};
