const { threadService } = require("../services");

const getThreadById = async (req, res) => {
  try {
    const threadId = req.params.id;
    const reqUserId = req.body.userId;
    const data = await threadService.getThreadById(threadId, reqUserId);
    res.status(200).json({ data: data });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

const getThreads = async (req, res) => {
  try {
    const thread = await threadService.getThreads(req.body);
    res.status(200).json({
      message: "threadCheck_success",
      data: thread,
    });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

const createThread = async (req, res) => {
  try {
    await threadService.createThread(req.body);
    res.status(200).json({ message: "threadPost_success" });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

const updateThread = async (req, res) => {
  try {
    await threadService.updateThread(req.body);
    res.status(200).json({ message: "threadUpdate_success" });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};
const deleteThread = async (req, res) => {
  try {
    await threadService.deleteThread(req.body);
    res.status(200).json({ message: "threadDelete_success" });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getThreadById,
  getThreads,
  createThread,
  updateThread,
  deleteThread,
};
