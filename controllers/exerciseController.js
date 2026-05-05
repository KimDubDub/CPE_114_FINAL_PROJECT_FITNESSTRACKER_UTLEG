const { Exercise, Workout } = require('../models');

// GET /exercises — Return all exercises
const getAllExercises = async (req, res, next) => {
  try {
    const exercises = await Exercise.findAll();
    res.json(exercises);
  } catch (err) {
    next(err);
  }
};

// GET /exercises/:id — Return one exercise with all workouts it appears in
const getExerciseById = async (req, res, next) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id, {
      include: [{ model: Workout, attributes: ['id', 'title', 'date'] }],
    });
    if (!exercise) {
      return res.status(404).json({ error: 'Not Found', message: 'Exercise not found.' });
    }
    res.json(exercise);
  } catch (err) {
    next(err);
  }
};

// POST /exercises — Create a new exercise; return 201 on success, 400 on invalid input
const createExercise = async (req, res, next) => {
  try {
    const { name, category, description, muscle_group } = req.body;
    if (!name || !category) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Fields "name" and "category" are required.',
      });
    }
    const validCategories = ['cardio', 'strength', 'flexibility', 'balance'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: `"category" must be one of: ${validCategories.join(', ')}.`,
      });
    }
    const exercise = await Exercise.create({ name, category, description, muscle_group });
    res.status(201).json(exercise);
  } catch (err) {
    next(err);
  }
};

// PUT /exercises/:id — Update an exercise; return 404 if not found
const updateExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: 'Not Found', message: 'Exercise not found.' });
    }
    const { name, category, description, muscle_group } = req.body;
    await exercise.update({ name, category, description, muscle_group });
    res.json(exercise);
  } catch (err) {
    next(err);
  }
};

// DELETE /exercises/:id — Delete an exercise; return 404 if not found
const deleteExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: 'Not Found', message: 'Exercise not found.' });
    }
    await exercise.destroy();
    res.json({ message: 'Exercise deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllExercises, getExerciseById, createExercise, updateExercise, deleteExercise };
