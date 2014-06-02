repository: <{{ project_url }}|{{ project_name }}>
ref: {{ ref }}
pusher: {{ user_name }}
commits_count: {{ total_commits_count }}
{% for commit in commits %}

    author:{{ commit.name }}
    message:<{{ commit.url }}|{{ commit.message }}>
{% endfor %}

