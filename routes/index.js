
/*
 * GET home page.
 */
var slackub = require('../lib/slackub')
  , config  = require('../lib/config');

exports.index = function(req, res){
  var context = slackub.init(config.url, config.token, config.channel, req.body);
  context.post(function (code) {
    console.log('10000: ' + code);
    res.send(code);
  }, function (code, e) {
    res.send(code);
    console.log('20000: ' + e.message);
  });
};

