const { threadService } = require("../services");

const getThreadById = async (req, res) => {
  try {
    const { threadId } = req.params;
    const { userId: reqUserId } = req;
    const data = await threadService.getThreadById(threadId, reqUserId);
    res.status(200).json({ data: data });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

const getThreads = async (req, res) => {
  try {
    const { userId } = req;
    const thread = await threadService.getThreads(userId);
    res.status(200).json({
      data: thread,
    });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

const createThread = async (req, res) => {
  try {
    const { userId } = req;
    const { content } = req.body;
    await threadService.createThread({ userId, content });
    res.status(201).json({ message: "THREAD_CREATED" });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

const updateThread = async (req, res) => {
  try {
    const { userId } = req;
    const { content } = req.body;
    const { threadId } = req.params;
    await threadService.updateThread({ userId, threadId, content });
    res.status(200).json({ message: "THREAD_UPDATED" });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

const deleteThread = async (req, res) => {
  try {
    const { userId } = req;
    const { threadId } = req.params;
    await threadService.deleteThread(threadId, userId);
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
