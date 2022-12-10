const express = require("express");

const authRouter = require("./auth");
const patientRouter = require("./patient");
const adminRouter = require("./admin/admin");
const bookingRouter = require("./booking.js");

const authenticationMidWare = require("../middlewares/authentication");

const Router = express.Router();

Router.use("/auth", authRouter);
Router.use("/patient", authenticationMidWare, patientRouter);
Router.use("/booking", authenticationMidWare, bookingRouter);
Router.use("/admin", authenticationMidWare, adminRouter);

module.exports = Router;
