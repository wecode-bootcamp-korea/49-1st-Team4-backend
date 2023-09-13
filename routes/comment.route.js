const express = require("express");
const commentRouter = express.Router();
const { commentController } = require("../controllers");

commentRouter.post("/create", commentController.createComment);

module.exports = { commentRouter };
