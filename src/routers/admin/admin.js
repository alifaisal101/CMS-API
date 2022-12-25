const express = require("express");

const factorsRouter = require("./factors.admin");
const logsRouter = require("./logs.admin");
const usersRouter = require("./users.admin");

const authorizationMiddleWare = require("../../middlewares/authorization");

const Router = express.Router();

Router.use(
  "/factors",

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
  "/users",

  usersRouter
);

module.exports = Router;
