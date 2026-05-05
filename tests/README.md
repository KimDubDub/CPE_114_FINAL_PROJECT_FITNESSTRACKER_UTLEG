# Tests

This folder is reserved for automated tests.

## Suggested test files (future)

- `users.test.js` — Unit/integration tests for the Users endpoints
- `workouts.test.js` — Unit/integration tests for the Workouts endpoints
- `exercises.test.js` — Unit/integration tests for the Exercises endpoints

## Recommended tools

- [Jest](https://jestjs.io/) — Test runner
- [Supertest](https://github.com/ladjs/supertest) — HTTP assertion library for Express

## Example setup

```bash
npm install --save-dev jest supertest
```

Add to `package.json`:
```json
"scripts": {
  "test": "jest"
}
```
