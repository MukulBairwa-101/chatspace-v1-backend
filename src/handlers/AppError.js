class ErrorResponse extends Error {
  constructor(name, message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    console.log("error in class");
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;
