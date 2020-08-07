//Initilizing Objects
var utility=require("./Objects/Utils");
var airbnbsearchcriteriaobj=require("./Objects/AirbnbSearchCriteriaObjects.js");
var airbnbsearchresultsobj=require("./Objects/AirbnbSearchResultsObjects.js");
var airbnbpropertyobj=require("./Objects/AirbnbPropertyObjects.js");
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
//Fetching data from property file
var confProperties=utility.getProps("./Userdata/Conf.properties");
var url=confProperties["url"].trim();
var location=confProperties["Location"].trim();
var noOfAdults=parseInt(confProperties["Adults"].trim(), 10);
var noOfChilds=parseInt(confProperties["Childs"].trim(), 10);
var noOfBedrooms=parseInt(confProperties["Bedrooms"].trim(), 10);
//Initilizing Variables
var CheckIn="";
var CheckOut="";
var handles;
var EC = protractor.ExpectedConditions;

describe('Assignment airbnb', function() {
    //This code block will be executed before all tests(specs)
   beforeAll(function(){
       logger.debug("Opening URL")
       browser.waitForAngularEnabled(false);
       airbnbsearchcriteriaobj.getUrl(url);
       logger.debug("Landed on web page")
   })


    it('Verify that the search results match the search criteria', async function() {
        //Test1
        logger.debug("Verifying Test case 1")

        airbnbsearchcriteriaobj.LocationFld.sendKeys(location);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        airbnbsearchcriteriaobj.CheckInDateXpath(utility.addDate(7)).click();
        airbnbsearchcriteriaobj.CheckOutDateXpath(utility.addToSpecificDate(utility.addDate(7),7)).click();

       var CheckinDateVal=await airbnbsearchcriteriaobj.CheckInVal.getText();
       var CheckinDateValParts=CheckinDateVal.split(" ");
       var CheckoutDateVal=await airbnbsearchcriteriaobj.CheckOutVal.getText();
       var CheckoutDateValParts=CheckoutDateVal.split(" ");

       if(CheckinDateValParts[0]===CheckoutDateValParts[0]) {
           CheckIn=CheckinDateVal;
           CheckOut=CheckoutDateValParts[1];
       }
       else {
           CheckIn=CheckinDateVal;
           CheckOut=CheckoutDateVal;
       }


        airbnbsearchcriteriaobj.GuestsBtn.click();
        airbnbsearchcriteriaobj.increseAdults(noOfAdults);
        airbnbsearchcriteriaobj.increseChilds(noOfChilds);
        airbnbsearchcriteriaobj.searchBtn.click();
        browser.wait(EC.elementToBeClickable(airbnbpropertyobj.mapLoader), 10000);


        var totalGuests=noOfAdults+noOfChilds;
        var locationParts=location.split(",")

        var locationFltr=await airbnbsearchcriteriaobj.locationFltr(locationParts[0]).getText();
        expect(locationFltr).toContain(locationParts[0]);


        var dateFltr=await airbnbsearchcriteriaobj.dateFltrXpath(CheckIn,CheckOut).getText();
        expect(dateFltr).toContain(""+CheckIn+" - "+CheckOut+"");


        var guestFltr=await airbnbsearchcriteriaobj.guestsFltr(totalGuests).getText();
        expect(guestFltr).toMatch("Guests\n"+totalGuests+" guests");



        var guestNumber="";
        var guestParts;
        var guestsAvailable=0;

        var totalNoOfProperties=await airbnbsearchcriteriaobj.propertyLoopLst.count();

        for(var i=2;i<=totalNoOfProperties;i++) {
            guestNumber=await airbnbsearchcriteriaobj.propertyLst(i).getText();
            guestParts=guestNumber.split(" guests");
            guestsAvailable=parseInt(guestParts[0]);
            expect(true).toBe(guestsAvailable>=totalGuests);
        }

        logger.debug("Test case 1 verified")
    });

    it('Verify that the results and details page match the extra filters', async function() {
        //Test2
        logger.debug("Verifying Test case 2")

        browser.wait(EC.elementToBeClickable(airbnbsearchresultsobj.moreFltrBtn), 10000);

        airbnbsearchresultsobj.moreFltrBtn.click();

        browser.wait(EC.elementToBeClickable(airbnbpropertyobj.clearAllLnk), 10000);

        for (var i=1;i<=noOfBedrooms;i++) {
            airbnbsearchresultsobj.bedroomsIncreaseValBtn.click();
        }

        airbnbsearchresultsobj.poolChkBx.click();

        airbnbsearchresultsobj.showStayBtn.click();

        browser.wait(EC.elementToBeClickable(airbnbpropertyobj.firstPropName), 10000);

        var bedroomNumber="";
        var bedroomParts;
        var bedroomParts1;
        var availableBedroomNumber="";
        var bedroomsAvailable=0;

        browser.wait(EC.elementToBeClickable(airbnbpropertyobj.mapLoader), 10000);

        var totalNoOfProperties=await airbnbsearchcriteriaobj.propertyLoopLst.count();

        for(var i=2;i<=totalNoOfProperties;i++) {
            bedroomNumber=await airbnbsearchcriteriaobj.propertyLst(i).getText();
            bedroomParts=bedroomNumber.split("guests ");

            try {
                bedroomParts1=bedroomParts[1].split(" bedrooms");
            }
            catch(exp) {
                bedroomParts1=bedroomParts[0].split(" bedrooms");
            }



            availableBedroomNumber=bedroomParts1[0].split(" ");

            bedroomsAvailable=parseInt(availableBedroomNumber[1]);

            expect(true).toBe(bedroomsAvailable>=noOfBedrooms);

        }


        airbnbsearchresultsobj.firstProperty.click();


        handles=await browser.getAllWindowHandles();
        await browser.switchTo().window(handles[1]);

        browser.wait(EC.elementToBeClickable(airbnbsearchresultsobj.amnetiesLnk), 10000);

        airbnbsearchresultsobj.amnetiesLnk.click();


        try {
            browser.wait(EC.elementToBeClickable(airbnbsearchresultsobj.amnetisLbl), 5000).then(function(){
            }).catch(function(error){

                fail('Pool facility not found in facilities section');
            })
            var poolLbl = await airbnbsearchresultsobj.poolLbl.getText();
            expect(poolLbl).toMatch("Pool\nPrivate or shared");
        }
        catch(err){
            fail('Pool facility not found in facilities section');
        }
        logger.debug("Test case 2 verified")
    });

    it('Verify that a property is displayed on the map correctly', async function() {
        //Test3
        logger.debug("Verifying Test case 3")

        await browser.switchTo().window(handles[0]);

        airbnbsearchresultsobj.moreFltrBtn.click();

        browser.wait(EC.elementToBeClickable(airbnbpropertyobj.clearAllLnk), 10000);

        airbnbpropertyobj.clearAllLnk.click();

        airbnbsearchresultsobj.showStayBtn.click();

        browser.wait(EC.elementToBeClickable(airbnbpropertyobj.mapLoader), 10000);

        browser.actions().mouseMove(airbnbpropertyobj.firstPropName).perform();

        var firstPropName=await airbnbpropertyobj.firstPropName.getText();

        airbnbpropertyobj.firstPropOnMap(firstPropName).click();

        var propOnMap=await airbnbpropertyobj.firstPropOnMapPopUp.getAttribute("aria-label");

        expect(propOnMap).toMatch(firstPropName);

        logger.debug("Test case 3 verified")
    });

});