action: {{ object_kind }}
repository: {{ object_attributes.target_project_id }}
ref: {{ object_attributes.target_branch }} < {{ object_attributes.source_branch }}
sender: {{ object_attributes.assignee_id }}
title: {{ object_attributes.title }}
body: {{ object_attributes.description }}

