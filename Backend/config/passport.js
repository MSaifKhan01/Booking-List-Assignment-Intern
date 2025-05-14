
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { userModel } = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  console.log("🔐 Google Profile Data:", profile);
  try {
    let user = await userModel.findOne({ googleId: profile.id });
    if (!user) {
      user = await userModel.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
      });

    } 
    return done(null, user);
  } catch (err) {
    console.error("❌ Error in GoogleStrategy:", err.message);
    return done(err, null);
  }
}));

module.exports = passport;
