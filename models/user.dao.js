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
    SELECT *
    FROM users
    WHERE email = '${email}';
    `);
  return user;
};

module.exports = {
  createUser,
  getUserByEmail,
};
