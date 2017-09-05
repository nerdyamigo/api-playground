// BASE SETUP
// CALL THE PACKAGAGES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Email = require('./app/models/email');

mongoose.connect('mongodb://test:abc@ds127564.mlab.com:27564/testing-email-server');

//config app to use body parser()
//this will let us get the data from post

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;    // set port

var router = express.Router();

router.use(function(req, res, next) {
  // log info
  console.log('-=SOMETHING IS HAPPENING=-');
  next();
})

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to our API' });
});


router.route('/emails')
  .post(function(req, res) {
    var email = new Email();  // create new instance of model
    email.address = req.body.address; 
    // save the email and check for errors
    email.save(function(err) {
      if(err)
       res.send(err);
      else res.json({ message: 'Email created' }) 
    });
  });

// prefix all routes with /api
app.use('/api', router);

// START SERVER
app.listen(port);
console.log('The magic happens on port: ' + port);


