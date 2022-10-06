const express = require("express");
const { body } = require("express-vaildator");

const loginController = require("./../controllers/auth");

const Router = express.Router();

Router.post(
  "/login",
  body("username").isLength({ max: 32, min: 2 }),
  body("password").isLength({ max: 64, min: 4 }),
  loginController.postLogin
);

module.exports = Router;
