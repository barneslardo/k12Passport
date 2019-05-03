const express = require("express"),
  app = express(),
  OidcStrategy = require("passport-openidconnect").Strategy,
  mongodb = require("mongodb"),
  ejs = require("ejs"),
  cookieSession = require("cookie-session"),
  passport = require("passport"),
  okta = require("@okta/okta-sdk-nodejs"),
  keys = require("./config/keys"),
  request = require("request"),
  bodyParser = require("body-parser"),
  Student = require("./models/Student"),
  NewVisitor = require("./models/newVisitor"),
  mongoose = require("mongoose");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);
app.use(express.static("public"));
app.set("view-engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    maxAge: 3 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(function(req, res, next) {
//   res.locals.currentUser = req.user;
// });

require("./models/User");
require("./services/passport");
require("./routes/authRoutes");
require("./config/keys");
// require("./models/Student", Student.Student), require("./routes/authRoutes");
require("./routes/authRoutes")(app);
require("./routes/oktaAuth");
require("./routes/navRoutes")(app);
// require("./models/requests");
// require("./models/crimeRequest");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port: " + PORT));
