const express = require("express");
const routes = express.Router();

const { userRouter } = require("./user.route");
const { threadRouter } = require("./thread.route");
const { likeRouter } = require("./like.route");

const { commentRouter } = require("./comment.route");

routes.use("/user", userRouter);
routes.use("/thread", threadRouter);
routes.use("/like", likeRouter);
routes.use("/comment", commentRouter);

module.exports = { routes };
