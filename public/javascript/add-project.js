async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="project-title"]').value;
    const description = document.querySelector('textarea[name="project-description"]').value;
  
    const response = await fetch(`/api/project`, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-project-form').addEventListener('submit', newFormHandler);