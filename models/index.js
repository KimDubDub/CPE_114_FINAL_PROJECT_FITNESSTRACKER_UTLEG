const User = require('./User');
const Workout = require('./Workout');
const Exercise = require('./Exercise');
const WorkoutExercise = require('./WorkoutExercise');

// --- Associations ---

// 1-to-Many: User hasMany Workouts; Workout belongsTo User
User.hasMany(Workout, { foreignKey: 'userId', onDelete: 'CASCADE' });
Workout.belongsTo(User, { foreignKey: 'userId' });

// Many-to-Many: Workout <-> Exercise through WorkoutExercise
Workout.belongsToMany(Exercise, {
  through: WorkoutExercise,
  foreignKey: 'workoutId',
  otherKey: 'exerciseId',
});
Exercise.belongsToMany(Workout, {
  through: WorkoutExercise,
  foreignKey: 'exerciseId',
  otherKey: 'workoutId',
});

module.exports = { User, Workout, Exercise, WorkoutExercise };
