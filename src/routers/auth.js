const express = require("express");
const { body } = require("express-validator");

const loggingMiddleWare = require("./../middlewares/action-logger");

const loginController = require("./../controllers/auth");

const Router = express.Router();

Router.post(
  "/login",
  body("username").isLength({ max: 32, min: 2 }),
  body("password").isLength({ max: 64, min: 4 }),
  (req, res, next) => {
    const loggingMessage = `تسجيل الدخول بالمستخدم ${req.body.username}`;
    loggingMiddleWare(req, res, next, "auth", loggingMessage);
  },
  loginController.postLogin
);

module.exports = Router;
