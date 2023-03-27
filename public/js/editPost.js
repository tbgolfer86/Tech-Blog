const editPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#edit-post-title').value.trim();
    const content = document.querySelector('#edit-post-content').value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/blogposts/:id`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to edit post');
      }
    }
  };
  
  document
    .querySelector('.edit-post')
    .addEventListener('submit', editPostHandler);



const delPostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      
      const response = await fetch(`/api/blogposts/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  };

  document
    .querySelector('#delete')
    .addEventListener('click', delPostHandler);