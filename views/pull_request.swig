action: {{ action }}
repository: <{{ repository.html_url }}|{{ repository.name }}>
ref: {{ pull_request.base.ref }} < {{ pull_request.head.ref }}
sender: {{ sender.login }}
title: #{{ pull_request.number }} <{{ pull_request.html_url }}|{{ pull_request.title }}>
body: {{ pull_request.body }}

