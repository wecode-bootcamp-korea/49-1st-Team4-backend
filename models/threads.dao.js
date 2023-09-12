const { AppDataSource } = require("./data-source");

const getAllThreads = async () => {
  const [thread] = await AppDataSource.query(`
    SELECT nickname, content, createdAt, updatedAt FROM posts;
    `);
  return thread;
};

module.exports = {
  getAllThreads,
};
