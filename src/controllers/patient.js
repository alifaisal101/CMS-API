const Patient = require("./../models/patient");

const { validationResult } = require("express-validator");

exports.pullPatients = (req, res, next) => {
  const validationResult_errors = validationResult(req);

  const validation_err = new Error();
  validation_err.httpStatusCode = 422;
  validation_err.message = "Invalid Request";

  if (!validationResult_errors.isEmpty()) {
    return next(validation_err);
  }

  const page = req.body.page ? req.body.page : 1;
  const searchOptions = {};

  // searchOptions.sequence = req.body.sequence ? req.body.sequence : null;
  // searchOptions.fullname = req.body.fullname ? req.body.fullname : null;
  // searchOptions.gender = req.body.gender ? req.body.gender : null;
  // searchOptions.age = req.body.age ? req.body.age : null;
  // searchOptions.totalcost = req.body.totalcost ? req.body.totalcost : null;
  // searchOptions.discountPres = req.body.discountPres
  //   ? req.body.discountPres
  //   : null;
  // searchOptions.userId = req.body.userId ? req.body.userId : null;
  // searchOptions.check = req.body.check ? req.body.check : null;
  // searchOptions.senderId = req.body.senderId ? req.body.senderId : null;
  // searchOptions.opertId = req.body.opertId ? req.body.opertId : null;
  // searchOptions.checkerId = req.body.checkerId ? req.body.checkerId : null;

  console.log(312);
  Patient.find()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.deletePatients = (req, res, next) => {
  console.log("delete patients");
};

exports.registerPatient = (req, res, next) => {
  console.log("register patient");
};

exports.updatePatient = (req, res, next) => {
  console.log("update patient");
};
