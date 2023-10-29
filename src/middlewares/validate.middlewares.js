const { validationResult } = require("express-validator");

// This middleware is used to validate the request body
module.exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(200)
      .send({ message: "Bad Request", errors: errors.array(), status: false });
  }
  console.log("Request validated successfully!");
  next();
};
