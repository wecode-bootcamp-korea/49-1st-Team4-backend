const { userService } = require("../services");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.signIn({email, password});
    res.status(200).json({ message: "LOGIN_SUCCESS", accessToken: token });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

const signUp = async (req, res) => {
  try {
    const {
      email,
      password,
      nickname,
      profileImage,
      phoneNumber,
      birthday
    } = req.body;
    await userService.signUp({
      email,
      password,
      nickname,
      profileImage,
      phoneNumber,
      birthday
    });
    res.status(201).json({ message: "USER_CREATED" });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
};
