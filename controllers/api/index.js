const router = require('express').Router();

const userRoutes = require('./userroutes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const deckRoutes = require('./deck-routes'); // Add this line
const pokemonRoutes = require('./pokemonroutes'); // Add this line
const dashboardRoutes = require('./dashboard-routes'); // Add this line

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/deck', deckRoutes); // Add this line
router.use('/pokemon', pokemonRoutes); // Add this line
router.use('/dashboard', dashboardRoutes); // Add this line

module.exports = router;
