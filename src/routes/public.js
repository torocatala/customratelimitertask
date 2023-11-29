var express = require('express');
var router = express.Router();
var rateLimiter = require('../middleware/rateLimiter');

const publicMaxRequests = process.env.PUBLIC_MAX_REQUESTS || 100;
const publicWindowSizeInSeconds = process.env.PUBLIC_WINDOW_SECONDS || 3600;

router.use(rateLimiter('public', publicMaxRequests, publicWindowSizeInSeconds));

router.get('/resource/one', function(req, res, next) { 
  res.json({ resource: "one"});
});

router.get('/resource/two', function(req, res, next) { 
  res.json({ resource: "two"});
});

router.get('/resource/three', function(req, res, next) { 
  res.json({ resource: "three"});
});

module.exports = router;
