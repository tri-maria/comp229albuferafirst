var express = require('express');
const app = require('../app');
var router = express.Router();
/* create a router...example.com/   trigger when use the slash   */
/* GET home page. */ 
router.get('/', function(req, res, next) {
  res.render('partials/home', { title: 'Home'}); //define under index.ejs -inject the title property
});


/* GET about page. */
router.get('/home', function(req, res, next) {
 res.render('partials/home', { title: 'Home'});
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('partials/about', { title: "Maria's" });// res.render('partials/about', { title: 'About'});
});

router.get('/project', function(req, res, next) {
  res.render('partials/project', { title: 'Projects' });// res.render('partials/about', { title: 'About'});
});

router.get('/services', function(req, res, next) {
  res.render('partials/services', { title: 'Services' });// res.render('partials/about', { title: 'About'});
});

router.get('/contactus', function(req, res, next) {
  res.render('partials/contactus', { title: 'Contact Us' });// res.render('partials/about', { title: 'About'});
});

/*redirect form's data */
router.post('/contact', function(req, res, next){
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let phone = req.body.phone;
  let email = req.body.email;
  let message = req.body.message;
  res.send(first_name+' ,'+ last_name+' ,'+phone+' ,'+email+' ,'+message);
});
 

module.exports = router;
