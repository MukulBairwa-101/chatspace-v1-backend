const express = require("express");
const userRouter = express.Router();

// controllers
const {
  signUpUser,
  signInUser,
  getSearchedUsers,
  setAccountType,
} = require("../../controllers/user.controllers");

// middleWares

const {
  isEarlierSignedUp,
  isUserExists,
  getUserById,
} = require("../../middlewares/user.middlewares");

// auth
userRouter.post("/signupUser", isEarlierSignedUp, signUpUser);
userRouter.post("/signinUser", isUserExists, signInUser);

// onboarding

userRouter.post("/serAccountType", getUserById, setAccountType);

// platform apis
userRouter.get("/getSearchedUsers", getSearchedUsers);

module.exports = userRouter;
