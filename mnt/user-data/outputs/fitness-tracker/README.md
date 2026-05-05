# Fitness Tracker API

## About

The Fitness Tracker API is a RESTful backend service that enables users to log and manage their fitness activity. The core problem it solves is giving individuals a structured, data-driven way to track their workouts and the exercises performed within them. Users can register their profile, create workout sessions tied to specific dates, and assign exercises (with sets, reps, and weights) to each session. The system supports complex queries such as viewing all exercises in a workout, or finding every workout a given exercise has appeared in. Built with Node.js, Express.js, Sequelize ORM, and MySQL, it follows the MVC pattern and exposes a clean JSON API suitable for a frontend application or mobile app. All credentials are secured via environment variables, validation errors return clear JSON messages, and the architecture is designed for extensibility — adding new domains (e.g. nutrition, goals) requires only adding a new model/controller/route triplet without touching the core application logic.

## Tech Stack

| Technology   | Version  |
|--------------|----------|
| Node.js      | >= 18.x  |
| Express.js   | ^4.18.2  |
| Sequelize    | ^6.35.2  |
| MySQL2       | ^3.6.5   |
| dotenv       | ^16.3.1  |

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/fitness-tracker-api.git
cd fitness-tracker-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy the example env file and fill in your MySQL credentials:
```bash
cp .env.example .env
```

Edit `.env`:
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=fitness_tracker_db
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
PORT=3000
```

### 4. Create the MySQL database
Log into MySQL and run:
```sql
CREATE DATABASE fitness_tracker_db;
```

### 5. Start the server
```bash
npm start
# or for development with auto-reload:
npm run dev
```

Sequelize will auto-create all tables on startup via `sequelize.sync()`.

The server will be available at `http://localhost:3000`.

---

## Database Schema

### Table: `users`
| Column      | Type         | Constraints          |
|-------------|--------------|----------------------|
| id          | INT          | PK, AUTO_INCREMENT   |
| name        | VARCHAR(100) | NOT NULL             |
| email       | VARCHAR(150) | NOT NULL, UNIQUE     |
| age         | INT          | nullable             |
| weight_kg   | FLOAT        | nullable             |
| createdAt   | DATETIME     | auto                 |
| updatedAt   | DATETIME     | auto                 |

### Table: `workouts`
| Column            | Type         | Constraints          |
|-------------------|--------------|----------------------|
| id                | INT          | PK, AUTO_INCREMENT   |
| title             | VARCHAR(150) | NOT NULL             |
| date              | DATEONLY     | NOT NULL             |
| duration_minutes  | INT          | nullable             |
| notes             | TEXT         | nullable             |
| userId            | INT          | FK → users.id        |
| createdAt         | DATETIME     | auto                 |
| updatedAt         | DATETIME     | auto                 |

### Table: `exercises`
| Column        | Type                                            | Constraints        |
|---------------|-------------------------------------------------|--------------------|
| id            | INT                                             | PK, AUTO_INCREMENT |
| name          | VARCHAR(100)                                    | NOT NULL           |
| category      | ENUM('cardio','strength','flexibility','balance')| NOT NULL          |
| description   | TEXT                                            | nullable           |
| muscle_group  | VARCHAR(100)                                    | nullable           |
| createdAt     | DATETIME                                        | auto               |
| updatedAt     | DATETIME                                        | auto               |

### Table: `workout_exercises` (Junction)
| Column           | Type  | Constraints             |
|------------------|-------|-------------------------|
| id               | INT   | PK, AUTO_INCREMENT      |
| workoutId        | INT   | FK → workouts.id        |
| exerciseId       | INT   | FK → exercises.id       |
| sets             | INT   | nullable                |
| reps             | INT   | nullable                |
| weight_kg        | FLOAT | nullable                |
| duration_seconds | INT   | nullable                |

---

## Relationship Diagram (ER Diagram)

