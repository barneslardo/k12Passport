const express = require("express"),
  app = express(),
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

app.set("view-engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./models/User");
require("./services/passport");
require("./routes/authRoutes");
require("./config/keys");
require("./models/Student", Student.Student), require("./routes/authRoutes");
require("./routes/authRoutes")(app);
require("./routes/oktaAuth");
require("./routes/navRoutes")(app);
// require("./models/requests");
// require("./models/crimeRequest");

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("Server is running");
