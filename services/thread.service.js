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

  for (let i = 0; i < threads.length; i++) {
    let thread = threads[i];
    thread.isMyPost = thread.isMyPost == 1 ? true : false;
    thread.createdAt = new Date(thread.createdAt).toISOString();
    for (let j = 0; j < thread.comments.length; j++) {
      let comment = thread.comments[j];
      comment.isMyReply = comment.isMyReply == 1 ? true : false;
      comment.createdAt = new Date(comment.createdAt).toISOString();
    }
  }
  return threads;
};

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
  // if (!content) {
  //   throwError(400, "INPUT_CONTENT_EMPTY");
  // }
  let newThread = {
    user_id: id,
    content: content,
  };
  await threadDao.createThread(newThread);
};

const threadUpdate = async (body) => {
  const { user_id, content, thread_id } = body;
};

const threadDelete = async (body) => {
  const threadUpdate = async;
};
module.exports = {
  getThread,
  threadCheck,
  threadPost,
  threadUpdate,
  threadDelete,
};
