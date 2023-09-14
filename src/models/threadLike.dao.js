const { AppDataSource } = require("./data-source");

const createThreadLike = async (threadId, userId) => {
  await AppDataSource.query(`
    INSERT INTO thread_like
    (thread_id, user_id)
    VALUES 
    ('${threadId}', '${userId}')
    ;`);
};

const deleteThreadLike = async (threadId, userId) => {
  await AppDataSource.query(`
    DELETE FROM thread_like
    WHERE thread_id = ${threadId} AND user_id = ${userId}
    ;`);
};

const getThreadLike = async (threadId, userId) => {
  const likes = await AppDataSource.query(`
    SELECT * FROM thread_like
    WHERE thread_id = ${threadId} AND user_id = ${userId}
    ;`);
  return likes;
};

module.exports = {
  createThreadLike,
  deleteThreadLike,
  getThreadLike,
};
