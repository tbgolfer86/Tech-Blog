const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ],
    });

    const blogposts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));
    
    res.render('homepage', { 
      blogposts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost }],
      where: {
        user_id: req.session.user_id
      }
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newpost', async (req, res) => {
  try {
    res.render('createPost');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/blogpost/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id);

    const blogpost = blogPostData.get({ plain: true });
    
    res.render('editPost', { 
      ...blogpost, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogpost/:id', async (req, res) => {
  try {
    console.log("This is the blogpost ID: " + req.params.id)
    const commentData = await Comment.findAll({
      where: {
        blogpost_id: req.params.id
      }
    });
    
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    console.log(comments)

    res.render('createComment', { 
      comments,
      id: req.params.id, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;