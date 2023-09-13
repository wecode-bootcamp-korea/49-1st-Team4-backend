const express = require("express");

const { userRouter } = require("./user.route");
const { threadRouter } = require("./thread.route");
const { likeRouter } = require("./like.route");

const { commentRouter } = require("./comment.route");

const { validateToken } = require("../middleware/auth"); // 위에서 만든 미들웨어 로직을 임포트 합니다.

const routes = express.Router();

// routes.use(validateToken); // 전체적
// app.use(validateToken);

routes.use("/user", userRouter);
routes.use("/thread", threadRouter);
routes.use("/like", likeRouter);
routes.use("/comment", commentRouter);

module.exports = { routes };
