const { validationResult } = require("express-validator");

const Patient = require("./../models/patient");
const SenderDoctor = require("./../models/SenderDoctor");
const Check = require("./../models/check");
const Checker = require("./../models/checker");
const Opert = require("./../models/opert");

exports.pullPatients = (req, res, next) => {
  const validationResult_errors = validationResult(req);

  const validation_err = new Error();
  validation_err.statusCode = 422;
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
  // searchOptions.checkId = req.body.checkId ? req.body.checkId : null;
  // searchOptions.senderId = req.body.senderId ? req.body.senderId : null;
  // searchOptions.opertId = req.body.opertId ? req.body.opertId : null;
  // searchOptions.checkerId = req.body.checkerId ? req.body.checkerId : null;

  return Patient.find()
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

exports.registerPatient = async (req, res, next) => {
  const validationResult_errors = validationResult(req);

  const validation_err = new Error();
  validation_err.statusCode = 422;
  validation_err.message = "Invalid Request";

  if (!validationResult_errors.isEmpty()) {
    return next(validation_err);
  }

  try {
    const matchingSequencePatient = await Patient.findOne(
      { sequence: req.body.sequence },
      { _id: 1 }
    );
    if (matchingSequencePatient) {
      return next(validation_err);
    }

    let senderId;
    if (req.body.senderId) {
      senderId = await SenderDoctor.findById(req.body.senderId, { _id: 1 });
      if (!senderId) {
        return next(validation_err);
      }
    } else {
      senderId = await SenderDoctor.findOne({ name: "op" }, { _id: 1 });
    }

    req.body.checks.map(async (check) => {
      const { checkId, checkTypeNumber, checkerId, opertId } = check;
      const checkFromDB = await Check.findById(checkId, { _id: 1, types: 1 });
      if (!checkFromDB) {
        return next(validation_err);
      }

      if (checkerId) {
        const checkerFromDB = await Checker.findById(checkerId);
        if (!checkerFromDB) {
          return next(validation_err);
        }
      }

      if (opertId) {
        const opertFromDB = await Opert.findById(opertId);
        if (!opertFromDB) {
          return next(validation_err);
        }
      }

      let checkTypeIsValid = false;
      checkFromDB.types.map((typeObj) => {
        if (typeObj.number === checkTypeNumber) {
          checkTypeIsValid = true;
        }
      });

      if (!checkTypeIsValid) {
        return next(validation_err);
      }
    });

    const patientData = {
      sequence: req.body.sequence,
      senderId: senderId,
      fullname: req.body.fullname,
      gender: req.body.gender,
      age: req.body.age,
      checks: req.body.checks,
      totalcost: req.body.totalcost,
      desc: req.body.desc ? req.body.desc : "",
      state: req.body.state ? req.body.state : "غير محددة",
      discountPres: req.body.discountPres,
      created_at: new Date(),
      userId: res.userData.userId,
      bookingInfo: req.body.bookingInfo ? req.body.bookingInfo : null,
    };

    if (!patientData.bookingInfo) {
      delete patientData.bookingInfo;
    }

    const registerPatientResult = await Patient.create(patientData);
    return res.status(201).json({
      message: "Patient was registered successfully.",
      result: registerPatientResult,
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePatient = (req, res, next) => {
  console.log("update patient");
};
