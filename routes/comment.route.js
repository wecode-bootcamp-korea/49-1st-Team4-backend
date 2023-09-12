const express = require("express");
const commentController = require("../controllers/comment.controller");

const commentRouter = express.Router();

commentRouter.post("/create", commentController.createComment);

module.exports = { commentRouter };
