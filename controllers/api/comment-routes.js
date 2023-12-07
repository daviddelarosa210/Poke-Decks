const express = require('express');
const router = express.Router();
const { Comment } = require('../../models'); 
const withAuth = require('../../utils/auth');
const { check, validationResult } = require('express-validator');

// Route to create a new comment
router.post(
  '/',
  withAuth,
  [
    check('text').not().isEmpty().withMessage('Text is required'),
    // Add additional validation for other fields if needed
  ],
  (req, res) => {
    // Validate request parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a new comment
    Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      });
  }
);

// ... add other routes if needed ...

module.exports = router;
