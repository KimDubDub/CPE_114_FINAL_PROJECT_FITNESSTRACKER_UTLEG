const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Workout = sequelize.define('Workout', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  duration_minutes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // FK: userId (added via association)
}, {
  tableName: 'workouts',
  timestamps: true,
});

module.exports = Workout;
