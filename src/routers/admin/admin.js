const express = require("express");

const factorsRouter = require("./factors.admin");
const logsRouter = require("./logs.admin");
const senderDoctors = require("./sender-doctors.admin");
const usersRouter = require("./users.admin");

const Router = express.Router();

Router.use("factors", factorsRouter);
Router.use("logs", logsRouter);
Router.use("sender-doctors", senderDoctors);
Router.use("users", usersRouter);

module.exports = Router;
