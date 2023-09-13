const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDao = require("../models/user.dao");
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
  // const result = await bcrypt.compare(password, user.password);
  console.log(user.password);
  if (user.password != password) {
    throwError(401, "INCORRECT_PASSWORD");
  }

  const token = jwt.sign({ email: email }, process.env.SECRET);
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
    newUser["birthday"] = birthday;
  }
  if (profileImage && profileImage !== "") {
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

  const hashedPassword = password; // TODO: login에서 암호화 처리 되면 아래 줄로 변경
  // const hashedPassword = await bcrypt.hash(password, saltRounds);

  let newUser = createUserDto(
    email,
    hashedPassword,
    nickname,
    phoneNumber,
    birthday,
    profileImage //아래 주소를 default로 저장하면 될 것 같습니다.
    //https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Ffc7a0770-8294-4680-9cb3-c81efe407127%2Fb5f725e6-ab7c-44cc-ad87-1214e26017a9%2FUntitled.jpeg?table=block&id=9589c573-1bbb-48d7-a06b-a0502555d9cd&spaceId=fc7a0770-8294-4680-9cb3-c81efe407127&width=2000&userId=3389c2f0-8e40-4e50-a5a8-1876a4ee6b79&cache=v2
  );
  await userDao.createUser(newUser);
};

const findUser = async (user_id) => {
  const user_list = await userDao.findUser(user_id);
  if (user_list.length == 0) {
    return false;
  } else {
    return true;
  }
};

module.exports = {
  signUp,
  signIn,
  findUser,
};
