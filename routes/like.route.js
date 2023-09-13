const express = require("express");
const likeController = require("../controllers/like.controller");

const likeRouter = express.Router();

likeRouter.post("/:threadId", likeController.likeThread);
likeRouter.delete("/:threadId", likeController.deleteThreadLike);

module.exports = {
    likeRouter,
};