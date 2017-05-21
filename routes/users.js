const express = require('express');
const router = express.Router();
const auth = require('../helpers/auth');
const user = require('../db/users');

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/:id', (req, res, next) => { //auth.isLoggedIn,
  console.log('user detail route');
  // res.send(req.user);
  user.getOne(req.params.id).then(user => {
    res.send({
        "data": [{
          "type": "users",
          "id": user.id,
          "attributes": user,
          "relationships": {}
        }]
      });
  });
});

module.exports = router;
