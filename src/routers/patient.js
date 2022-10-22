const express = require("express");
const { body } = require("express-validator");

const authorizationMiddleWare = require("./../middlewares/authorization");

const paitentController = require("./../controllers/patient");

const Router = express.Router();

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
  body("check").isMongoId().optional({ nullable: true }),
  body("senderId").isMongoId().optional({ nullable: true }),
  body("opertId").isMongoId().optional({ nullable: true }),
  body("checkerId").isMongoId().optional({ nullable: true }),

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

  paitentController.deletePatients
);

Router.put(
  "/register-patient",
  (req, res, next) => {
    res.required_privilege = "register_patients";
    next();
  },
  authorizationMiddleWare,

  body("patientData").custom((patientData) => {
    console.log(patientData);
  }),

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

  paitentController.updatePatient
);

module.exports = Router;
