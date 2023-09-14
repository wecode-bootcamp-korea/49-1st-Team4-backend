const { AppDataSource } = require("./data-source");

const checkThreadById = async (threadId) => {
  const [thread] = await AppDataSource.query(
    `SELECT * FROM threads WHERE id='${threadId}'`
  );

  return thread;
};

const createComments = async (userId, threadId, comment) => {
  await AppDataSource.query(
    `INSERT INTO thread_comments (thread_id, user_id, content) VALUES ('${threadId}','${userId}','${comment}')`
  );
};

const checkUserById = async (userId) => {
  const [user] = await AppDataSource.query(
    `SELECT * FROM users WHERE ID='${userId}'`
  );

  return user;
};
module.exports = { checkThreadById, createComments, checkUserById };
