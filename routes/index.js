var slackub = require('../lib/slackub')
  , slacktm = require('../lib/slacktm')
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

