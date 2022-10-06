const express = require("express");

const factorsRouter = require("./factors.admin");
const logsRouter = require("./logs.admin");
const senderDoctors = require("./sender-doctors.admin");
const usersRouter = require("./users.admin");

const authenticationMiddleWare = require("../middlewares/authentication");
const authorizationMiddleWare = require("../middlewares/authorization");

const Router = express.Router();

Router.use(
  "/factors",
  authenticationMiddleWare,
  authorizationMiddleWare,

  factorsRouter
);
Router.use(
  "/logs",
  authenticationMiddleWare,
  authorizationMiddleWare,

  logsRouter
);
Router.use(
  "/sender-doctors",
  authenticationMiddleWare,
  authorizationMiddleWare,

  senderDoctors
);
Router.use(
  "/users",
  authenticationMiddleWare,
  authorizationMiddleWare,

  usersRouter
);

module.exports = Router;
