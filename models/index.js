const sequelize = require('../config/connections');
const User = require('./User');
const Deck = require('./Deck');
const Card = require('./Card');
const DeckCard = require('./DeckCard');
const UserDeck = require('./UserDeck');
const Message = require('./Message');
const Comment = require('./Comments');
const Post = require('./Post');

// Associations to allow users to own decks, and cards within those decks 
Deck.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.belongsToMany(Deck, { through: 'UserDeck' });
Deck.belongsToMany(User, { through: 'UserDeck' });

Card.belongsToMany(Deck, { through: 'DeckCard' });
Deck.belongsToMany(Card, { through: 'DeckCard' });

// Associations for comments and posts
Comment.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Post.hasMany(Comment, { foreignKey: 'postId' });

// Associations to allow messages between users
Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId', onDelete: 'CASCADE' });
Message.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId', onDelete: 'CASCADE' });

module.exports = {
  User,
  Deck,
  Card,
  DeckCard,
  UserDeck,
  Message,
  Comment,
  Post,
};
