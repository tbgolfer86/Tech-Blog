const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  console.log(req.body)
  console.log(req.body)
  console.log(req.body)
  console.log(req.body)
  console.log(req.body)
  try {
    const newComment = await Comments.create({
      ...req.body,
      user_id: req.session.user_id,  
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;