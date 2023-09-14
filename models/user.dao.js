const { AppDataSource } = require("./data-source");

const createUser = async (user) => {
  await AppDataSource.query(`
  INSERT INTO users
  (${Object.keys(user).join(",")})
  VALUES
  ('${Object.values(user).join("','")}');
  `);
};

const getUserByEmail = async (email) => {
  const [user] = await AppDataSource.query(`
    SELECT email
    FROM users
    WHERE email = '${email}'
    TOP 1;
    `);
  return user;
};

const findUser = async (user_id) => {
  const user = await AppDataSource.query(`
    SELECT id
    FROM users
    WHERE id = '${user_id}'
    TOP 1;
  `);
  return user;
};

module.exports = {
  createUser,
  getUserByEmail,
  findUser,
};
