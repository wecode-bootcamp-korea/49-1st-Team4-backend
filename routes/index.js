const express = require("express");

const { userRouter } = require("./user.route");

const { commentRouter } = require("./comment.route");

const routes = express.Router();

routes.use("/user", userRouter);

routes.use("/comment", commentRouter);

module.exports = { routes };
