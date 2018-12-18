var request = require("request");
var mongoose = require("mongoose");
console.log("Printing.... ");
request(
  "http://services.familywatchdog.us/rest/json.asp?key=YOUR-KEY-HERE&type=searchbynamedob&fname=john&lname=doe&dob=01/01/1960",
  function(error, response, body) {
    if (error) {
      console.log("something went wrong");
      console.log(error);
    } else {
      if ((!error && response.statusCode) == 200) {
        var parsedData = JSON.parse(body);
        console.log(parsedData["offenders"]);
      }
    }
  }
);

module.exports = request;
