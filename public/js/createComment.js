const createCommentHandler = async (event) => {
  event.preventDefault();
    
  const message = document.querySelector('#post-comment').value.trim();
  const blogpost_id = event.target.getAttribute('data-id');
  console.log(message)
  console.log("THIS IS THE PARAM ID" + blogpost_id)
  
  if (message && blogpost_id) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ message, blogpost_id }),
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