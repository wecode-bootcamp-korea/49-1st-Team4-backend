const {throwError} = require("../utils/throwError");

const signUp = async (req, res) => {
  userService.signUp(req.body);
  res.status(201).json({message: "userCreated"});
};
