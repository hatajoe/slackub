var request = require('request')
  , qs      = require('qs')
  , swig    = require('swig')
  , path    = require('path');

module.exports = {
  init: function (url, token, req) {
    if (url === undefined) {
      throw new Error('requires url');
    }
    if (token === undefined) {
      throw new Error('requires token');
    }
    if (req === undefined) {
      throw new Error('requires req');
    }

    var event = 'unknown';
    if (req.headers['x-github-event']) {
      event = req.headers['x-github-event'];
    }

    var channel = req.body.channel || 'general';
    var color = req.body.color || '00FF00';

    var template;
    try {
      template = swig.compileFile(path.resolve('views/' + event + '.swig'));
    } catch(e) {
      template = swig.compileFile(path.resolve('views/unknown.swig'));
    }

    var body = JSON.parse(req.body.payload);
    var text = template(body);
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
        text: "GitHub Notification",
        icon_emoji: ":octocat:",
        attachments: [
          {
            fallback: "webhook event",
            color: "#" + color,
            fields: [
              {
                title: event,
                value: text,
                short: false
              }
            ]
          }
        ]
      }).replace("\\\\", "\\")
    };

    return {
      post: function (cb, errcb) {
        request.post(options, function(err, res) {
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

