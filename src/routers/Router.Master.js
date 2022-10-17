const express = require("express");

const authRouter = require("./auth");
const patientRouter = require("./patient");
const analysisRouter = require("./analysis");
const accountingDailyRouter = require("./accounting-daily");
const accountingMonthlyRouter = require("./accounting-monthly");
const adminRouter = require("./admin/admin");
const bookingRouter = require("./booking.js");

const authenticationMidWare = require("../middlewares/authentication");

const Router = express.Router();

Router.use("/auth", authRouter);
Router.use("/patient", authenticationMidWare, patientRouter);
Router.use("analysis", authenticationMidWare, analysisRouter);
Router.use("/booking", authenticationMidWare, bookingRouter);
Router.use("/accounting-daily", authenticationMidWare, accountingDailyRouter);
Router.use(
  "/accounting-monthly",
  authenticationMidWare,

  accountingMonthlyRouter
);
Router.use("/admin", authenticationMidWare, adminRouter);

module.exports = Router;
