const User = require("../models/user");
const ErrorResponse = require("../handlers/AppError");
const Response_codes = require("../handlers/Response/Response_codes");

// services

const userService = require("../services/user.service");

// auth

exports.signUpUser = async (req, res, next) => {
  try {
    let params = { ...req.body };

    await userService.signUpUser(
      // req.middleWareStatus,
      params,
      next,
      (err, result) => {
        if (err) {
          return next(new ErrorResponse(err.name, err.message, err.statusCode));
        }
        return res.status(Response_codes.SUCCESS.code).json({
          status: Response_codes.SUCCESS.status,
          message: "User created successfully",
          data: result,
        });
      }
    );
  } catch (error) {
    return next(new ErrorResponse(error.name));
  }
};

exports.signInUser = async (req, res, next) => {
  try {
    let params = { ...req.body };
    let user = req.user;

    await userService.signInUser(user, params, next, (err, result) => {
      if (err) {
        return next(new ErrorResponse(err.name, err.message, err.statusCode));
      }

      if (!result) {
        return res.status(200).json({
          message: "Credentials not match",
          statuscode: Response_codes.UNAUTHORIZED.name,
          status: false,
        });
      }

      return res.status(Response_codes.SUCCESS.code).json({
        status: Response_codes.SUCCESS.status,
        message: "Sign in successfully",
        data: result?.user,
        token: result?.token,
      });
    });
  } catch (error) {
    return next(new ErrorResponse(error.name));
  }
};

// account type

exports.setAccountType = async (req, res, next) => {
  try {
    let params = {...req.body,isOnboarded:true};
    let userId = req.user._id;

    await userService.setAccountType(userId, params, next, (err, result) => {
      if (err) {
        return next(new ErrorResponse(err.name, err.message, err.statusCode));
      }

      return res.status(Response_codes.SUCCESS.code).json({
        status: Response_codes.SUCCESS.status,
        message: "Account type setup successfully",
        data: result,
      });
    });
  } catch (error) {
    return next(new ErrorResponse(error.name));
  }
};

//  users

exports.getSearchedUsers = async (req, res, next) => {
  try {
    let params = req.query.user;
    await userService.getSearchedUsers(params, next, (err, result) => {
      if (err) {
        return next(new ErrorResponse(err.name, err.message, err.statusCode));
      }

      return res.status(Response_codes.SUCCESS.code).json({
        status: Response_codes.SUCCESS.status,
        message: "Users Fetched successfully",
        data: result,
      });
    });
  } catch (error) {
    return next(new ErrorResponse(error.name));
  }
};
