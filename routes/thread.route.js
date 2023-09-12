const express = require("express");
const threadController = require("../controllers/thread.controller");

const threadRouter = express.Router();

threadRouter.get("/:id", threadController.getThread);
threadRouter.get("/check", threadController.threadCheck);
threadRouter.post("/post", threadController.threadPost);
module.exports = { threadRouter };
