const express = require("express"),
  passport = require("passport"),
  keys = require("../config/keys"),
  app = express();

require("../models/newVisitor");

module.exports = app => {
  app.get("/", function(req, res) {
    res.render("index.ejs");
  });

  app.get("/students", function(req, res) {
    res.render("students.ejs");
  });

  // app.post("/students", function(req, res) {
  //   // create student
  //   Student.create(req.body.student, function(err, newStudent) {
  //     if (err) {
  //       res.render("/");
  //     } else {
  //       res.redirect("/students");
  //     }
  //   });
  // });

  app.post("/api/newVisitor", function(req, res) {
    // Check Name
    VisitorCheck.create(req.body.visitor, function(err, newVisitor) {
      const checkVisitor = req.body.checkVisitor;
      console.log("Visitor to check is ", checkVisitor);
    });
  });

  app.get("/api/newVisitor", function(req, res) {
    res.send(req.body.checkVisitor);
  });

  //   app.get("*", function(req, res) {
  //     res.render("catch.ejs");
  //   });
};
