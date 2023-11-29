var express = require('express');
var router = express.Router();
var rateLimiter = require('../middleware/rateLimiter');
var simpleAuth = require('../middleware/simpleAuth');

const privateMaxRequests = process.env.PRIVATE_MAX_REQUESTS || 200;
const privateWindowSizeInSeconds = process.env.PRIVATE_WINDOW_SECONDS || 3600;

router.use(simpleAuth);
router.use(rateLimiter('private', privateMaxRequests, privateWindowSizeInSeconds));

router.get('/resource/four', function(req, res, next) { 
  res.json({ resource: "four"});
});

router.get('/resource/five', function(req, res, next) { 
  res.json({ resource: "five"});
});

router.get('/resource/six', function(req, res, next) { 
  res.json({ resource: "six"});
});

module.exports = router;
