const { commentDao } = require("../models");
const { throwError } = require("../utils/throwError");

const createComment = async (userId, threadId, comment) => {
  
  const user = await commentDao.checkUserById(userId);
  if (!user) {
    throwError(401, "USER_NOT_FOUND");
  }

  const thread = await commentDao.checkThreadById(threadId);

  //thread_does_not_exist
  if (!thread) {
    throwError(401, "CONTENT_NOT_FOUND");
  }

  await commentDao.createComments(userId, threadId, comment);
};

module.exports = {
  createComment,
};
