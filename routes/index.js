var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let hasCookie = false;
  if(req.cookies.days && req.cookies.times) {
    hasCookie = true;
  }
  res.render('index', { "hasCookie": hasCookie });
});

module.exports = router;
