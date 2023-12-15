const router = require('express').Router();

const commentRoutes = require('./comment-routes');
const deckRoutes = require('./deck-routes'); // Add this line
const postRoutes = require('./Post-routes');
const userRoutes = require('./userroutes')
const pokemonRoutes = require('./pokemonroutes'); // Add this line



router.use('/comment', commentRoutes);
router.use('/deck', deckRoutes); // Add this line
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/pokemon', pokemonRoutes); // Add this line


module.exports = router;