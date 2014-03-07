var qs = require('qs');

module.exports = {
  onEvent: function (channel, req) {
    var event = '';
    if (req.headers['X-GitHub-Event']) {
      event = req.headers['X-GitHub-Event'];
    }
    var body = qs.parse(req.body);
    var text = '';
    switch (event) {
    case 'push'                       : text = _onPush(body); break;
    case 'pull_request'               : test = _onPullRequest(body); break;
    case 'pull_request_review_comment': test = _onPullRequestReviewComment(body); break;
    case 'issues'                     : test = _onIssues(body); break;
    case 'issue_comment'              : test = _onIssueComment(body); break;
    default                           : text = 'none'; break;
    }
    return {
      payload: '{"channel": "#' + channel + '", "username": "slackub", "text": "' + text + '", "icon_emoji": ":octocat:"}'
    };
  },
  _onPush: function (body) {
    var text =
  },
  _onPullRequest: function (body) {
  },
  _onPullRequestReviewComment: function (body) {
  },
  _onIssues: function (body) {
  },
  _onIssueComment: function (body) {
  }
};

