const express = require("express");
const threadController = require("../controllers/thread.controller");

const threadRouter = express.Router();

threadRouter.get("/check", threadController.threadCheck);

module.exports = { threadRouter };
