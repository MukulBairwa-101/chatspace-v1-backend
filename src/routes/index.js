const express = require("express");

// base router
const router = express.Router();

// app routers

const userRouter = require("./user/index");

router.use("/api/v1/users", userRouter);

module.exports = router;
