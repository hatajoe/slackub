action: {{ object_kind }}
repository: {{ object_attributes.target_project_id }}
ref: {{ object_attributes.target_branch }} < {{ object_attributes.source_branch }}
sender: {{ object_attributes.author_id }}
title: {{ object_attributes.title }}
body: {{ object_attributes.description }}
state: {{ object_attributes.state }}

