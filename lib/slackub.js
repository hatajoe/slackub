var request = require('request')
, qs      = require('qs')
, swig    = require('swig')
, path    = require('path');

module.exports = {
  init: function (url, token, req, gitlab_token) {
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

    if(event == 'merge_request'){
      body.project_id = body.source_project_id;
    }

    var super_token = gitlab_token;
    var project_url = 'http://git.dev3.cloverlab.jp:3000/api/v3/projects/' + body.project_id + '?private_token='  + super_token;
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", project_url , false);
    xmlHttp.send(null);

    var project = undefined;
    body.project_url = "";
    body.project_name = "";
    body.event_url = "";
    if(xmlHttp.status == 200){
      project = JSON.parse(xmlHttp.responseText);
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

