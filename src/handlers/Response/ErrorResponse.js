const ErrorResponse = require("../AppError");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  console.log("hey in error handler");

  // Mongoose bad ObjectId
  if (err.message === "CastError") {
    console.log("in mongodb caster error");
    const message = `Resource not found`;
    error = new ErrorResponse(null, message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(null, message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = "validation error in your code";
    error = new ErrorResponse(null, message, 400);
  }

  if (err.name === "SyntaxError") {
    const message = "SyntaxError in request data",
      error = new ErrorResponse(null, message, 400);
  }
  if (err.name === "TypeError") {
    const message = "Type error in code";
    error = new ErrorResponse(null, message, 400);
  }

  return res.status(200).json({
    status: false,
    error: error.message || "internal server error",
    name: error.name || "server Error",
  });
};

module.exports = errorHandler;
