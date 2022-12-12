const { validationResult } = require("express-validator");

const { idsQuery, startEndValueQuery } = require("./../util/query");

const Patient = require("./../models/patient");
const SenderDoctor = require("./../models/SenderDoctor");
const Check = require("./../models/check");
const Checker = require("./../models/doctor");
const Opert = require("./../models/opert");

exports.pullPatients = async (req, res, next) => {
  const validationResult_errors = validationResult(req);

  const validation_err = new Error();
  validation_err.statusCode = 422;
  validation_err.message = "Invalid Request";

  if (!validationResult_errors.isEmpty()) {
    console.log(validationResult_errors);
    return next(validation_err);
  }

  const page = req.body.page ? req.body.page : 1;
  const pagnation = req.body.pagnation === true;
  const PATIENTS_PER_PAGE = 2;

  const patientsLimit = pagnation ? PATIENTS_PER_PAGE : 0;
  const patientsSkip = pagnation ? (page - 1) * PATIENTS_PER_PAGE : 0;

  const filterOptions = [];
  try {
    if (req.body.startSequence) {
      filterOptions.push(
        startEndValueQuery(
          req.body.startSequence,
          req.body.endSequence,
          req.body.sequenceSearchType,
          "sequence"
        )
      );
    }

    if (req.body.fullnames) {
      const filterOption_fullnames = [];
      req.body.fullnames.map((fullname) => {
        filterOption_fullnames.push({ fullname: { $eq: fullname } });
      });

      filterOptions.push({ $or: filterOption_fullnames });
    }

    if (req.body.startAge) {
      filterOptions.push(
        startEndValueQuery(
          req.body.startAge,
          req.body.endAge,
          req.body.ageSearchType,
          "age.years"
        )
      );
    }

    if (req.body.gender) {
      filterOptions.push({ gender: { $eq: req.body.gender } });
    }

    if (req.body.startTotalcost) {
      filterOptions.push(
        startEndValueQuery(
          req.body.startTotalcost,
          req.body.endTotalcost,
          req.body.totalCostSearchType,
          "totalcost"
        )
      );
    }

    if (req.body.startDate) {
      filterOptions.push(
        startEndValueQuery(
          req.body.startDate,
          req.body.endDate,
          req.body.dateSearchType,
          "created_at"
        )
      );
    }

    if (req.body.discountPresOptions) {
      let compValue = req.body.discountPresOptions;
      if (compValue === "free") {
        compValue = 100;
      }
      filterOptions.push({ totalcost: { $gte: compValue } });
    }

    if (req.body.checkIds) {
      filterOptions.push({
        $or: idsQuery(req.body.checkIds, "checks.checkId"),
      });
    }
    if (req.body.userIds) {
      filterOptions.push({
        $or: idsQuery(req.body.userIds, "userId"),
      });
    }
    if (req.body.senderIds) {
      filterOptions.push({
        $or: idsQuery(req.body.senderIds, "senderId"),
      });
    }
    if (req.body.opertIds) {
      filterOptions.push({
        $or: idsQuery(req.body.opertIds, "checks.opertId"),
      });
    }
    if (req.body.checkerIds) {
      filterOptions.push({
        $or: idsQuery(req.body.checkerIds, "checks.checkerId"),
      });
    }
    if (req.body.updated) {
      filterOptions.push({
        updated_at: { $exists: true },
      });
    }

    const query = {};
    if (filterOptions.length > 0) {
      if (req.body.and) {
        query["$and"] = filterOptions;
      } else {
        query["$or"] = filterOptions;
      }
    }
    console.log(query);

    const result = await Patient.find(query)
      .skip(patientsSkip)
      .limit(patientsLimit);
    res.status(200).json({ message: "Patients Results.", result });
  } catch (err) {
    return next(err);
  }
};

exports.deletePatients = (req, res, next) => {
  const validationResult_errors = validationResult(req);

  const validation_err = new Error();
  validation_err.statusCode = 422;
  validation_err.message = "Invalid Request";

  if (!validationResult_errors.isEmpty()) {
    return next(validation_err);
  }

  const patientIDs = req.body.patientIDs;
  const results = [];

  patientIDs.map(async (patientId) => {
    try {
      const patientDeleteResult = await Patient.findByIdAndDelete(patientId);
      results.push(patientDeleteResult);
    } catch (err) {
      return next(err);
    }
  });

  res.status(200).json({
    message: "Patients were removed successfully.",
    results,
  });
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

exports.updatePatient = async (req, res, next) => {
  const validationResult_errors = validationResult(req);

  const validation_err = new Error();
  validation_err.statusCode = 422;
  validation_err.message = "Invalid Request";

  if (!validationResult_errors.isEmpty()) {
    return next(validation_err);
  }

  try {
    const patientDataFromDB = await Patient.findById(req.body.patientId);
    if (!patientDataFromDB) {
      return next(validation_err);
    }

    let senderId = null;
    if (req.body.senderId) {
      senderId = await SenderDoctor.findById(req.body.senderId, { _id: 1 });
      if (!senderId) {
        return next(validation_err);
      }
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
      senderId: senderId ? senderId : patientDataFromDB.senderId,
      fullname: req.body.fullname ? req.body.fullname : patientDataFromDB,
      gender: req.body.gender ? req.body.gender : patientDataFromDB.gender,
      age: req.body.age ? req.body.age : patientDataFromDB.age,
      checks: req.body.checks ? req.body.checks : patientDataFromDB.checks,
      totalcost: req.body.totalcost
        ? req.body.totalcost
        : patientDataFromDB.totalcost,
      desc: req.body.desc ? req.body.desc : patientDataFromDB.desc,
      state: req.body.state ? req.body.state : patientDataFromDB.state,
      discountPres: req.body.discountPres
        ? req.body.discountPres
        : patientDataFromDB.discountPres,
      bookingInfo: req.body.bookingInfo
        ? req.body.bookingInfo
        : patientDataFromDB.bookingInfo,
      updated_at: new Date(),
    };

    const registerPatientResult = await Patient.create(patientData);
    return res.status(201).json({
      message: "Patient was updated successfully.",
      result: registerPatientResult,
    });
  } catch (err) {
    next(err);
  }
};