```
┌────────────┐         ┌──────────────┐         ┌─────────────┐
│   users    │  1    M │   workouts   │  M    M  │  exercises  │
│────────────│─────────│──────────────│──────────│─────────────│
│ id (PK)    │         │ id (PK)      │          │ id (PK)     │
│ name       │         │ title        │  through │ name        │
│ email      │         │ date         │──────────│ category    │
│ age        │         │ duration_min │          │ description │
│ weight_kg  │         │ notes        │          │ muscle_group│
└────────────┘         │ userId (FK)  │          └─────────────┘
                       └──────────────┘
                                │
                     ┌──────────────────────┐
                     │  workout_exercises   │
                     │──────────────────────│
                     │ id (PK)              │
                     │ workoutId (FK)       │
                     │ exerciseId (FK)      │
                     │ sets                 │
                     │ reps                 │
                     │ weight_kg            │
                     │ duration_seconds     │
                     └──────────────────────┘
```

**Relationships:**
- `User` → `Workout`: One-to-Many (a user logs many workouts)
- `Workout` ↔ `Exercise`: Many-to-Many via `WorkoutExercise` junction table

---

## API Reference

### Users

| Method | Path          | Request Body                                    | Success Response         | Description                     |
|--------|---------------|-------------------------------------------------|--------------------------|----------------------------------|
| GET    | /users        | —                                               | 200 — Array of users     | Return all users                |
| GET    | /users/:id    | —                                               | 200 — User with workouts | Return user by ID               |
| POST   | /users        | `{ name*, email*, age, weight_kg }`             | 201 — Created user       | Create a new user               |
| PUT    | /users/:id    | `{ name, email, age, weight_kg }`               | 200 — Updated user       | Update a user                   |
| DELETE | /users/:id    | —                                               | 200 — Success message    | Delete a user                   |

### Workouts

| Method | Path                              | Request Body                                              | Success Response            | Description                          |
|--------|-----------------------------------|-----------------------------------------------------------|-----------------------------|--------------------------------------|
| GET    | /workouts                         | —                                                         | 200 — Array of workouts     | Return all workouts                  |
| GET    | /workouts/:id                     | —                                                         | 200 — Workout with exercises| Return workout by ID                 |
| POST   | /workouts                         | `{ title*, date*, userId*, duration_minutes, notes }`    | 201 — Created workout       | Create a new workout                 |
| PUT    | /workouts/:id                     | `{ title, date, duration_minutes, notes }`               | 200 — Updated workout       | Update a workout                     |
| DELETE | /workouts/:id                     | —                                                         | 200 — Success message       | Delete a workout                     |
| POST   | /workouts/:id/exercises           | `{ exerciseId*, sets, reps, weight_kg, duration_seconds }`| 201 — Updated workout      | Add exercise to workout              |
| DELETE | /workouts/:id/exercises/:exerciseId| —                                                        | 200 — Success message       | Remove exercise from workout         |

### Exercises

| Method | Path            | Request Body                                          | Success Response          | Description               |
|--------|-----------------|-------------------------------------------------------|---------------------------|---------------------------|
| GET    | /exercises      | —                                                     | 200 — Array of exercises  | Return all exercises      |
| GET    | /exercises/:id  | —                                                     | 200 — Exercise + workouts | Return exercise by ID     |
| POST   | /exercises      | `{ name*, category*, description, muscle_group }`    | 201 — Created exercise    | Create a new exercise     |
| PUT    | /exercises/:id  | `{ name, category, description, muscle_group }`      | 200 — Updated exercise    | Update an exercise        |
| DELETE | /exercises/:id  | —                                                     | 200 — Success message     | Delete an exercise        |

`*` = required field

---

## Error Responses

| Status | Error              | When it occurs                                      |
|--------|--------------------|-----------------------------------------------------|
| 400    | Bad Request        | Missing required fields or invalid field values    |
| 404    | Not Found          | Resource with given ID does not exist              |
| 404    | Route Not Found    | Accessing an undefined route                       |
| 500    | Internal Server Error | Unexpected server-side error                    |

### Example Error Structures

**400 Bad Request**
```json
{
  "error": "Bad Request",
  "message": "Fields \"name\" and \"email\" are required."
}
```

**404 Not Found**
```json
{
  "error": "Not Found",
  "message": "User not found."
}
```

**404 Route Not Found**
```json
{
  "error": "Not Found",
  "message": "Route GET /undefined does not exist."
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred on the server."
}
```
