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

    return {
      post: function (cb, errcb) {
        var body = req.body;
        var event = 'unknown';
        if (body.object_kind) {
          event = body.object_kind;
        } else if (body.before) {
          event = "push";
        }

        if(event == 'merge_request'){
          body.project_id = body.source_project_id;
        }

        var project_url = 'http://git.dev3.cloverlab.jp:3000/api/v3/projects/' + body.project_id + '?private_token='  + gitlab_token;
        var options = {
          url: project_url,
          json: true
        };
        request.get(options, function (err, response, project) {
          body.project_url = "";
          body.project_name = "";
          body.event_url = "";

          if (!err && response.statusCode == 200) {
            body.project_url  = project.web_url + '/' + body.project_id;
            body.project_name = project.path_with_namespace;
          }

          var channel = req.query.channel || 'random';
          var color = req.query.color || '00FF00';

          var template;
          try {
            template = swig.compileFile(path.resolve('views/gitlab/' + event + '.swig'));
            body.event_url = project_url + '/' + event + '/' +  body.id;
          } catch(e) {
            template = swig.compileFile(path.resolve('views/gitlab/unknown.swig'));
          }

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
              username: "slackab",
              text: "GitLab Notification",
              icon_emoji: ":gitlab:",
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

          request.post(options, function(err, res) {
            if (!err && res.statusCode == 200) {
              cb(res.statusCode);
            } else {
              errcb(res.statusCode, err);
            }
          });
        });
      }
    }
  }
};

