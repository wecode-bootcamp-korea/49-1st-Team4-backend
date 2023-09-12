const { AppDataSource } = require("../models/data-source");
const threadDao = require("../models/threads.dao");
const { throwError } = require("../utils/throwError");
const { checkEmptyValues } = require("../utils/checkEmptyValues");

const threadCheck = async (body) => {
  //DB 소스 변수를 가져오고

  const threads = await threadDao.getAllThreads();
  //프론트에 전달
  return threads;
};

const threadPost = async (body) => {
  const { id, content } = body; //token 에서 값 알아와서 변수에 입력
  // if (!token) {
  //   throwError(400,"LOGIN_ERROR")
  // }
  if (!content) {
    throwError(400, "INPUT_CONTENT_EMPTY");
  }
  let newThread = {
    user_id: id,
    content: content,
  };
  await threadDao.createThread(newThread);
};

module.exports = {
  threadCheck,
  threadPost,
};
