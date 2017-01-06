var Express = require('express');
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var request = require('request');

function postUser(req, res){

  var post_data = querystring.stringify({
    'firstName' : req.body.firstName,
    'lastName' : req.body.lastName,
    'email' : req.body.email,
    'password' : req.body.password
  });

  var options = {
    url: 'http://localhost:3000/user',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(post_data)
    },
    body : post_data
  };
   
  request.post(options).pipe(res);

}


function getUser(req, res){

  var options = {
    url: 'http://localhost:3000/user:'+req.body.id,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };
   
  request.get(options).pipe(res);

}



module.exports = {postUser};
