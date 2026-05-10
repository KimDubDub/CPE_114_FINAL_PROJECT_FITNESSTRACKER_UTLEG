# Fitness Tracker API

## Description

A RESTful API for tracking users, workouts, and exercises. Built with Node.js, Express.js, Sequelize ORM, and MySQL. This API allows users to manage their fitness activities by creating user profiles, logging workouts, and associating exercises with those workouts.

## Features

- **User Management**: Register and manage user profiles.
- **Workout Tracking**: Create and manage workout sessions with dates.
- **Exercise Logging**: Add exercises to workouts with sets, reps, and weights.
- **Data Relationships**: Supports complex queries like viewing exercises in a workout or workouts containing a specific exercise.
- **MVC Architecture**: Organized with models, controllers, and routes for easy maintenance and extension.

## Tech Stack

- **Node.js** (>= 18.x)
- **Express.js** (^4.18.2)
- **Sequelize** (^6.35.2)
- **MySQL2** (^3.6.5)
- **dotenv** (^16.3.1)
- **nodemon** (^3.0.2) - for development

## Installation

### Prerequisites

- Node.js (>= 18.x)
- MySQL Server

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fitness-tracker-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` with your MySQL credentials:
     ```
     DB_HOST=localhost
     DB_PORT=3306
     DB_NAME=fitness_tracker_db
     DB_USER=your_mysql_username
     DB_PASSWORD=your_mysql_password
     PORT=3000
     ```

4. **Create the MySQL database**
   - Log into MySQL and run:
     ```sql
     CREATE DATABASE fitness_tracker_db;
     ```

## Usage

### Starting the Server

- **Development mode** (with auto-restart):
  ```bash
  npm run dev
  ```

- **Production mode**:
  ```bash
  npm start
  ```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

### API Endpoints

- **Users**: `/users`
- **Workouts**: `/workouts`
- **Exercises**: `/exercises`

For detailed API documentation, import the Postman collection located in `docs/Fitness Tracker API.postman_collection.json`.

### Health Check

Visit `http://localhost:3000` for a basic health check response.

## Project Structure

```
fitness-tracker-api/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── userController.js    # User-related logic
│   ├── workoutController.js # Workout-related logic
│   └── exerciseController.js# Exercise-related logic
├── middleware/
│   ├── errorHandler.js      # Global error handling
│   ├── logger.js            # Request logging
│   └── notFound.js          # 404 handler
├── models/
│   ├── User.js              # User model
│   ├── Workout.js           # Workout model
│   ├── Exercise.js          # Exercise model
│   ├── WorkoutExercise.js   # Junction model for workouts and exercises
│   └── index.js             # Model associations
├── routes/
│   ├── userRoutes.js        # User routes
│   ├── workoutRoutes.js     # Workout routes
│   └── exerciseRoutes.js    # Exercise routes
├── tests/                   # Test files (future)
├── docs/                    # API documentation
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
└── index.js                 # Application entry point
```

## Testing

Tests are located in the `tests/` folder. To run tests (once implemented):

```bash
npm test
```

Recommended testing tools: Jest and Supertest.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License.
