const express = require("express");

const { commentController } = require("../controllers");

const commentRouter = express.Router();

commentRouter.post("/", commentController.createComment);

module.exports = { commentRouter };
