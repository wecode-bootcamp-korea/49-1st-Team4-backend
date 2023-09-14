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
    LIMIT 1;
    `);
  return user;
};

const findUser = async (userId) => {
  const user = await AppDataSource.query(`
    SELECT id
    FROM users
    WHERE id = '${userId}'
    LIMIT 1;
  `);
  return user;
};

const getProfile = async (userId) => {
  return await AppDataSource.query(`
  SELECT
    nickname,
    profile_image AS profileImage
  FROM users
  WHERE id = ${userId}
  LIMIT 1;`);
};

module.exports = {
  createUser,
  getUserByEmail,
  findUser,
  getProfile,
};
