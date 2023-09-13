const { commentService } = require("../services");

const createComment = async (req, res) => {
  try {
    await commentService.createComment(req.body);
    res.status(200).json({ message: "comment created" });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  createComment,
};
