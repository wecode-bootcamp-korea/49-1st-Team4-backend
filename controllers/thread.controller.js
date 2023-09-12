const { throwError } = require("../utils/throwError");
const threadService = require("../services/thread.service");

const threadCheck = async (req, res) => {
  try {
    await threadService.threadCheck(req.body);
    res.status(200).json({ message: "threadCheck_success" });
  } catch {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  threadCheck,
};
