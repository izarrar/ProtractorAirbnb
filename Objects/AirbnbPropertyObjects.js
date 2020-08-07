function airbnbpropertyobjects() {

    this.amnetiesLbl=element(by.xpath('//h2[text()=\"Amenities\"]'));

    this.clearAllLnk=element(by.xpath('//button[text()=\"Clear all\"]'));

    this.firstPropName=element(by.xpath('(//div[@class=\"_1c2n35az\"])[1]'));

    this.firstPropOnMap=function(PropertyName){
        this.firstPropOnMap=element(by.xpath("//span[@class=\"_1nq36y92\"]/parent::div/parent::div/parent::button[contains(@aria-label,\""+PropertyName+"\")]"));
        return this.firstPropOnMap;
    }

    this.firstPropOnMapPopUp=element(by.xpath('//a[@class=\"_i24ijs\"]'));

    this.mapLoader=element(by.xpath('//span[text()="Search as I move the map"]'));




};

module.exports=new airbnbpropertyobjects();