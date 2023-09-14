const express = require("express");

const { likeController } = require("../controllers");
const { validateToken } = require("../middleware/auth");

const likeRouter = express.Router();

likeRouter.post("/", validateToken, likeController.createThreadLike);
likeRouter.delete("/:threadId", validateToken, likeController.deleteThreadLike);

module.exports = {
  likeRouter,
};
