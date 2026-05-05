const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Junction table for the many-to-many relationship between Workouts and Exercises
const WorkoutExercise = sequelize.define('WorkoutExercise', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  sets: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  reps: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  weight_kg: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  duration_seconds: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'workout_exercises',
  timestamps: true,
});

module.exports = WorkoutExercise;
