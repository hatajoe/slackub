var request = require('request')
  , qs      = require('qs')
  , swig    = require('swig')
  , path    = require('path');

module.exports = {
  init: function (url, token, channel, req) {
    if (url === undefined) {
      throw new Error('requires url');
    }
    if (token === undefined) {
      throw new Error('requires token');
    }
    if (channel === undefined) {
      throw new Error('requires channel');
    }

    var event = 'unknown';
    if (req.headers['X-GitHub-Event']) {
      event = req.headers['X-GitHub-Event'];
    }
    var template = swig.compileFile(path.resolve('views/' + event + '.swig'));
    var text = template(qs.parse(req.body));
    var options = {
      uri: url,
      qs: {
        'token': token
      },
      method: 'POST',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      body: 'payload=' + JSON.stringify({
        channel: "#" + channel,
        username: "slackub",
        text: text,
        icon_emoji: ":octocat:"
      }).replace("\\\\", "\\")
    };

    return {
      post: function (cb, errcb) {
        request.post(options, function(err, res, body) {
          if (!err && res.statusCode == 200) {
            cb(res.statusCode);
          } else {
            errcb(res.statusCode, err);
          }
        });
      }
    }
  }
};

