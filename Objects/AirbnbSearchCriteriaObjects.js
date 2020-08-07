function airbnbsearchcriteria() {

    this.LocationFld=element(by.xpath("//div[text()=\"Location\"]/following-sibling::input"));

    this.CheckInDateXpath=function(Date){
       this.checkin_date_xpath=element(by.xpath("//div[@data-testid=\"datepicker-day-"+Date+"\"]"));
        return this.checkin_date_xpath;
    }
    this.CheckOutDateXpath=function(Date){
        this.checkout_date_xpath=element(by.xpath("//div[@data-testid=\"datepicker-day-"+Date+"\"]"));
        return this.checkout_date_xpath;
    }

    this.smallSearch=element(by.className("_1cot5uz"));

    this.CheckInVal=element(by.xpath("//div[text()=\"Check in\"]/following-sibling::div"));

    this.CheckOutVal=element(by.xpath("//div[text()=\"Check out\"]/following-sibling::div"));

    this.GuestsBtn=element(by.xpath("//div[text()=\"Guests\"]/following-sibling::div"));

    this.mainPanel=element(by.xpath("//form[@role=\"search\"]/parent::div"));

    this.adultsIncreaseBtn=element(by.xpath("//div[@id=\"stepper-adults\"]/button[@aria-label=\"increase value\"]"));

    this.childsIncreaseBtn=element(by.xpath("//div[@id=\"stepper-children\"]/button[@aria-label=\"increase value\"]"));

    this.searchBtn=element(by.className("_1mzhry13"));

    this.locationFltr=function(location){
        this.locationFltr=element(by.xpath("//span[contains(text(),\"Location\")]/parent::button[text()=\""+location+"\"]"));
        return this.locationFltr;
    }

    this.dateFltrXpath=function(D1,D2){
        this.dateFltrXpath=element(by.xpath("//span[contains(text(),\"Check in\")]/parent::button[text()=\""+D1+" - "+D2+"\"]"));
        return this.dateFltrXpath;
    }

    this.guestsFltr=function(guestNumber){
        this.guestsFltr=element(by.xpath("//span[contains(text(),\"Guests\")]/parent::button[text()=\""+guestNumber+" guests\"]"));
        return this.guestsFltr;
    }


    this.propertyLst=function(num){
        this.propertylst=element(by.xpath("(//div[contains(text(),\"guests\")])["+num+"]"));
        return this.propertylst;
    }

    this.siteContent=element(by.id("site-content"));

    this.propertyLoopLst=element.all(by.xpath("//div[contains(text(),\"guests\")]"));

    this.getUrl=function(url){
        browser.driver.manage().window().maximize();
        browser.get(url);
    }

    this.getAttribValue=function(attrib){
        var attribParts=attrib.split("-")
        return attribParts[0]
    }

    this.increseAdults=function(adults){
        for(var i=1;i<=adults;i++){
            this.adultsIncreaseBtn.click();
        }
    }

    this.increseChilds=function(childs){
        for(var i=1;i<=childs;i++){
            this.childsIncreaseBtn.click();
        }
    }




};

module.exports=new airbnbsearchcriteria();