const express = require('express');
const router = express.Router();

router.get('/google', (req, res, next) => {
  passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' });
});

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
});