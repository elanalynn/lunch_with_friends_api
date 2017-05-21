const express = require('express');
const router = express.Router();
const auth = require('../helpers/auth');

router.get('/', (req, res, next) => {
  res.send('respond with a resource...');
});

router.get('/:id', auth.isLoggedIn, (req, res, next) => {
  console.log('user detail route');
  res.send(req.user);
})

module.exports = router;
