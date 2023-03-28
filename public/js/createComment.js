    const createCommentHandler = async (event) => {
      event.preventDefault();
    
      const message = document.querySelector('#post-comment').value.trim();
      const id = event.target.getAttribute('data-id');
      console.log('This is the id' + id)
      if (message) {
        const response = await fetch(`/api/comments`, {
          method: 'POST',
          body: JSON.stringify({ message, id }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to create comment');
        }
      }
    };
    
    document
      .querySelector('.create-comment')
      .addEventListener('submit', createCommentHandler);