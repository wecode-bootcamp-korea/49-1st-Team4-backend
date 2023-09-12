const { AppDataSource } = require("./data-source");

const getAllThreads = async () => {
  const [thread] = await AppDataSource.query(`
    SELECT 
    users.nickname, 
    threads.content, 
    threads.created_at, 
    threads.updated_at
    FROM users, threads
    WHERE users.id = threads.user_id;
    `);
  return thread;
};

module.exports = {
  getAllThreads,
};
