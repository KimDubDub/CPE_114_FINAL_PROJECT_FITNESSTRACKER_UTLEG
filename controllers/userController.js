const { User, Workout } = require('../models');

// GET /users — Return all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// GET /users/:id — Return one user with their workouts (1-to-many include)
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Workout }],
    });
    if (!user) {
      return res.status(404).json({ error: 'Not Found', message: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// POST /users — Create a new user; return 201 on success, 400 on invalid input
const createUser = async (req, res, next) => {
  try {
    const { name, email, age, weight_kg } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Fields "name" and "email" are required.',
      });
    }
    const user = await User.create({ name, email, age, weight_kg });
    res.status(201).json(user);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'A user with that email already exists.',
      });
    }
    next(err);
  }
};

// PUT /users/:id — Update a user; return 404 if not found
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Not Found', message: 'User not found.' });
    }
    const { name, email, age, weight_kg } = req.body;
    await user.update({ name, email, age, weight_kg });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// DELETE /users/:id — Delete a user; return 404 if not found
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Not Found', message: 'User not found.' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
