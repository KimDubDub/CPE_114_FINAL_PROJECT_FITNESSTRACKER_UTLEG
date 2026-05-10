# Fitness Tracker API

A RESTful API for tracking users, workouts, and exercises built with Node.js, Express, Sequelize, and MySQL.

## Features

- **User Management**: Create, read, update, and delete user profiles
- **Workout Tracking**: Log workouts with dates, durations, and notes
- **Exercise Library**: Maintain a catalog of exercises with categories and muscle groups
- **Workout-Exercise Relationships**: Associate exercises with workouts including sets, reps, and weights
- **RESTful Design**: Clean API endpoints following REST conventions
- **Database Integration**: MySQL database with Sequelize ORM
- **Error Handling**: Comprehensive error handling and logging middleware

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL with Sequelize ORM
- **Environment**: dotenv for configuration
- **Development**: nodemon for hot reloading

## Project Structure

```
fitness-tracker-api/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── userController.js    # User CRUD operations
│   ├── workoutController.js # Workout CRUD operations
│   └── exerciseController.js # Exercise CRUD operations
├── middleware/
│   ├── errorHandler.js      # Global error handling
│   ├── logger.js           # Request logging
│   └── notFound.js         # 404 handler
├── models/
│   ├── User.js             # User model
│   ├── Workout.js          # Workout model
│   ├── Exercise.js         # Exercise model
│   ├── WorkoutExercise.js  # Many-to-many relationship model
│   └── index.js            # Model associations
├── routes/
│   ├── userRoutes.js       # User endpoints
│   ├── workoutRoutes.js    # Workout endpoints
│   └── exerciseRoutes.js   # Exercise endpoints
├── tests/
│   └── README.md           # Testing documentation
├── docs/
│   └── Fitness Tracker API.postman_collection.json # Postman collection
├── index.js                # Application entry point
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd fitness-tracker-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up MySQL database**:
   - Create a MySQL database
   - Update the `.env` file with your database credentials

4. **Environment Configuration**:
   Create a `.env` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=fitness_tracker
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   PORT=3000
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```
Starts the server with nodemon for automatic restarts on file changes.

### Production Mode
```bash
npm start
```
Starts the server normally.

The API will be available at `http://localhost:3000`

## API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID (includes workouts)
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Workouts
- `GET /workouts` - Get all workouts (includes user info)
- `GET /workouts/:id` - Get workout by ID (includes user and exercises)
- `POST /workouts` - Create new workout
- `PUT /workouts/:id` - Update workout
- `DELETE /workouts/:id` - Delete workout

### Exercises
- `GET /exercises` - Get all exercises
- `GET /exercises/:id` - Get exercise by ID (includes associated workouts)
- `POST /exercises` - Create new exercise
- `PUT /exercises/:id` - Update exercise
- `DELETE /exercises/:id` - Delete exercise

### Workout-Exercise Relationships
- `POST /workouts/:workoutId/exercises` - Add exercise to workout
- `DELETE /workouts/:workoutId/exercises/:exerciseId` - Remove exercise from workout

### Health Check
- `GET /` - API health check

## Data Models

### User
```json
{
  "id": 1,
  "name": "Juan dela Cruz",
  "email": "juan@example.com",
  "age": 25,
  "weight_kg": 70.5,
  "createdAt": "2025-05-02T00:00:00.000Z",
  "updatedAt": "2025-05-02T00:00:00.000Z"
}
```

### Workout
```json
{
  "id": 1,
  "title": "Morning Run",
  "date": "2025-05-02",
  "duration_minutes": 45,
  "notes": "Easy pace",
  "userId": 1,
  "createdAt": "2025-05-02T00:00:00.000Z",
  "updatedAt": "2025-05-02T00:00:00.000Z"
}
```

### Exercise
```json
{
  "id": 1,
  "name": "Bench Press",
  "category": "strength",
  "description": "Classic chest press on a flat bench",
  "muscle_group": "Chest, Triceps",
  "createdAt": "2025-05-02T00:00:00.000Z",
  "updatedAt": "2025-05-02T00:00:00.000Z"
}
```

### WorkoutExercise (Relationship)
```json
{
  "workoutId": 1,
  "exerciseId": 1,
  "sets": 3,
  "reps": 10,
  "weight_kg": 60.0,
  "createdAt": "2025-05-02T00:00:00.000Z",
  "updatedAt": "2025-05-02T00:00:00.000Z"
}
```

## Testing with Postman

A comprehensive Postman collection is included in the `docs/` folder for testing all API endpoints.

### Importing the Collection

1. Open Postman
2. Click "Import" in the top left
3. Select "File"
4. Choose `docs/Fitness Tracker API.postman_collection.json`
5. The collection will be imported with all endpoints organized by resource

### Collection Structure

The collection is organized into the following folders:

- **Users**: All user-related endpoints
- **Workouts**: All workout-related endpoints
- **Exercises**: All exercise-related endpoints
- **Relationship Endpoints**: Workout-exercise association endpoints

### Testing Workflow

1. **Start the API server**:
   ```bash
   npm run dev
   ```

2. **Test User Creation**:
   - Use "Create User" request
   - Note the returned user ID

3. **Test Exercise Creation**:
   - Use "Create Exercise" request
   - Note the returned exercise ID

4. **Test Workout Creation**:
   - Use "Create Workout" request with a valid userId
   - Note the returned workout ID

5. **Test Relationships**:
   - Use "Add Exercise to Workout" with workout and exercise IDs
   - Verify the workout now includes the exercise

6. **Test CRUD Operations**:
   - Test GET, PUT, DELETE for each resource
   - Verify proper error handling (404s, validation errors)

### Sample Test Data

**Create User**:
```json
{
  "name": "Juan dela Cruz",
  "email": "juan@example.com",
  "age": 25,
  "weight_kg": 70.5
}
```

**Create Exercise**:
```json
{
  "name": "Bench Press",
  "category": "strength",
  "description": "Classic chest press on a flat bench",
  "muscle_group": "Chest, Triceps"
}
```

**Create Workout**:
```json
{
  "title": "Morning Run",
  "date": "2025-05-02",
  "duration_minutes": 45,
  "notes": "Easy pace",
  "userId": 1
}
```

**Add Exercise to Workout**:
```json
{
  "exerciseId": 1,
  "sets": 3,
  "reps": 10,
  "weight_kg": 60.0
}
```

### Expected Response Codes

- `200` - Success (GET, PUT, DELETE)
- `201` - Created (POST)
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Adding Tests

The `tests/` folder is set up for automated testing. To add tests:

1. Install testing dependencies:
   ```bash
   npm install --save-dev jest supertest
   ```

2. Add test script to `package.json`:
   ```json
   "scripts": {
     "test": "jest"
   }
   ```

3. Create test files following the structure in `tests/README.md`

### Database Migrations

The application uses Sequelize's `sync({ alter: true })` for automatic schema updates during development. For production, consider using proper migrations.

### Error Handling

The API includes comprehensive error handling:
- Validation errors return `400` with detailed messages
- Not found errors return `404`
- Server errors return `500` with generic messages
- All errors are logged to the console

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Postman
5. Submit a pull request

## License

This project is licensed under the MIT License.</content>
<parameter name="filePath">c:\Users\User\Documents\CPE114_Final Project_Utleg\README.md
