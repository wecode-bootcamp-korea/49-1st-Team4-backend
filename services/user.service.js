const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDao = require("../models/user.dao");
const { throwError } = require("../utils/throwError");

const signIn = async (body) => {
  const { email, password } = body;
  const user = await userDao.getUserByEmail(email);
  //KEY_ERROR
  if (!email || !password) {
    throwError(400, "KEY_ERROR");
  }

  //email_does_not_exist
  if (!user) {
    throwError(401, "EMAIL_DOES_NOT_EXIST");
  }
  //INCORRECT_PASSWORD
  // const result = await bcrypt.compare(password, user.password);
  console.log(user.password);
  if (user.password != password) {
    throwError(401, "INCORRECT_PASSWORD");
  }

  // const token = jwt.sign({ id: user.id }, process.env.SECRET);
  // const decoded = jwt.verify(token, process.env.SECRET);
  // console.log(decoded);

  // return token;
};

module.exports = { signIn };
