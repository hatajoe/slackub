[push]
repository: <{{ repository.url }}|{{ repository.name }}>
ref: {{ ref }} 
pusher: {{ pusher.name }}
head: <{{ head_commit.url }}|{{ head_commit.id }}>
comment: {{ head_commit.message }}

