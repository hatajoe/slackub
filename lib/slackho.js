var request = require('request')
  , qs      = require('qs')
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

    var channel = req.query.channel || 'random';
    var icon = req.query.icon || 'email';

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
        username: "slackho",
        text: req.body.echo,
        icon_emoji: ":" + icon + ":",
      }).replace("\\\\", "\\")
    };

    return {
      post: function (cb, errcb) {
        request.post(options, function (err, res) {
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

