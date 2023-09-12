const threadService = require("../services/thread.service");
const { throwError } = require("../utils/throwError");

const getThread = async (req, res) => {
  try {
    const threadId = req.params.id;
    const reqUserId = 4; // req.verifiedUser.id;
    const data = await threadService.getThread(threadId, reqUserId);
    res.status(200).json({ data: data });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

const threadCheck = async (req, res) => {
  try {
    await threadService.threadCheck(req.body);
    res.status(200).json({ message: "threadCheck_success" });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

const threadPost = async (req, res) => {
  try {
    await threadService.threadPost(req.body);
    res.status(200).json({ message: "threadPost_success" });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

const threadUpdate = async (req, res) => {
  try {
    await threadService.threadUpdate(req.body);
    res.status(200).json({ message: "threadUpdate_success" });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};
const threadDelete = async (req, res) => {
  try {
    await threadService.threadDelete(req.body);
    res.status(200).json({ message: "threadDelete_success" });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getThread,
  threadCheck,
  threadPost,
  threadUpdate,
  threadDelete,
};
