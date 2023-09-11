const bcrypt = require('bcrypt');
const userDao = require('../models/user.dao');

const signUp = async (req, res) => {
  // req body validation
  // is not-null valus exist
  const { email, password, nickname, phoneNumber, birthday, profileImage } =
    req.body;
  userService.checkEmptyValues(email, password, nickname);

  // is email format correct
  userService.checkEmailValidity(email);

  // is password format correct
  userService.checkPasswordValidity(password);

  // is email not exist on db
  userService.checkDuplicateEmail(email);

  // password hashing
  const hashedPassword = await bcrypt.hash();
  // db save
  userDao.createUser();

};
