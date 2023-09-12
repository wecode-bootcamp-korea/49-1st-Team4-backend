const express = require("express");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

// userRouter.post("/signUp", userController.signUp);
userRouter.post("/signIn", userController.signIn);

module.exports = { userRouter };
