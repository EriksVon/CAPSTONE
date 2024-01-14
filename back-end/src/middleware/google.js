import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../users/usersModel.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_URL,
    },
    async function (_, __, profile, cb) {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.name.givenName,
          surname: profile.name.familyName,
          email: profile.emails[0].value,
          image: profile.picture,
        });
        cb(null, user);
      } else {
        cb(null, user);
      }
    }
  )
);
