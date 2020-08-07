function Utils() {


    this.getProps = function (filePath) {
        var fs = require("fs")
        var rawContent = fs.readFileSync(filePath)
        var propertyMap = {}
        var fullContent = rawContent.toString()
        var allPairs = fullContent.split("\n")
        for (var i = 0; i < allPairs.length; i++) {
            var keyValue = allPairs[i].split("=")
            propertyMap[keyValue[0]] = keyValue[1]
        }

        return propertyMap;
    }

    this.addDate=function addDate(days) {
        var result = new Date();
        result.setDate(result.getDate() + days);
        var dd = String(result.getDate()).padStart(2, '0');
        var mm = String(result.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = result.getFullYear();

        result = yyyy + '-' + mm + '-' + dd;

        return result;
    }

    this.addToSpecificDate=function addToSpecificDate(date,days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        var dd = String(result.getDate()).padStart(2, '0');
        var mm = String(result.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = result.getFullYear();

        result = yyyy + '-' + mm + '-' + dd;

        return result;
    }












};
module.exports=new Utils();