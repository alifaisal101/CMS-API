const express = require("express");
const { body } = require("express-validator");
var ObjectId = require("mongoose").Types.ObjectId;

const authorizationMiddleWare = require("./../middlewares/authorization");

const loggingMiddleWare = require("./../middlewares/action-logger");
const paitentController = require("./../controllers/patient");
const dataType = require("../util/data-type");

const Router = express.Router();

const action = "patient";

Router.post(
  "/pull-patients",
  (req, res, next) => {
    res.required_privilege = "view_patients";
    next();
  },
  authorizationMiddleWare,

  body("page").isDecimal().optional({ nullable: true }),

  body("sequence").isDecimal().optional({ nullable: true }),
  body("fullname")
    .isAlpha("ar-IQ", { ignore: " " })
    .optional({ nullable: true }),
  body("gender").isAlpha("ar-IQ", { ignore: " " }).optional({ nullable: true }),
  body("age")
    .isAlphanumeric("ar-IQ", { ignore: " " })
    .optional({ nullable: true }),
  body("totalcost").isNumeric().optional({ nullable: true }),
  body("discountPres").isNumeric().optional({ nullable: true }),
  body("userId").isMongoId().optional({ nullable: true }),
  body("checkId").isMongoId().optional({ nullable: true }),
  body("senderId").isMongoId().optional({ nullable: true }),
  body("opertId").isMongoId().optional({ nullable: true }),
  body("checkerId").isMongoId().optional({ nullable: true }),
  body("created_at"),

  (req, res, next) => {
    const loggingMessage = "سحب بيانات المراجعين";
    loggingMiddleWare(req, res, next, action, loggingMessage);
  },
  paitentController.pullPatients
);

Router.delete(
  "/delete-patients",
  (req, res, next) => {
    res.required_privilege = "delete_patients";
    next();
  },
  authorizationMiddleWare,

  body("patientsList").custom((patientsList) => {
    console.log(patientsList);
  }),

  (req, res, next) => {
    const loggingMessage = "حذف مراجعين";
    loggingMiddleWare(req, res, next, action, loggingMessage);
  },
  paitentController.deletePatients
);

Router.put(
  "/register-patient",
  (req, res, next) => {
    res.required_privilege = "register_patients";
    next();
  },
  authorizationMiddleWare,

  body("sequence").isDecimal(),
  body("senderId").isMongoId().optional({ nullable: true }),
  body("fullname").isAlpha("ar-IQ", { ignore: " " }),
  body("gender").isAlpha("ar-IQ", { ignore: " " }),
  body("age").custom((ageObj) => {
    const err = new Error();
    err.statusCode = 422;

    if (dataType(ageObj) !== "object") {
      throw err;
    }
    if (dataType(ageObj.years) !== "number") {
      throw err;
    }
    if (dataType(ageObj.months) !== "number" && ageObj.months) {
      throw err;
    }
    if (dataType(ageObj.weeks) !== "number" && ageObj.weeks) {
      throw err;
    }
    if (dataType(ageObj.days) !== "number" && ageObj.days) {
      throw err;
    }
    return true;
  }),

  body("checks").custom((checks) => {
    const err = new Error();
    err.statusCode = 422;
    if (dataType(checks) !== "array") {
      throw err;
    }
    if (checks.length < 1) {
      throw err;
    }

    checks.map((check) => {
      if (dataType(check) !== "object") {
        throw err;
      }
      const { checkId, checkTypeNumber, cost, checkerId, opertId } = check;
      if (
        dataType(checkTypeNumber) !== "number" ||
        dataType(cost) !== "number"
      ) {
        throw err;
      }

      if (!ObjectId.isValid(checkId)) {
        throw err;
      }

      if (!ObjectId.isValid(checkerId) && checkerId) {
        throw err;
      }

      if (!ObjectId.isValid(opertId) && opertId) {
        throw err;
      }
    });

    return true;
  }),
  body("totalcost").isNumeric(),
  body("desc").isLength({ min: 1, max: 4000 }).optional({ nullable: true }),
  body("state").isAlpha("ar-IQ", { ignore: " " }),
  body("discountPres").isNumeric(),
  body("bookingInfo").custom((bookingInfo) => {
    const err = new Error();
    err.statusCode = 422;
    if (dataType(bookingInfo) === "undefined") {
      return true;
    }

    if (dataType(bookingInfo) !== "object") {
      throw err;
    }

    if (dataType(bookingInfo.appointmentDate) !== "date") {
      throw err;
    }

    if (dataType(bookingInfo.prepaid) !== "boolean" && bookingInfo.prepaid) {
      throw err;
    }

    return true;
  }),

  (req, res, next) => {
    const loggingMessage = "تسجيل مراجع";
    loggingMiddleWare(req, res, next, action, loggingMessage);
  },
  paitentController.registerPatient
);

Router.patch(
  "/update-patient",
  (req, res, next) => {
    res.required_privilege = "update_patients";
    next();
  },
  authorizationMiddleWare,

  body("patientData").custom((patientData) => {
    console.log(patientData);
  }),

  (req, res, next) => {
    const loggingMessage = "تحديث بيانات مراجع";
    loggingMiddleWare(req, res, next, action, loggingMessage);
  },
  paitentController.updatePatient
);

module.exports = Router;
