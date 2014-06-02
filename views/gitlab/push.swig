repository: <{{ project_url }}|{{ project_name }}>
ref: {{ ref }}
pusher: {{ user_name }}
commits_count: {{ total_commits_count }}
{% for commit in commits %}
    head: <{{ commit.url }}|{{ commit.id }}>
    author: {{ commit.author.name }}
    message: {{ commit.message }}
{% endfor %}
