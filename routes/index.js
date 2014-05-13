var slackub = require('../lib/slackub')
  , slackab = require('../lib/slackab')
  , slacktm = require('../lib/slacktm')
  , slackho = require('../lib/slackho')
  , config  = require('../lib/config');

exports.index = function(req, res){
  var context = slackub.init(config.url, config.token, req);
  context.post(function (code) {
    res.send(code);
  }, function (code, err) {
    res.send(code);
    console.log(err);
  });
};

exports.lgtm = function(req, res){
  var context = slacktm.init(config.url, config.token, req);
  context.post(function (code) {
    res.send(code);
  }, function (code, err) {
    res.send(code);
    console.log(err);
  });
};

exports.echo = function(req, res){
  var context = slackho.init(config.url, config.token, req);
  context.post(function (code) {
    res.send(code);
  }, function (code, err) {
    res.send(code);
    console.log(err);
  });
};

exports.gitlab = function(req, res){
  var context = slackab.init(config.url, config.token, req);
  context.post(function (code) {
    res.send(code);
  }, function (code, err) {
    res.send(code);
    console.log(err);
  });
};

