const express = require("express");

const { commentController } = require("../controllers");
const { validateToken } = require("../middleware/auth");

const commentRouter = express.Router();

commentRouter.post("/", validateToken, commentController.createComment);

module.exports = { commentRouter };
