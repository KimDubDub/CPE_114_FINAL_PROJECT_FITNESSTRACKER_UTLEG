const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Exercise = sequelize.define('Exercise', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('cardio', 'strength', 'flexibility', 'balance'),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  muscle_group: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'exercises',
  timestamps: true,
});

module.exports = Exercise;
