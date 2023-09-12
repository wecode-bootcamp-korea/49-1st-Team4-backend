const { AppDataSource } = require("../models/data-source");
const threadDao = require("../models/threads.dao");
const { throwError } = require("../utils/throwError");
const { checkEmptyValues } = require("../utils/checkEmptyValues");

const threadCheck = async (req, res) => {
  //DB 소스 변수를 가져오고
  // const { user_id, content } = req.body;
  const treads = await threadDao.getAllThreads();

  if (threads == 0) {
    throwError(400, "NO_CONTENT");
  }
  //프론트에 전달
  return threads;
};

module.exports = {
  threadCheck,
};
