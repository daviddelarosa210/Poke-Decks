const express = require('express');
const router = express.Router();
const { Post } = require('../models'); 
const withAuth = require('../utils/auth');

// Route to display the dashboard for logged-in users
router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id,
    },
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render('loggedIn-dashboard', { layout: 'dashboard', posts, loggedIn: true });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('login');
    });
});

// Route to display the form for creating a new post
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

// Route to display the form for editing a post by ID
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id)
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render('edit-post', {
          layout: 'dashboard',
          post,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;
