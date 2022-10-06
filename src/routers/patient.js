const express = require("express");
const { body } = require("express-validator");

const authenticationMiddleWare = require("./../middlewares/authentication");
const authorizationMiddleWare = require("./../middlewares/authorization");

const paitentController = require("./../controllers/patient");

const Router = express.Router();

Router.post(
  "/pull-patients",
  authenticationMiddleWare,
  authorizationMiddleWare,

  body("page").isDecimal(),
  body("searchOptions").custom((searchOptions) => {
    console.log(searchOptions);
  }),

  paitentController.pullPatients
);

Router.post(
  "/delete-patients",
  authenticationMiddleWare,
  authorizationMiddleWare,

  body("patientsList").custom((patientsList) => {
    console.log(patientsList);
  }),

  paitentController.deletePatients
);

Router.put(
  "/register-patient",
  authenticationMiddleWare,
  authorizationMiddleWare,

  body("patientData").custom((patientData) => {
    console.log(patientData);
  }),

  paitentController.registerPatient
);

Router.patch(
  "/update-patient",
  authenticationMiddleWare,
  authorizationMiddleWare,

  body("patientData").custom((patientData) => {
    console.log(patientData);
  }),

  paitentController.updatePatient
);

module.exports = Router;
