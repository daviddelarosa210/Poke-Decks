const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class UserDeck extends Model {}

UserDeck.init(
  {
    createdByUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    // Add other attributes as needed
  },
  {
    sequelize,
    modelName: 'user_deck',
  }
);

module.exports = UserDeck