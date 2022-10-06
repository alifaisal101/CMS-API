const express = require("express");
const { body } = require("express-validator");

const accountingMonthlyController = require("../controllers/accounting-monthly");

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

  accountingMonthlyController.pullAccReports
);

Router.post(
  "/pull-report-data",
  authenticationMiddleWare,
  authorizationMiddleWare,

  body("id").custom((id) => {
    console.log(id);
  }),

  accountingMonthlyController.pullReportData
);

Router.put(
  "/create-report",
  authenticationMiddleWare,
  authorizationMiddleWare,

  body("reportData").custom((reportData) => {
    console.log(reportData);
  }),

  accountingMonthlyController.createReport
);

Router.patch(
  "/update-report",
  authenticationMiddleWare,
  authorizationMiddleWare,

  body("reportData").custom((reportData) => {
    console.log(reportData);
  }),

  accountingMonthlyController.updatePatient
);

module.exports = Router;
