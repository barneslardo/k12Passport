const express = require("express"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  keys = require("../config/keys"),
  expressSanitizer = require("express-sanitizer"),
  { Schema } = mongoose,
  request = require("request"),
  app = express();

const User = mongoose.model("users");
const Visitor = mongoose.model("NewVisitor");
// require("../models/newVisitor");
var newVisitorSchema = new Schema({
  firstName: String,
  lastName: String,
  driversLicense: String
});

mongoose.model("visitor", newVisitorSchema);

module.exports = app => {
  app.get("/", function(req, res) {
    res.render("index.ejs");
  });

  app.get("/students", function(req, res) {
    res.render("students.ejs");
  });

  app.get("/auth", function(req, res) {
    res.render("auth.ejs");
  });

  app.get("/visitor/new", function(req, res) {
    res.render("newVisitor.ejs");
  });

  app.post("/visitor", function(req, res) {
    // req.body.visitor.body = req.sanitize(req.body.visitor.body);
    Visitor.create(req.body.visitor, function(err, newVisitor) {
      if (err) {
        res.send("There was an error");
      } else {
        console.log(req.body);
        res.redirect("/visitor/show");
      }
    });
  });

  app.get("/visitor/show", function(req, res) {
    Visitor.find({}, function(err, visitors) {
      if (err) {
        console.log("There was an error");
      } else {
        res.render("visitorShow.ejs", { visitor: visitors });
      }
    });
  });

  app.get("/searchForm", function(req, res) {
    res.render("searchForm.ejs");
  });

  app.get("/searchResults", function(req, res) {
    var query = req.query.search;
    var key = "&apikey=2f2d6110";
    var url = "http://www.omdbapi.com/?t=" + query + key;
    // console.log(query);
    // console.log(url);
    request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        if (data.Response == "False") {
          res.send("That movie doesn't exist");
        } else {
          // console.log(data);
          res.render("searchResults.ejs", { data: data });
        }
      }
    });
  });

  app.get("/users", function(req, res) {
    User.find({}, function(err, users) {
      if (err) {
        console.log("Error");
      } else {
        res.render("users.ejs", { users: users });
      }
    });
  });
};
