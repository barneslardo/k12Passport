const passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth20"),
  LocalStrategy = require("passport-local"),
  OktaStrategy = require("passport-okta-oauth").Strategy,
  OidcStrategy = require("passport-openidconnect").Strategy,
  mongoose = require("mongoose"),
  keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        googleId: profile.id
      });

      if (existingUser) {
        // we already have a record of a user with that ID.
        done(null, existingUser);
      } else {
        // we don't have a user with that ID already. Make a new one.
        const user = await new User({
          userID: profile.id,
          userNameGoogle: {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
          },
          userImage: profile._json.image.url
        }).save();
        done(null, user);
      }
    }
  )
);

passport.use(
  "oidc",
  new OidcStrategy(
    {
      issuer: keys.issuer,
      authorizationURL:
        "https://bigfootwebservice.okta.com/oauth2/default/v1/authorize",
      tokenURL: "https://bigfootwebservice.okta.com/oauth2/default/v1/token",
      userInfoURL:
        "https://bigfootwebservice.okta.com/oauth2/default/v1/userinfo",
      clientID: keys.clientID,
      clientSecret: keys.clientSECRET,
      callbackURL: keys.callbackURL,
      scope: "openid profile"
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        profileId: profile.id
      });
      console.log(profile.id);
      console.log(profile.displayName);
      console.log(profile._json.email);
      if (existingUser) {
        // we already have a record of a user with that ID.
        done(null, existingUser);
      } else {
        // we don't have a user with that ID already. Make a new one.
        const user = await new User({
          userID: profile.id,
          userNameOkta: profile.displayName,
          emailOkta: profile._json.email
        }).save();
        done(null, user);
      }
    }
  )
);
