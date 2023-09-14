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

  const thread = threads[0];
  convertToBoolean(thread);
  return threads;
};

const getThreads = async (userId) => {
  console.log("userId",userId);
  //DB 소스 변수를 가져오고
  const threads = await threadDao.getAllThreads(userId);
  
  threads.forEach(thread => {
    console.log(thread);
    console.log(thread.comments);
    convertToBoolean(thread);
  });
  //프론트에 전달
  return threads;
};

const createThread = async (body) => {
  const { userId, content } = body; //token 에서 값 알아와서 변수에 입력
  if (!userId) {
    throwError(400,"KEY_ERROR")
  }
  if (!content) {
    throwError(400, "KEY_ERROR");
  }
  await threadDao.createThread({
    userId,
    content,
  });
};

const updateThread = async (body) => {
  const { userId, threadId, content } = body;
  //예외. content의 내용이 공란이 아니어야한다.
  if (!content) {
    throwError(400, "KEY_ERROR");
  }
  if (!threadId) {
    throwError(400, "KEY_ERROR");
  }
  const thread = threadDao.getThreadById(threadId, userId);
  //예외. 본인이 작성한 스레드가 아니면 수정 불가능
  if (thread.isMyPost) {
    throwError(401, "UNAUTHORIZED");
  }
  await threadDao.updateThread(threadId, content);
};

const deleteThread = async (userId, threadId) => {
  // 내 스레드가 맞는지 확인

  const thread = threadDao.getThreadById(threadId, userId);
  if (thread.length == 0) {
    throwError(404, "CONTENT_NOT_FOUND");
  }
  if (thread.userId !== userId) {
    throwError(401, "UNAUTHORIZED");
  }
  await threadDao.deleteThread(threadId);
};

function convertToBoolean(thread) {
  thread.isMyPost = !!thread.isMyPost;
  thread.isLiked = !!thread.isLiked;
  thread.createdAt = new Date(thread.createdAt).toISOString();
  if (thread.comments) {
    for (let j = 0; j < thread.comments.length; j++) {
      let comment = thread.comments[j];
      comment.isMyReply = !!comment.isMyReply;
      comment.createdAt = new Date(comment.createdAt).toISOString();
    }
  }
}

module.exports = {
  getThreadById,
  getThreads,
  createThread,
  updateThread,
  deleteThread,
};
