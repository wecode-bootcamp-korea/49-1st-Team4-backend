const express = require("express");

const { likeController } = require("../controllers");

const likeRouter = express.Router();

likeRouter.post("/", likeController.createThreadLike);
likeRouter.delete("/:threadId", likeController.deleteThreadLike);

module.exports = {
  likeRouter,
};
