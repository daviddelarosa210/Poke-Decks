const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../models'); 
const withAuth = require('../../utils/auth');

// Route to create a new post
router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Post.create({
      ...req.body,
      user_id: req.session.user_id,
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  }
});

// Route to update a post by ID
router.put('/:id', withAuth, (req, res) => {
  Post.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (dbPostData[0] === 0) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// Route to delete a post by ID
router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (dbPostData === 0) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;
