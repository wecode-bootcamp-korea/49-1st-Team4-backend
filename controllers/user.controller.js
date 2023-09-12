const userService = require("../services/user.service");

const signIn = async (req, res) => {
  try {
    await userService.signIn(req.body);
    res.status(200).json({ message: "success" });
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
