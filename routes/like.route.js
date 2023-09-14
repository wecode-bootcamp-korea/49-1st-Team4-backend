const express = require("express");

const likeController = require("../controllers/like.controller");

const likeRouter = express.Router();

likeRouter.post("/", likeController.createThreadLike);
likeRouter.delete("/:threadId", likeController.deleteThreadLike);

module.exports = {
  likeRouter,
};
