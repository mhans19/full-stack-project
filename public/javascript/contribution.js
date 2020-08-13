async function contributionFormHandler(event) {
    event.preventDefault();
  
    const contribution_type = document.querySelector('#project-contributions').value.trim();
    const contribution_hours = document.querySelector('#contribution-hours').value.trim();
    const contribution_description = document.querySelector('textarea[name="contribution-description"]').value.trim();
  
    const project_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    if (contribution_description) {
    const response = await fetch('/api/contribution', {
      method: 'POST',
      body: JSON.stringify({
        project_id: project_id,
        contribution_type: contribution_type,
        contribution_hours: contribution_hours,
        contribution_description: contribution_description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
  }
  
  document.querySelector('.contribution-form').addEventListener('submit', contributionFormHandler);