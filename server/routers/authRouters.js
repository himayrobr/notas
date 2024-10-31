// server/routers/authRouters.js
const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  const token = req.user.generateJwt(); // Suponiendo que tu modelo User tiene un método para generar JWT
  res.redirect(`http://localhost:3000/auth-callback?token=${token}`);
});

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
  const token = req.user.generateJwt();
  res.redirect(`http://localhost:3000/auth-callback?token=${token}`);
});

router.get('/discord', passport.authenticate('discord', { scope: ['identify', 'email'] }));
router.get('/discord/callback', passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => {
  const token = req.user.generateJwt();
  res.redirect(`http://localhost:3000/auth-callback?token=${token}`);
});

module.exports = router;
