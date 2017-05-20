const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get('/google', (req, res, next) => {
  passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' });
});

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.redirect('/');
});

router.get('/login', (req, res, next) => {
  res.end();
})

router.get('/logout', function (req, res) {
  req.session = null
  res.redirect('/')
})

module.exports = router