const User = require("../models/user");

const ErrorResponse = require("../handlers/AppError");
const Response_codes = require("../handlers/Response/Response_codes");

// services
const authService = require("../services/auth.service");

exports.signUpUser = async (params, next, callback) => {
  try {
    // if (middleWareStatus) {
    //   return next(
    //     new ErrorResponse(
    //       Response_codes.CONFLICT.name,
    //       "User already exists",
    //       Response_codes.CONFLICT.code
    //     )
    //   );
    // }
    const user = await User.create(params);

    if (!user) {
      return next(
        new ErrorResponse(
          Response_codes.CONFLICT.name,
          "User not created",
          Response_codes.CONFLICT.code
        )
      );
    }
    return callback(null, user);
  } catch (error) {
    callback(error);
  }
};

exports.signInUser = async (user, params, next, callback) => {
  let token;

  try {
    const isMatch = await user.matchPassword(params.password);

    if (!isMatch) {
      callback(null, null); // Password doesn't match
      return;
    }

    await authService.generateAccessToken(user._id, next, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "error in generating access token",
        });
      }
      token = result;
    });

    let data = {
      token,
      user,
    };
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

// search by email id and username
exports.getSearchedUsers = async (params, next, callback) => {
  try {
    const users = await User.find({
      $or: [
        { username: { $regex: params, $options: "i" } }, // Case-insensitive search
        { email: { $regex: params, $options: "i" } },
      ],
    });

    console.log(users, "search");

    if (!users || users.length === 0) {
      return next(
        new ErrorResponse(
          Response_codes.CONFLICT.name,
          "No user found",
          Response_codes.CONFLICT.code
        )
      );
    }
    callback(null, users);
  } catch (error) {
    callback(error);
  }
};

exports.setAccountType = async (userId, params, next, callback) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      params ,
      { new: true }
    );
    if (!user) {
      return next(
        new ErrorResponse(
          Response_codes.CONFLICT.name,
          "User not updated",
          Response_codes.CONFLICT.code
        )
      );
    }
    callback(null, user);
  } catch (error) {
    callback(error);
  }
};
