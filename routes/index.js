var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/firstTask', function(req, res, next){
  res.render('firstTask', {title: "First Task"})
});

router.get('/secondTask', function(req, res, next){
  res.render('secondTask', {title: "Second Task"})
});

router.get('/thirdTask', function(req, res, next){
  res.render('thirdTask', {title: "Third Task"})
});

router.get('/fourthTask', function(req, res, next){
  res.render('fourthTask', {title: "Fourth Task"})
});

router.get('/fifthTask', function(req, res, next){
  res.render('fifthTask', {title: "Fifth Task"})
});

module.exports = router;
