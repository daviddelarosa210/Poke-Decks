const { DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

const Card = sequelize.define('Card', {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
// what other attributes specific to a card?
});

module.exports = Card;