const express = require("express");
const { body } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

const dataType = require("../util/data-type");
const mongoIdsValidator = require("../util/mongoIds-validator")

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
  body("operts").custom((operts) => {
    if(!operts){throw err;}
    if(operts.length < 1){throw err}
    
    operts.map(opert => {
        if(ObjectId.isValid(opert._id)){throw err;}
        if (dataType(opert.name) !== "string"){throw err;}
    })
    
    return true;
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
  body("doctors").custom((doctors) => {
    if(!doctors){throw err;}
    if(doctors.length < 1){throw err}
    
    doctors.map(doctor => {
        if(ObjectId.isValid(doctor._id)){throw err;}
        if (dataType(doctor.name) !== "string"){throw err;}
    })
    
    return true;
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
body("opertIds").custom((opertIds) => {
     if(!mongoIdsValidator(opertIds)){
         throw err;
     }
     return true;
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
  body("doctorIds").custom((doctorIds) => {
     if(!mongoIdsValidator(doctorIds)){
         throw err;
     }
     return true;
  }),
  factorsController.updateDoctors
);

module.exports = Router;
