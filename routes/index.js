const express = require("express");

const { userRouter } = require("./user.route");
const { threadRouter } = require("./thread.route");
const { likeRouter } = require("./like.route");

const routes = express.Router();

routes.use("/user", userRouter);
routes.use("/thread", threadRouter);
routes.use("/like", likeRouter);

module.exports = { routes };
