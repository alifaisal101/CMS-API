const express = require("express");
const { body } = require("express-validator");

const accountingDailyController = require("../controllers/accounting-daily");

const authorizationMiddleWare = require("../middlewares/authorization");

const Router = express.Router();

Router.post(
  "/pull-accounting-reports",
  (req, res, next) => {
    res.required_privilege = "accounting_daily_view_reports";
    next();
  },
  authorizationMiddleWare,

  body("dates").custom((dates) => {
    console.log(dates);
  }),

  accountingDailyController.pullAccReports
);

Router.post(
  "/pull-report-data",
  (req, res, next) => {
    res.required_privilege = "accounting_daily_view_report_data";
    next();
  },
  authorizationMiddleWare,

  body("id").custom((id) => {
    console.log(id);
  }),

  accountingDailyController.pullReportData
);

Router.put(
  "/create-report",
  (req, res, next) => {
    res.required_privilege = "accounting_daily_create_report";
    next();
  },
  authorizationMiddleWare,

  body("reportData").custom((reportData) => {
    console.log(reportData);
  }),

  accountingDailyController.createReport
);

Router.patch(
  "/update-report",
  (req, res, next) => {
    res.required_privilege = "accounting_daily_update_report";
    next();
  },
  authorizationMiddleWare,

  body("reportData").custom((reportData) => {
    console.log(reportData);
  }),

  accountingDailyController.updateReport
);

Router.delete(
  "/delete-report",
  (req, res, next) => {
    res.required_privilege = "accounting_daily_delete_report";
    next();
  },
  authorizationMiddleWare,
  body("id").custom((id) => {
    console.log(id);
  }),
  accountingDailyController.deleteReport
);

module.exports = Router;
