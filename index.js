const express = require("express"),
  app = express(),
  mongodb = require("mongodb"),
  ejs = require("ejs"),
  keys = require("./config/keys");
mongoose = require("mongoose");

app.set("view-engine", "ejs");
require("./mongo/mongo.js");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

app.get("/", function(req, res) {
  res.render("index.ejs");
});

app.post(
  "/students",
  function(req, res) {
    var firstName = req.body.firstName;
    // var lastName = req.body.lastName;
    // var parent1FirstName = req.body.parent1FirstName;
    // var parent1LastName = req.body.parent1LastName;
    // var parent2FirstName = req.body.parent2FirstName;
    // var parent2LastName = req.body.parent2LastName;
  }
  //var newStudent = { fistName: firstName, lastName: lastName, parent1FirstName: parent1FirstName, parent1LastName: parent1LastName, parent2FirstName: parent2FirstName, parent2LastName: parent2LastName }
);

app.listen(5000);
console.log("Server is running");
