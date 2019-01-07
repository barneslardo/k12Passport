const express = require("express"),
  passport = require("passport"),
  keys = require("../config/keys"),
  app = express();

module.exports = app => {
  app.get("/", function(req, res) {
    res.render("index.ejs");
  });

  app.get("/students", function(req, res) {
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

  //   app.get("*", function(req, res) {
  //     res.render("catch.ejs");
  //   });
};
