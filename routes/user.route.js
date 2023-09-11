const express = require("express");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/signUp", userController.signUp);

module.exports = {
  userRouter,
};
