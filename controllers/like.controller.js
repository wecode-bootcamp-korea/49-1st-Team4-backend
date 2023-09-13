const likeService = require("../services/like.service");

const createThreadLike = async (req, res) => {
  try {
    const threadId = req.params.threadId;
    const userId = 4; // req.verifiedUeser.id;
    await likeService.createThreadLike(threadId, userId);
    res.status(201).json({ message: "success" });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

const deleteThreadLike = async (req, res) => {
  try {
    const threadId = req.params.threadId;
    const userId = 4; // req.verifiedUeser.id;
    await likeService.deleteThreadLike(threadId, userId);
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  createThreadLike,
  deleteThreadLike,
};
