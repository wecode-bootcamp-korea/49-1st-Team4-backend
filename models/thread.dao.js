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

const createThread = async (tread) => {
  await AppDataSource.query(`
    INSERT INTO threads
    (user_id, content)
    VALUES
    (${tread.user_id}, ${tread.content});
    `);
};

module.exports = {
  getAllThreads,
  createThread,
};
