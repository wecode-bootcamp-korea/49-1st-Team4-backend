const { commentDao } = require("../models");
const { throwError } = require("../utils/throwError");

const createComment = async (body) => {
  const { userId, threadId } = body;
  const user = await commentDao.checkUserById(userId);
  if (!user) {
    throwError(401, "USER_NOT_FOUND");
  }

  const thread = await commentDao.checkThreadById(threadId);

  //thread_does_not_exist
  if (!thread) {
    throwError(401, "CONTENT_NOT_FOUND");
  }

  commentDao.createComments(body);
};

module.exports = {
  createComment,
};
