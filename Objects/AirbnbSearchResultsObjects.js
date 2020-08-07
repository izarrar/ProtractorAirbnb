function airbnbsearchresults() {

    this.moreFltrBtn=element(by.xpath('//span[contains(text(),\"More filters\")]/parent::button'));

    this.moreFiltersDialog=element(by.className('_12p9ain'));

    this.bedroomsIncreaseValBtn=element(by.xpath('//button[contains(@aria-describedby,\"bedrooms\") and contains(@aria-label,\"increase value\")]'));

    this.poolChkBx=element(by.xpath('//input[@name=\"Pool\"]/following-sibling::span'));

    this.showStayBtn=element(by.xpath('//button[contains(text(),\"Show\")]'));

    this.firstProperty=element(by.xpath('//a[@class="_gjfol0"][1]'));

    this.amnetiesLnk=element(by.xpath('//a[contains(text(),\"amenities\")]'));

    this.poolLbl=element(by.xpath('//h3[contains(text(),\"Facilities\")]/parent::div/parent::div//div[text()=\"Pool\"]'));

    this.amnetisLbl=element(by.xpath('(//h2[text()="Amenities"])[2]'));

};

module.exports=new airbnbsearchresults();