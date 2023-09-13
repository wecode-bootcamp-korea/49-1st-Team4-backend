const { threadDao } = require("../models");
const { throwError } = require("../utils/throwError");

const getThreadById = async (threadId, reqUserId) => {
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

const getThreads = async (body) => {
  //DB 소스 변수를 가져오고

  const threads = await threadDao.getAllThreads();
  //프론트에 전달
  return threads;
};

const createThread = async (body) => {
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

const updateThread = async (body) => {
  const { user_id, content, thread_id } = body;
  //예외. content의 내용이 공란이 아니어야한다.
  if (!content) {
    throwError(400, "CONTENT_EMPTY");
  }
  const thread = threadDao.getThreadById(thread_id, user_id);
  //예외. 본인이 작성한 스레드가 아니면 수정 불가능
  if (thread.isMyPost) {
    throwError(400, "NO_PERMISSION_USER");
  }
  await threadDao.updateTread(thread_id, content);
};

const deleteThread = async (body) => {
  const { thread_id, user_id } = body;
  const thread = threadDao.getThreadById(thread_id, user_id);
  if (thread.length == 0) {
    throwError(400, "NON_EXISTENT_THREAD");
  }
  await threadDao.deleteTreads(thread_id);
};
module.exports = {
  getThreadById,
  getThreads,
  createThread,
  updateThread,
  deleteThread,
};
