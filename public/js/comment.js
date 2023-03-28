const addCommentHandler = async (event) => {
  event.preventDefault();

    const id = event.target.getAttribute('data-id');
    console.log(id)
    // const response = await fetch(`/api/projects/${id}`, {
    //   method: 'GET',
    // });

    // if (response.ok) {
    //   document.location.replace('/profile');
    // } else {
    //   alert('Failed to delete project');
    // }
  };

document
  .querySelector('.post-comments')
  .addEventListener('click', addCommentHandler);