var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , style: "style.css"});
});

router.get('/firstTask', function(req, res, next){
  res.render('firstTask', {title: "First Task", style: "firstTask.css"})
});

router.get('/secondTask', function(req, res, next){
  res.render('secondTask', {title: "Second Task", style: "secondTask.css"})
});

router.get('/thirdTask', function(req, res, next){
  res.render('thirdTask', {title: "Third Task", style: "thirdTask.css"})
});

router.get('/fourthTask', function(req, res, next){
  res.render('fourthTask', {title: "Fourth Task", style: "fourthTask.css"})
});

router.get('/fifthTask', function(req, res, next){
  res.render('fifthTask', {title: "Fifth Task", style: "fifthTask.css"})
});

module.exports = router;
