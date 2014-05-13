action: {{ object_kind }}
repository: {{ object_attributes.project_id }}
sender: {{ object_attributes.assignee_id }}
issue: #{{ object_attributes.iid }}
body: {{  object_attributes.title }}

