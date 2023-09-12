const { throwError } = require("../utils/throwError");
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

module.exports = { signIn };
