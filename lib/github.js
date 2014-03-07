var qs   = require('qs')
  , swig = require('swig')
  , path = require('path');

module.exports = {
  onEvent: function (channel, req) {
    var event = 'unknown';
    if (req.headers['X-GitHub-Event']) {
      event = req.headers['X-GitHub-Event'];
    }
    var body = qs.parse(req.body);
    var template = swig.compileFile(path.resolve('views/' + event + '.swig'));
    var text = template(body);
    console.log(text);
    return JSON.stringify({
      channel: "#" + channel,
      username: "slackub",
      text: text,
      icon_emoji: ":octocat:"
    }).replace("\\\\", "\\");
  }
};

