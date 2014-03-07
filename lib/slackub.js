var request = require('request')
  , github  = require('./github');

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

    var options = {
      uri: url + '?' + 'token=' + token,
      form: github.onEvent(channel, req)
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

