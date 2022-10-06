const express = require("express");
const { body } = require("express-validator");

const accountingDailyController = require("../controllers/accounting-daily");

const authenticationMiddleWare = require("../middlewares/authentication");
const authorizationMiddleWare = require("../middlewares/authorization");

const Router = express.Router();

Router.post(
  "/pull-accounting-reports",
  authenticationMiddleWare,
  authorizationMiddleWare,

  body("dates").custom((dates) => {
    console.log(dates);
  }),

  accountingDailyController.pullAccReports
);

Router.post(
  "/pull-report-data",
  authenticationMiddleWare,
  authorizationMiddleWare,

  body("id").custom((id) => {
    console.log(id);
  }),

  accountingDailyController.pullReportData
);

Router.put(
  "/create-report",
  authenticationMiddleWare,
  authorizationMiddleWare,

  body("reportData").custom((reportData) => {
    console.log(reportData);
  }),

  accountingDailyController.createReport
);

Router.patch(
  "/update-report",
  authenticationMiddleWare,
  authorizationMiddleWare,

  body("reportData").custom((reportData) => {
    console.log(reportData);
  }),

  accountingDailyController.updatePatient
);

module.exports = Router;
