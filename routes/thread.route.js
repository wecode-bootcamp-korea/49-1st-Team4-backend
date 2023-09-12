const express = require("express");
const threadController = require("../controllers/thread.controller");

const threadRouter = express.Router();

threadRouter.post("/threads", userController.signUp);

module.exports = { threadRouter };
