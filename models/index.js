// model/index.js
const sequelize = require('../config/connection');
const User = require('./User')(sequelize);
const Deck = require('./Deck')(sequelize);
const Card = require('./Card')(sequelize);
const DeckCard = require('./DeckCard')(sequelize);
const UserDeck = require('./UserDeck')(sequelize);
const Message = require('./Message')(sequelize);

// Associations to allow users to own decks, and cards within those decks 
Deck.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.belongsToMany(Deck, { through: 'UserDeck' });
Deck.belongsToMany(User, { through: 'UserDeck' });

Card.belongsToMany(Deck, { through: 'DeckCard' });
Deck.belongsToMany(Card, { through: 'DeckCard' });

//Associations to allow messages between users
Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId', onDelete: 'CASCADE' });
Message.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId', onDelete: 'CASCADE' });


module.exports = {
  User,
  Deck,
  Card,
  DeckCard,
  UserDeck,
};