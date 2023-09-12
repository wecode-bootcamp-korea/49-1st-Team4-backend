const threadService = require("../services/thread.service");

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

module.exports = {
  getThread,
};
