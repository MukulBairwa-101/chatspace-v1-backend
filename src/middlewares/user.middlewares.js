const User = require("../models/user");
const ErrorResponse = require("../handlers/AppError");

const Response_codes = require("../handlers/Response/Response_codes");

exports.isEarlierSignedUp = async (req, res, next) => {
  try {
    const isFound = await User.findOne({ email: req.body.email });

    console.log(isFound);

    if (isFound) {
      // req.middlewareStatus = true;
      // return next(
      //   new ErrorResponse(
      //     Response_codes.CONFLICT.name,
      //     "User already exists",
      //     Response_codes.CONFLICT.code
      //   )
      // );
      return res.status(200).json({
        status: false,
        message: "User already exists",
      });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

exports.isUserExists = async (req, res, next) => {
  try {
    const isFound = await User.findOne({ email: req.body.email });

    if (!isFound) {
      return res.status(200).json({
        status: false,
        message: "User not found",
      });
    }
    req.user = isFound;
    next();
  } catch (error) {
    console.log(error.message);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    let userId = req.body.userId;
    const isFound = await User.findById(userId);

    if (!isFound) {
      return res.status(200).json({
        status: false,
        message: "User not found",
      });
    }
    req.user = isFound;
    next();
  } catch (error) {
    console.log(error.message);
  }
};
