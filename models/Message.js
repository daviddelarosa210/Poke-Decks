const { DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Message;