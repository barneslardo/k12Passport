const express = require("express"),
  app = express(),
  mongodb = require("mongodb"),
  ejs = require("ejs"),
  keys = require("./config/keys"),
  request = require("request"),
  bodyParser = require("body-parser"),
  Student = require("./models/Student"),
  mongoose = require("mongoose");

app.set("view-engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
require("./config/keys");
require("./models/Student");
// require("./models/requests");
// require("./models/crimeRequest");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

app.get("/", function(req, res) {
  res.render("index.ejs");
});

app.get("/students", function(req, res) {
  Student.find({}, function(err, students1) {
    if (err) {
      console.log("Something went wrong");
    } else {
      res.render("students.ejs", { student: student });
    }
  });
  res.render("students.ejs");
});

app.post("/students", function(req, res) {
  // create student
  Student.create(req.body.student, function(err, newStudent) {
    if (err) {
      res.render("/");
    } else {
      res.redirect("/students");
    }
  });
});

app.listen(5000);
console.log("Server is running");
