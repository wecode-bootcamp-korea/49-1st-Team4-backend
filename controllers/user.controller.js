const { throwError } = require("../utils/throwError");
const userService = require("../services/user.service");

const signIn = async (req, res) => {
  try {
    const token = await userService.signIn(req.body);
    res.status(200).json({ message: "LOGIN_SUCCESS", accessToken: token });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

const signUp = async (req, res) => {
  try {
    await userService.signUp(req.body);
    res.status(201).json({ message: "userCreated" });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
};
