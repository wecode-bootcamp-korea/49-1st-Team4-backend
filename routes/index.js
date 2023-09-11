const express = require("express");

const { userSignupRouter } = require("./user_signup.router");

const routes = express.Router();

routes.use("/user", userSignupRouter);

module.exports = { routes };