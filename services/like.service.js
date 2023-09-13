const threadLikeDao = require("../models/threadLike.dao");
const threadDao = require("../models/thread.dao");
const { throwError } = require("../utils/throwError");

const createThreadLike = async (threadId, userId) => {
  // validate post
  if (!threadId) {
    throwError(400, "KEY_ERROR");
  }

  if (!userId) {
    throwError(401, "NOT_AUTHORIZED");
  }

  // query thread from db
  const threads = await threadDao.getThreadById(threadId, userId);
  // validate query thread
  if (threads.length === 0) {
    throwError(404, "CONTENT_NOT_FOUND");
  }

  const likes = await threadLikeDao.getThreadLike(threadId, userId);
  if (likes.length > 0) {
    throwError(400, "DUPLICATE_LIKE");
  }

  await threadLikeDao.createThreadLike(threadId, userId);
};

const deleteThreadLike = async (threadId, userId) => {
  // validate post
  if (!threadId) {
    throwError(400, "KEY_ERROR");
  }

  if (!userId) {
    throwError(401, "NOT_AUTHORIZED");
  }

  const threads = await threadDao.getThreadById(threadId, userId);
  // validate query thread
  if (threads.length === 0) {
    throwError(404, "CONTENT_NOT_FOUND");
  }

  const likes = await threadLikeDao.getThreadLike(threadId, userId);
  if (likes.length === 0) {
    throwError(404, "CONTENT_NOT_FOUND");
  }

  await threadLikeDao.deleteThreadLike(threadId, userId);
};

module.exports = {
  createThreadLike,
  deleteThreadLike,
};
