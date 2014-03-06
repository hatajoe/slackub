var request = require('request')
  , qs      = require('qs');

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

    var event = req.headers['X-GitHub-Event'];
    var body = qs.parse(req.body);

    var uri = url + '?' + 'token=' + token + '&' + 'channel=%23' + channel;
    var options = {
      uri: uri,
      form: {
        payload: {
          "channel": channel,
          "username": "slackub",
          "text": body,
        }
      },
    };

    return {
      post: function (cb, errcb) {
        request.post(options, function(err, res, body){
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

