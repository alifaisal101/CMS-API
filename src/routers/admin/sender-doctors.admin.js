const express = require("express");
const { body } = require("express-validator");

const authorizationMiddleWare = require("../../middlewares/authorization");

const senderDoctorsController = require("./../../controllers/admin/sender-doctors");

const Router = express.Router();

Router.post(
  "/pull-sender-doctors",
  (req, res, next) => {
    res.required_privilege = "sender_doctors_management_pull_sender_doctors";
    next();
  },
  authorizationMiddleWare,
  body("searchOptions").custom((searchOptions) => {
    console.log(searchOptions);
  }),
  senderDoctorsController.pullSenderDoctors
);

Router.put(
  "/add-sender-doctor",
  (req, res, next) => {
    res.required_privilege = "sender_doctors_management_add_sender_doctor";
    next();
  },
  authorizationMiddleWare,
  body("senderDoctorData").custom((senderDoctorData) => {
    console.log(senderDoctorData);
  }),
  senderDoctorsController.addSenderDoctor
);

Router.patch(
  "/edit-sender-doctor",
  (req, res, next) => {
    res.required_privilege = "sender_doctors_management_edit_sender_doctor";
    next();
  },
  authorizationMiddleWare,
  body("senderDoctorData").custom((senderDoctorData) => {
    console.log(senderDoctorData);
  }),
  senderDoctorsController.editSenderDoctor
);

Router.delete(
  "/delete-sender-doctor",
  (req, res, next) => {
    res.required_privilege = "sender_doctors_management_delete_sender_doctor";
    next();
  },
  authorizationMiddleWare,
  body("id").isMongoId(),
  senderDoctorsController.deleteSenderDoctor
);

module.exports = Router;
