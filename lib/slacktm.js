var request = require('request')
  , qs      = require('qs')
  , cheerio = require("cheerio")
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
console.log(req.body.channel_name);
    var channel = req.body.channel_name || 'random';

    return {
      post: function (cb, errcb) {
        request("http://www.lgtm.in/g", function(err, res) {
          if (!err && res.statusCode == 200) {
            var $ = cheerio.load(res.body);
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
                username: "slacktm",
                text: $("#imageUrl").attr('value'),
                icon_emoji: ":metal:",
              }).replace("\\\\", "\\")
            };
            request.post(options, function (err, res) {
              if (!err && res.statusCode == 200) {
                cb(res.statusCode);
              } else {
                errcb(res.statusCode, err);
              }
            });
          } else {
            errcb(res.statusCode, err);
          }
        });
      }
    }
  }
};

