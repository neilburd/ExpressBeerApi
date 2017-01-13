// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');


// set up a variable to hold our model here...

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
  console.log("Something is happening");
  next();
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the beer api!' });
});

// more routes for our API will happen here
router.route('/beers')

// create
  .post(function(req, res) {
    // code here
  })

// index
  .get(function(req, res) {
    // code here
  });


router.route('/beers/:beer_id')

  // show
  .get(function(req, res) {
    // code here
  })

  // update
  .put(function(req, res) {
    // code here
  })

  // destroy
  .delete(function(req, res) {
    // code here
  })

// View all routes
router.get("/routes", function(req, res){
  console.log(router.stack);
  res.json(router.stack);
});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Beer is being served on port ' + port);
