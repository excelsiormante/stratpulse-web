var Express = require('express');
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var request = require('request');

//auth configs
var authConf = require('../config/auth');

function postLogin(req, res){

  var post_data = querystring.stringify({
    'grant_type': "password",
    'username' : req.body.username,
    'password' : req.body.password,
    'client_id': authConf.client_id,
    'client_secret' : authConf.client_secret
  });

  var options = {
    url: 'http://localhost:3000/auth/password',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(post_data)
    },
    body : post_data
  };
   
  //request.post(options).pipe(res);

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var accesstoken = JSON.parse(body);
      req.session.access_token = accesstoken.access_token.token;
      res.render('profile');
    }
  }); 

}



function facebookLogin(req, res){

  var post_data = querystring.stringify({
    'grant_type': "password",
    'client_id': authConf.client_id,
    'client_secret' : authConf.client_secret
  });

  var options = {
    url: 'http://localhost:3000/auth/facebook',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(post_data)
    },
    body : post_data
  };
   
  //request.post(options).pipe(res);

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var accesstoken = JSON.parse(body);
      req.session.access_token = accesstoken.access_token.token;
      res.send(req.session.access_token);
    }
  }); 

}

module.exports = {postLogin, facebookLogin};
