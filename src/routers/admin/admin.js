const express = require("express");

const factorsRouter = require("./factors.admin");
const logsRouter = require("./logs.admin");
const senderDoctors = require("./sender-doctors.admin");
const usersRouter = require("./users.admin");

const authorizationMiddleWare = require("../../middlewares/authorization");

const Router = express.Router();

Router.use(
  "/factors",
  (req, res, next) => {
    res.required_privilege = "factors_management";
    next();
  },
  authorizationMiddleWare,

  factorsRouter
);
Router.use(
  "/logs",
  (req, res, next) => {
    res.required_privilege = "logs_management";
    next();
  },
  authorizationMiddleWare,

  logsRouter
);
Router.use(
  "/sender-doctors",
  (req, res, next) => {
    res.required_privilege = "sender_doctors_management";
    next();
  },
  authorizationMiddleWare,

  senderDoctors
);
Router.use(
  "/users",
  (req, res, next) => {
    res.required_privilege = "user_management";
    next();
  },
  authorizationMiddleWare,

  usersRouter
);

module.exports = Router;
