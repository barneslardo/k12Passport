const express = require("express"),
  passport = require("passport"),
  OidcStrategy = require("passport-openidconnect").Strategy,
  keys = require("../config/keys"),
  app = express();

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/searchForm");
      console.log(req.user);
    }
  );

  app.get(
    "/auth/oktaOIDC",
    passport.authenticate("oidc", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/oktaOIDC/callback",
    passport.authenticate("oidc"),
    (req, res) => {
      res.redirect("/searchForm");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
