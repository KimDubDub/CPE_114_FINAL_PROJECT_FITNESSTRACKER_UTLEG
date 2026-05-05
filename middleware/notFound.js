/**
 * 404 Catch-All Middleware
 * Returns a JSON response for any undefined route.
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} does not exist.`,
  });
};

module.exports = notFound;
