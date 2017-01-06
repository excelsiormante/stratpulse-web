// Server.js

/**
 * Responsible for server handling of the application
 * Main file that run at server start
 */

// Basic server setup
// ================================================================

// Declarations of requirements
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app     = express();
var port    = process.env.PORT || 8080;
var router	= express.Router();

//view engine declaration
app.set('view engine', 'pug');

//requires the external route file
require('./routes')(router);
app.use('/css',express.static('public/css'));
app.use('/js',express.static('public/javascripts'));
app.use('/images',express.static('public/images'));
app.use('/bootstrap',express.static('node_modules/bootstrap/dist/'));

// *** config middleware *** //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  saveUninitialized: true,
  resave: true
}));


//declration for homepage
app.use('/', router);


// Server start
// ================================================================
app.listen(port);
console.log('Magic happens on port ' + port);