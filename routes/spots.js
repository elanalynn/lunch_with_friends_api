const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res, next) => {
  console.log('spots route');
  const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&key=${process.env.PLACES_API_KEY}`

  request.get(placesUrl)
    .on('response', (response) => {
        console.log(response.statusCode);
        console.log(response.headers['content-type']); 
        res.send(response);
    })
    // .pipe(request.put('http://mysite.com/img.png'))
});

router.get('/:id', (req, res, next) => { //auth.isLoggedIn,
    res.send();
});

module.exports = router
