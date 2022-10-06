const express = require("express");
const { body } = require("express-validator");

const senderDoctorsController = require("./../../controllers/admin/sender-doctors");

const Router = express.Router();

Router.post(
  "/pull-sender-doctors",
  body("searchOptions").custom((searchOptions) => {
    console.log(searchOptions);
  }),
  senderDoctorsController.pullSenderDoctors
);

Router.put(
  "/add-sender-doctor",
  body("senderDoctorData").custom((senderDoctorData) => {
    console.log(senderDoctorData);
  }),
  senderDoctorsController.addSenderDoctor
);

Router.patch(
  "/edit-sender-doctor",
  body("senderDoctorData").custom((senderDoctorData) => {
    console.log(senderDoctorData);
  }),
  senderDoctorsController.editSenderDoctor
);

Router.delete(
  "/delete-sender-doctor",
  body("id").isMongoId(),
  senderDoctorsController.deleteSenderDoctor
);

module.exports = Router;
