const commentDao = require("../models/comment.dao");
const { throwError } = require("../utils/throwError");
const { checkThreadById } = require("../models/comment.dao");
const { checkUserById } = require("../models/comment.dao");
const { createComments } = require("../models/comment.dao");

const createComment = async (body) => {
  const { thread_id, user_id } = body;
  const user = await commentDao.checkUserById(user_id);
  if (!user) {
    throwError(401, "USER_NOT_FOUND");
  }

  const thread = await commentDao.checkThreadById(thread_id);

  //thread_does_not_exist
  if (!thread) {
    throwError(401, "CONTENT_NOT_FOUND");
  }

  commentDao.createComments(body);
};

module.exports = {
  createComment,
};
