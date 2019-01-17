const passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth20"),
  LocalStrategy = require("passport-local"),
  OktaStrategy = require("passport-okta-oauth").Strategy,
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
          googleId: profile.id,
          userName: {
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

// passport.use(
//   new OktaStrategy(
//     {
//       audience: keys.baseURL,
//       clientID: keys.clientID,
//       clientSecret: keys.clientSECRET,
//       scope: ["openid", "email", "profile"],
//       response_type: "code",
//       callbackURL: "http://localhost:5000/auth/okta/callback"
//     },
//     function(accessToken, refreshToken, profile, done) {
//       return profile;
//     }
//   )
// );
//
// // passport.use(
// //   LocalStrategy({
// //
// //   })
// // )
