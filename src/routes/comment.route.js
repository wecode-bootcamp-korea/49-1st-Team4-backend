const express = require("express");

const { commentController } = require("../controllers");
const { validateToken } = require("../middleware/auth");

const commentRouter = express.Router();

commentRouter.use(validateToken);
commentRouter.post("/", commentController.createComment);

module.exports = { commentRouter };
