const express = require("express");

const { authRouter: userRouter } = require("./user.router");

const routes = express.Router();

routes.use("/user", userRouter);

module.exports = { routes };