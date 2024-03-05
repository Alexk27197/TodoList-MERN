const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const initializePassport = () => {
  passport.serializeUser(({ user }, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/api/users/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await UserModel.findOne({ googleId: profile.id });

          if (!user) {
            user = new UserModel({
              googleId: profile.id,
              username: profile.displayName,
              googleUser: true,
            });
            await user.save();
          }

          const userForToken = {
            id: user._id,
            username: user.username,
            email: user?.email,
          };
          // console.log("userForToken", userForToken);
          const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
            expiresIn: "24h",
          });
          done(null, { user, token }); // פה אתה מעביר את המשתמש והטוקן חזרה
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
module.exports = { initializePassport };
