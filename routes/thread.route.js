const express = require("express");
const threadController = require("../controllers/thread.controller");

const threadRouter = express.Router();

threadRouter.get("/check", threadController.threadCheck);
threadRouter.post("/post", threadController.threadPost);
threadRouter.get("/:id", threadController.getThread);

module.exports = { threadRouter };
