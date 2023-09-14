const { commentService } = require("../services");

const createComment = async (req, res) => {
  try {
    const { userId } = req;
    const { postId: threadId, comment } = req.body;
    await commentService.createComment(userId, threadId, comment);
    res.status(201).json({ message: "COMMENT_CREATED" });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  createComment,
};
