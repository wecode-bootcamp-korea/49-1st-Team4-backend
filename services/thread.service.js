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

  for (let i = 0; i < threads.length; i ++) {
    let thread = threads[i];
    thread.isMyPost = thread.isMyPost == 1 ? true : false;
    thread.createdAt = new Date(thread.createdAt).toISOString();
    for (let j = 0; j < thread.comments.length; j ++) {
        let comment = thread.comments[j];
        comment.isMyReply = comment.isMyReply == 1 ? true : false;
        comment.createdAt = new Date(comment.createdAt).toISOString();
    }
  }
  return threads;
};


const threadCheck = async (body) => {
  //DB 소스 변수를 가져오고
  // const { user_id, content } = req.body;
  const threads = await threadDao.getAllThreads();

  //프론트에 전달
  return threads;
};

module.exports = {
  getThread,
  threadCheck,
};
