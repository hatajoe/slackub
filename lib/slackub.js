var request = require('request');

module.exports = {
  init: function (url, token, channel, json) {
    if (url === undefined) {
      throw new Error('requires url');
    }
    if (token === undefined) {
      throw new Error('requires token');
    }
    if (channel === undefined) {
      throw new Error('requires channel');
    }

    var uri = url + '?' + 'token=' + token + '&' + 'channel=%23' + channel;
    var options = {
      uri: uri,
      form: json,
      json: false
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

