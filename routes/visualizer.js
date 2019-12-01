var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log(req.cookies);
    if(!req.cookies.days || !req.cookies.times) {
        res.redirect('/init');
    } else {
        res.render('visualizer', { days: req.cookies["days"], times: req.cookies["times"] });
    }
});

router.post('/', function(req, res, next) {
    const days = req.query["days"] || 5;
    const times = req.query["times"]|| 13;
    res.cookie('days', days, {expires: new Date(Date.now() + 90000000000)});
    res.cookie('times', times, {expires: new Date(Date.now() + 90000000000)});
    res.redirect('/visualizer');
});

module.exports = router;
