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
    throwError(404, "EMAIL_DOES_NOT_EXIST");
  }
  
  //INCORRECT_PASSWORD
  const check = await bcrypt.compare(password, user.password);
  if (!check) {
    throwError(401, "INCORRECT_PASSWORD");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, iss: "wereads-team4" },
    process.env.SECRET
  );

  return token;
};

const saltRounds = 10;

const defaultProfileImage =
  "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg";

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
  if (phoneNumber && phoneNumber !== "") {
    if (!/^(\d){11,12}/.test(phoneNumber)) {
      throwError(400, "INVALID_INPUT");
    }
    newUser["phone_number"] = phoneNumber;
  }
  if (birthday && birthday !== "") {
    const birthdayDate = new Date(birthday);
    if (isNaN(birthdayDate.getTime())) {
      throwError(400, "INVALID_INPUT");
    }
    newUser["birthday"] = new Date(birthday)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
  }
  if (profileImage && profileImage !== "") {
    newUser["profile_image"] = profileImage;
  } else {
    newUser["profile_image"] = defaultProfileImage;
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
  await userDao.createUser(newUser);
};

const findUser = async (userId) => {
  const user_list = await userDao.findUser(userId);
  if (user_list.length == 0) {
    throwError(404, "USER_NOT_FOUND");
  }
};

const getProfile = async (userId) => {
  const profile = await userDao.getProfile(userId);
  return profile;
};

module.exports = {
  signUp,
  signIn,
  findUser,
  getProfile,
};
