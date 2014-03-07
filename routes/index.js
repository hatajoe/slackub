var slackub = require('../lib/slackub')
  , config  = require('../lib/config');

exports.index = function(req, res){
  var context = slackub.init(config.url, config.token, req.query.channel, req);
  context.post(function (code) {
    res.send(code);
  }, function (code, err) {
    res.send(code);
    console.log(err);
  });
};

