const {throwError} = require("../utils/throwError");

const signUp = async (req, res) => {
  // req body validation
  // is not-null valus exist
  const { email, password, nickname, phoneNumber, birthday, profileImage } =
    req.body;
  userService.isNotEmpty(email, password, nickname);

  // is email format correct
  userService.isEmailValid(email);

  // is password format correct
  userService.isPasswordValid(password);

  // is email not exist on db
  

  // password hashing

  // db save

  // response
};
