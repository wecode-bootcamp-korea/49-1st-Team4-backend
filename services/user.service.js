const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userDao } = require("../models");
const { throwError } = require("../utils/throwError");
const { checkEmptyValues } = require("../utils/checkEmptyValues");

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
  const check = await bcrypt.compare(password, user.password);
  console.log(check);
  if (!check) {
    throwError(401, "INCORRECT_PASSWORD");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, iss: "wereads-team4" },
    process.env.SECRET
  );
  const decoded = jwt.verify(token, process.env.SECRET);
  console.log(decoded);

  return token;
};

const saltRounds = 10;

const validateEmail = (email) => {
  const regExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regExp.test(email)) {
    throwError(400, "INVALID_EMAIL");
  }
};

const validatePassword = (password) => {
  const hasNumber = /[\d]/;
  const hasWord = /[\w]/;
  const hasSpecial = new RegExp("[.@!#$%&'*+-/=?^_`{|}~]");
  if (
    !hasNumber.test(password) ||
    !hasWord.test(password) ||
    !hasSpecial.test(password) ||
    password.length < 8
  ) {
    throwError(400, "INVALID_PASSWORD");
  }
};

const checkDuplicateEmail = async (email) => {
  const user = await userDao.getUserByEmail(email);
  if (user) {
    throwError(400, "DUPLICATE_USER_EMAIL");
  }
};

const createUserDto = (
  email,
  hashedPassword,
  nickname,
  phoneNumber,
  birthday,
  profileImage
) => {
  let newUser = {
    email: email,
    nickname: nickname,
    password: hashedPassword,
  };
  if (phoneNumber) {
    newUser["phone_number"] = phoneNumber;
  }
  if (birthday) {
    newUser["birthday"] = birthday;
  }
  if (profileImage) {
    newUser["profile_image"] = profileImage;
  }
  return newUser;
};

const signUp = async (body) => {
  const { email, password, nickname, phoneNumber, birthday, profileImage } =
    body;

  checkEmptyValues(email, password, nickname);

  validateEmail(email);

  validatePassword(password);

  await checkDuplicateEmail(email);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  let newUser = createUserDto(
    email,
    hashedPassword,
    nickname,
    phoneNumber,
    birthday,
    profileImage
  );
  userDao.createUser(newUser);
};

const findUser = async (user_id) => {
  const user_list = await userDao.findUser(user_id);
  if (user_list.length == 0) {
    throwError(404, "USER_NOT_FOUND");
  }
};

module.exports = {
  signUp,
  signIn,
  findUser,
};
