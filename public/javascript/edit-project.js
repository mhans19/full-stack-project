async function editFormHandler(event) {
    event.preventDefault();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    const title = document.querySelector('input[name="project-title"]').value.trim();
    const description = document.querySelector('textarea[name="project-body"]').value.trim();

      const response = await fetch(`/api/project/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          description
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
  
  }
  
  document.querySelector('.edit-project-form').addEventListener('submit', editFormHandler);