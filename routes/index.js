var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index.ejs', {page:'Home', menuId:'home'});
});

module.exports = router;
