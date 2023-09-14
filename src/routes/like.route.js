const express = require("express");

const { likeController } = require("../controllers");
const { validateToken } = require("../middleware/auth");

const likeRouter = express.Router();

likeRouter.use(validateToken);
likeRouter.post("/", likeController.createThreadLike);
likeRouter.delete("/:threadId", likeController.deleteThreadLike);

module.exports = {
  likeRouter,
};
