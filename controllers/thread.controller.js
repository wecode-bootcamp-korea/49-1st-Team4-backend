const { threadService } = require("../services");

const getThreadById = async (req, res) => {
  try {
    const { id : threadId } = req.params;
    const { userId : reqUserId } = req.body;

    const data = await threadService.getThreadById(threadId, reqUserId);
    res.status(200).json({ data });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

const getThreads = async (req, res) => {
  try {
    const thread = await threadService.getThreads(req.userId);
    res.status(200).json({
      message: "threadCheck_success",
      data: thread,
    });
  } catch (error) {
    console.log("error", error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

const createThread = async (req, res) => {
  try {
    const userId = req.userId
    const { title, content } = req.body
    await threadService.createThread(userId, { title, content });
    res.status(201).json({ message: "threadPost_success" });
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
    res.status(204).json();
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
