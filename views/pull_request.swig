[pull request {{ action }}]
repository: <{{ repository.html_url }}|{{ repository.name }}>
ref: {{ base.ref }} < {{ head.ref }}
sender: {{ sender.login }}
pull request: #{{ pull_request.number }} <{{ pull_request.html_url }}|{{ pull_request.id }}>
body: {{ pull_request.body }}

