    const createCommentHandler = async (event) => {
      event.preventDefault();
    
      const message = document.querySelector('#post-comment').value.trim();
    
      if (message) {
        const response = await fetch(`/api/comments`, {
          method: 'POST',
          body: JSON.stringify({ message }),
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