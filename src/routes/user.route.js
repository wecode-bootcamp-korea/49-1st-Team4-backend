const express = require("express");

const { userController } = require("../controllers");
const { validateToken } = require("../middleware/auth");

const userRouter = express.Router();
userRouter.post("/signUp", userController.signUp);
userRouter.post("/signIn", userController.signIn);
userRouter.get("/profile", validateToken, userController.getProfile);

module.exports = { userRouter };
