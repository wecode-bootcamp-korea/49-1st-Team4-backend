const { AppDataSource } = require("./data-source");

const checkThreadById = async (id) => {
  const [thread] = await AppDataSource.query(
    `SELECT * FROM threads WHERE id='${id}'`
  );

  return thread;
};

const createComments = async (body) => {
  const comment = await AppDataSource.query(
    `INSERT INTO thread_comments (thread_id, user_id, content) VALUES ('${body.user_id}','${body.thread_id}','${body.content}')`
  );

  return comment;
};

const checkUserById = async (id) => {
  const [user] = await AppDataSource.query(
    `SELECT * FROM users WHERE ID='${id}'`
  );

  return user;
};
module.exports = { checkThreadById, createComments, checkUserById };
