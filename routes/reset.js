var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (req.cookies.days) {
        res.clearCookie("days");
    }
    if (req.cookies.times) {
        res.clearCookie("times");
    }
    res.redirect("/init");
});

module.exports = router;