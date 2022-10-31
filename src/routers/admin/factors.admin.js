const express = require("express");
const { body } = require("express-validator");

const authorizationMiddleWare = require("../../middlewares/authorization");

const factorsController = require("./../../controllers/admin/factors.admin");

const Router = express.Router();

Router.get(
  "/pull-operts",
  (req, res, next) => {
    res.required_privilege = "factors_management_pull_operts";
    next();
  },
  authorizationMiddleWare,
  factorsController.pullOperts
);

Router.get(
  "/pull-doctors",
  (req, res, next) => {
    res.required_privilege = "factors_management_pull_doctors";
    next();
  },
  authorizationMiddleWare,
  factorsController.pullDoctors
);

Router.patch(
  "/update-operts",
  (req, res, next) => {
    res.required_privilege = "factors_management_update_operts";
    next();
  },
  authorizationMiddleWare,
  body("opertsData").custom((opertsData) => {
    console.log(opertsData);
  }),
  factorsController.updateOperts
);

Router.patch(
  "/update-doctors",
  (req, res, next) => {
    res.required_privilege = "factors_management_update_doctors";
    next();
  },
  authorizationMiddleWare,
  body("doctorsData").custom((doctorsData) => {
    console.log(doctorsData);
  }),
  factorsController.updateDoctors
);

Router.delete(
  "/delete-operts",
  (req, res, next) => {
    res.required_privilege = "factors_management_delete_operts";
    next();
  },
  authorizationMiddleWare,
  body("opertsData").custom((opertsData) => {
    console.log(opertsData);
  }),
  factorsController.updateOperts
);

Router.delete(
  "/delete-doctors",
  (req, res, next) => {
    res.required_privilege = "factors_management_delete_doctors";
    next();
  },
  authorizationMiddleWare,
  body("doctorsData").custom((doctorsData) => {
    console.log(doctorsData);
  }),
  factorsController.updateDoctors
);

module.exports = Router;
