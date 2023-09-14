const likeService = require("../services/like.service");

const createThreadLike = async (req, res) => {
  try {
    const { postId: threadId } = req.body;
    const { userId } = req;
    await likeService.createThreadLike(threadId, userId);
    res.status(201).json({ message: "THREAD_LIKE_CREATED" });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

const deleteThreadLike = async (req, res) => {
  try {
    const { threadId } = req.params;
    const { userId } = req;
    await likeService.deleteThreadLike(threadId, userId);
    res.status(204).json();
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  createThreadLike,
  deleteThreadLike,
};
