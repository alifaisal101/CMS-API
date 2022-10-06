const express = require("express");
const { body } = require("express-validator");

const factorsController = require("./../../controllers/admin/factors.admin");

const Router = express.Router();

Router.get("/pull-operts", factorsController.pullOperts);

Router.get("/pull-doctors", factorsController.pullDoctors);

Router.patch(
  "/update-operts",
  body("opertsData").custom((opertsData) => {
    console.log(opertsData);
  }),
  factorsController.updateOperts
);

Router.patch(
  "/update-doctors",
  body("doctorsData").custom((doctorsData) => {
    console.log(doctorsData);
  }),
  factorsController.updateDoctors
);

module.exports = Router;
