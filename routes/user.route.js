const express = require("express");
const userRouter = express.Router();
const { userController } = require("../controllers");

userRouter.post("/signUp", userController.signUp);
userRouter.post("/signIn", userController.signIn);

module.exports = { userRouter };
