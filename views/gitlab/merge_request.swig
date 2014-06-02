repository: <{{ project_url }}|{{ project_name }}>
merge_request: !<{{ event_url }}|{{ object_attributes.iid }}>
action: {{ object_attributes.state }}
title: {{ object_attributes.title }}
