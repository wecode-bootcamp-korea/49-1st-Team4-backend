const jwt = require("jsonwebtoken");

const threadDao = require("../models/thread.dao");
const { throwError } = require("../utils/throwError");

const getThread = async (threadId, reqUserId) => {
  // validate id
  if (!threadId) {
    throwError(400, "KEY_ERROR");
  }
  if (!reqUserId) {
    throwError(400, "KEY_ERROR");
  }

  // query thread from db
  const threads = await threadDao.getThreadById(threadId, reqUserId); 
  // validate query thread
  if (threads.length === 0) {
    throwError(404, "CONTENT_NOT_FOUND");
  }

  for (let thread in threads) {
    thread.isMyPost = thread.isMyPost == 1 ? true : false;
    for (let comment in thread.comments) {
        comment.isMyReply = comment.isMyReply == 1 ? true : false;
    }
  }
  return threads;
};

module.exports = {
  getThread,
};
