const bcrypt = require("bcrypt");
const userDao = require("../models/user.dao");
const { checkEmptyValues } = require("../utils/checkEmptyValues");
const { throwError } = require("../utils/throwError");

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

module.exports = {
  signUp,
};
let newUser = createUserDto(
  email,
  hashedPassword,
  nickname,
  phoneNumber,
  birthday,
  profileImage
);
