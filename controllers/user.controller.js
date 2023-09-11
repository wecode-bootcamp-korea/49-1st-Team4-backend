const userService = require("../services/user.service");

const signUp = async (req, res) => {
  try {
    await userService.signUp(req.body);
    res.status(201).json({ message: "userCreated" });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({message: error.message});
  }
};

module.exports = {
  signUp,
};
