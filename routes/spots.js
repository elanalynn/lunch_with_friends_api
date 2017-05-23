const express = require('express');
const router = express.Router();
const request = require('request-promise-native');

router.get('/search', (req, res, next) => {
    let location = req.query.location ? req.query.location : '39.718134,-104.900121';
    let radius = req.query.radius ? req.query.radius : '5000';
    let keyword = req.query.keyword ? req.query.keyword : 'vegan';

    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&types=restaurant&key=${process.env.PLACES_API_KEY}`;

    request.get(placesUrl)
    .then(response => {
        res.send(response);
    })
    .catch(err => {
        console.log(err); 
    });
});

router.get('/', (req, res, next) => {
    res.send('all the saved spots');
});

router.get('/:id', (req, res, next) => {
    res.send('one particular spot');
});

module.exports = router
