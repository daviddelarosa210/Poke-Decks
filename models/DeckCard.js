const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class DeckCard extends Model {}

DeckCard.init(
  {
    // Add attributes as needed
    // For example:
    // deckType: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // quantity: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  },
  {
    sequelize,
    modelName: 'deck_card',
  }
);

module.exports = DeckCard;