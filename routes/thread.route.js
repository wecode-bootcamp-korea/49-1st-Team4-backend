const express = require("express");
const threadRouter = express.Router();
const { threadController } = require("../controllers");

threadRouter.get("/check", threadController.threadCheck);
threadRouter.post("/post", threadController.threadPost);
threadRouter.put("/update", threadController.threadUpdate);
threadRouter.delete("/delete", threadController.threadDelete);
threadRouter.get("/:id", threadController.getThread);
module.exports = { threadRouter };
