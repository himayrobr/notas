// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('../server/models/userModel'); // Asegúrate de que la ruta es correcta

// Serialización y deserialización del usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Estrategia de Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback"  // Ajusta la URL según tu configuración
},
function(accessToken, refreshToken, profile, done) {
  // Lógica de usuario
  return done(null, profile);
}));

// Estrategia de Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'emails']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ providerId: profile.id, provider: 'facebook' });
    if (!user) {
      user = new User({
        provider: 'facebook',
        providerId: profile.id,
        name: profile.displayName,
        email: profile.emails && profile.emails[0] ? profile.emails[0].value : null
      });
      await user.save();
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

// Estrategia de Discord
passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: "/auth/discord/callback",
  scope: ['identify', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ providerId: profile.id, provider: 'discord' });
    if (!user) {
      user = new User({
        provider: 'discord',
        providerId: profile.id,
        name: profile.username,
        email: profile.email
      });
      await user.save();
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

module.exports = passport;
