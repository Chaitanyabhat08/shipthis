module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.stack}`;
    err.message = message;
    err.statusCode = 400;
  }
  if (err.code === 11000) {
    const message = `User ${Object.keys(err.keyValue)} already exists. Please Login`;
    err.message = message;
    err.statusCode = 400;
  }
  if (err.name === 'JsonWebTokenError') {
    const message = 'JsonWebToken is Invalid. Please Try Again.';
    err.message = message;
    err.statusCode = 400;
  }
  if (err.name === 'JsonWebTokenExpiredError') {
    const message = 'JsonWebToken is Expired. Please Try Again.';
    err.message = message;
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};