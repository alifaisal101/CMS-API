const express = require("express");
const { body } = require("express-validator");

const accountingMonthlyController = require("../controllers/accounting-monthly");

const authorizationMiddleWare = require("../middlewares/authorization");

const Router = express.Router();

Router.post(
  "/pull-accounting-reports",
  (req, res, next) => {
    res.required_privilege = "accounting_monthly_view_reports";
    next();
  },
  authorizationMiddleWare,

  body("dates").custom((dates) => {
    console.log(dates);
  }),

  accountingMonthlyController.pullAccReports
);

Router.post(
  "/pull-report-data",
  (req, res, next) => {
    res.required_privilege = "accounting_monthly_view_report_data";
    next();
  },
  authorizationMiddleWare,

  body("id").custom((id) => {
    console.log(id);
  }),

  accountingMonthlyController.pullReportData
);

Router.put(
  "/create-report",
  (req, res, next) => {
    res.required_privilege = "accounting_monthly_create_report";
    next();
  },
  authorizationMiddleWare,

  body("reportData").custom((reportData) => {
    console.log(reportData);
  }),

  accountingMonthlyController.createReport
);

Router.patch(
  "/update-report",
  (req, res, next) => {
    res.required_privilege = "accounting_monthly_update_report";
    next();
  },
  authorizationMiddleWare,

  body("reportData").custom((reportData) => {
    console.log(reportData);
  }),

  accountingMonthlyController.updateReport
);

Router.delete(
  "/delete-report",
  (req, res, next) => {
    res.required_privilege = "accounting_monthly_delete_report";
    next();
  },
  authorizationMiddleWare,
  body("id").custom((id) => {
    console.log(id);
  }),
  accountingMonthlyController.deleteReport
);

module.exports = Router;
