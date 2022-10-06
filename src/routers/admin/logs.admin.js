const express = require("express");
const { body } = require("express-validator");

const logsController = require("./../../controllers/admin/logs.admin");

const Router = express.Router();

Router.post(
  "/pull-logs",
  body("searchOptions").custom((searchOptions) => {
    console.log(searchOptions);
  }),
  logsController.pullLogs
);

Router.put(
  "/add-log",
  body("logData").custom((logData) => {
    console.log(logData);
  }),
  logsController.addLog
);

Router.post(
  "/clear-logs",
  body("dates").custom((dates) => {
    console.log(dates);
  }),
  logsController.clearLogs
);

module.exports = Router;
