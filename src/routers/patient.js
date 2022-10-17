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

  body("page").isDecimal(),
  body("searchOptions").custom((searchOptions) => {
    console.log(searchOptions);
  }),

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
