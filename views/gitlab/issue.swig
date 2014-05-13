action: {{ object_attributes.state }}
repository: {{ object_attributes.project_id }}
sender: {{ object_attributes.author_id }}
issue: #{{ object_attributes.iid }}
body: {{  object_attributes.title }}

