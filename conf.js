var Jasmine2HtmlReporter=require('protractor-jasmine2-html-reporter');

exports.config = {
  directConnect: true,


  capabilities: {
    'browserName': 'chrome'
  },


  framework: 'jasmine',


  specs: ['./Tests/AirbnbTests.js'],

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },



  onPrepare: function() {
    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
        savePath:'./Reports & Screenshots',
        takeScreenshots:true,
        takeScreenshotsOnlyOnFailures:true,
        fixedScreenshotName:true,
        cleanDestination:false,
        showPassed:false,
        fileName:'Test Report',
        fileNameSeparator:'_'



    }));


      var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results',

    }));




    jasmine.getEnv().afterEach(function(done){


        browser.takeScreenshot().then(function (png) {
            allure.createAttachment('Screenshot', function () {
                return new Buffer.from(png, 'base64')
            }, 'image/png')();
            done();
        })



      });

  }

};



