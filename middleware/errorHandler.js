/**
 * Global Error Handler Middleware
 * Must have exactly 4 parameters: (err, req, res, next)
 * Catches all 500-level errors and returns a clean JSON response.
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: statusCode === 500 ? 'Internal Server Error' : err.message,
    message: statusCode === 500
      ? 'An unexpected error occurred on the server.'
      : err.message,
  });
};

module.exports = errorHandler;
