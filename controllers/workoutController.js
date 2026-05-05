const { Workout, User, Exercise } = require('../models');

// GET /workouts — Return all workouts with their owner (User)
const getAllWorkouts = async (req, res, next) => {
  try {
    const workouts = await Workout.findAll({ include: [{ model: User, attributes: ['id', 'name'] }] });
    res.json(workouts);
  } catch (err) {
    next(err);
  }
};

// GET /workouts/:id — Return one workout with user + exercises included
const getWorkoutById = async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'name'] },
        { model: Exercise },
      ],
    });
    if (!workout) {
      return res.status(404).json({ error: 'Not Found', message: 'Workout not found.' });
    }
    res.json(workout);
  } catch (err) {
    next(err);
  }
};

// POST /workouts — Create a new workout; return 201 on success, 400 on invalid input
const createWorkout = async (req, res, next) => {
  try {
    const { title, date, duration_minutes, notes, userId } = req.body;
    if (!title || !date || !userId) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Fields "title", "date", and "userId" are required.',
      });
    }
    // Verify user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ error: 'Bad Request', message: 'Referenced userId does not exist.' });
    }
    const workout = await Workout.create({ title, date, duration_minutes, notes, userId });
    res.status(201).json(workout);
  } catch (err) {
    next(err);
  }
};

// PUT /workouts/:id — Update a workout; return 404 if not found
const updateWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Not Found', message: 'Workout not found.' });
    }
    const { title, date, duration_minutes, notes } = req.body;
    await workout.update({ title, date, duration_minutes, notes });
    res.json(workout);
  } catch (err) {
    next(err);
  }
};

// DELETE /workouts/:id — Delete a workout; return 404 if not found
const deleteWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Not Found', message: 'Workout not found.' });
    }
    await workout.destroy();
    res.json({ message: 'Workout deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

// POST /workouts/:id/exercises — Add an exercise to a workout (many-to-many)
const addExerciseToWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Not Found', message: 'Workout not found.' });
    }
    const { exerciseId, sets, reps, weight_kg, duration_seconds } = req.body;
    if (!exerciseId) {
      return res.status(400).json({ error: 'Bad Request', message: 'Field "exerciseId" is required.' });
    }
    const exercise = await Exercise.findByPk(exerciseId);
    if (!exercise) {
      return res.status(404).json({ error: 'Not Found', message: 'Exercise not found.' });
    }
    await workout.addExercise(exercise, { through: { sets, reps, weight_kg, duration_seconds } });
    const updatedWorkout = await Workout.findByPk(req.params.id, { include: [Exercise] });
    res.status(201).json(updatedWorkout);
  } catch (err) {
    next(err);
  }
};

// DELETE /workouts/:id/exercises/:exerciseId — Remove an exercise from a workout
const removeExerciseFromWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Not Found', message: 'Workout not found.' });
    }
    const exercise = await Exercise.findByPk(req.params.exerciseId);
    if (!exercise) {
      return res.status(404).json({ error: 'Not Found', message: 'Exercise not found.' });
    }
    await workout.removeExercise(exercise);
    res.json({ message: 'Exercise removed from workout successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  addExerciseToWorkout,
  removeExerciseFromWorkout,
};
