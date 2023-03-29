const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

// Add a blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a blog post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const BlogPostData = await BlogPost.update(
      {
        title: req.body.title,
        contents: req.body.content
      },
      {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(BlogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a blog post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const BlogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(BlogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;