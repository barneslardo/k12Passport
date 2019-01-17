const express = require("express"),
  app = express(),
  keys = require("../config/keys"),
  passport = require("passport"),
  okta = require("@okta/okta-sdk-nodejs");

const client = new okta.Client({
  orgUrl: "https://bigfootwebservice.okta.com/",
  token: keys.oktaToken
});

module.exports = app => {
  app.get("/auth/okta", passport.authenticate("client", {}));
};

app.get("/auth/okta/callback", passport.authenticate("client"), (req, res) => {
  res.redirect("/surveys");
});
