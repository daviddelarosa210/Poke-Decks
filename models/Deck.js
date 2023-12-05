const { DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

const Deck = sequelize.define('Deck', {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
//  what other attributes specific to a deck?
});

module.exports = Deck;