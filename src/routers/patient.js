const express = require("express");
const { body } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

const authorizationMiddleWare = require("./../middlewares/authorization");

const loggingMiddleWare = require("./../middlewares/action-logger");
const paitentController = require("./../controllers/patient");
const dataType = require("../util/data-type");
const mongoIdsValidator = require("../util/mongoIds-validator");

const Router = express.Router();

const action = "patient";
const pullPatients_SEARCHTYPES = ["$gte", "$lte", "between", "$eq"];

const ageObj_validator = (update, ageObj) => {
  if (dataType(ageObj) !== "object") {
    return false;
  }
  if (!update) {
    if (dataType(ageObj.years) !== "number") {
      return false;
    }
  } else {
    if (dataType(ageObj.years) !== "number" && ageObj.years) {
      return false;
    }
  }

  if (dataType(ageObj.months) !== "number" && ageObj.months) {
    return false;
  }
  if (dataType(ageObj.weeks) !== "number" && ageObj.weeks) {
    return false;
  }
  if (dataType(ageObj.days) !== "number" && ageObj.days) {
    return false;
  }
};

const err = new Error();
err.statusCode = 422;

Router.post(
  "/pull-patients",
  (req, res, next) => {
    res.required_privilege = "view_patients";
    next();
  },
  authorizationMiddleWare,

  body("and").isBoolean(),
  body("page").isDecimal().optional({ nullable: true }),
  body("pagnation").isBoolean().optional({ nullable: true }),

  body("dateSearchType")
    .custom((dateSearchType) => {
      if (!pullPatients_SEARCHTYPES.includes(dateSearchType)) {
        throw err;
      }
      return true;
    })
    .optional({ nullable: true }),
  body("startDate").isDate().optional({ nullable: true }),
  body("endDate").isDate().optional({ nullable: true }),

  body("sequenceSearchType")
    .custom((sequenceSearchType) => {
      if (!pullPatients_SEARCHTYPES.includes(sequenceSearchType)) {
        throw err;
      }
      return true;
    })
    .optional({ nullable: true }),
  body("startSequence").isDecimal().optional({ nullable: true }),
  body("endSequence").isDecimal().optional({ nullable: true }),

  body("fullnames")
    .custom((fullnames) => {
      if (dataType(fullnames) !== "array") {
        throw err;
      }

      if (fullnames.length < 1) {
        throw err;
      }

      fullnames.map((fullname) => {
        if (dataType(fullname) !== "string") {
          throw err;
        }
      });
      return true;
    })
    .optional({ nullable: true }),

  body("ageSearchType")
    .custom((ageSearchType) => {
      if (!pullPatients_SEARCHTYPES.includes(ageSearchType)) {
        throw err;
      }
    })
    .optional({ nullable: true }),
  body("startAge").isNumeric().optional({ nullable: true }),
  body("endAge").isNumeric().optional({ nullable: true }),

  body("gender").isAlpha("ar-IQ", { ignore: " " }).optional({ nullable: true }),

  body("totalCostSearchType")
    .custom((totalCostSearchType) => {
      if (!pullPatients_SEARCHTYPES.includes(totalCostSearchType)) {
        throw err;
      }
    })
    .optional({ nullable: true }),
  body("startTotalcost").isNumeric().optional({ nullable: true }),
  body("endTotalcost").isNumeric().optional({ nullable: true }),

  body("discountPresOptions")
    .custom((discountPresOptions) => {
      const discountPresOptions_select = [25, 50, 75, "free"];
      discountPresOptions.map((discountPresOption) => {
        if (!discountPresOptions_select.includes(discountPresOption)) {
          throw err;
        }
      });
    })
    .optional({ nullable: true }),
  body("checkIds")
    .custom((checksIds) => {
      if (!mongoIdsValidator(checksIds)) {
        throw err;
      }
      return true;
    })
    .optional({ nullable: true }),
  body("userIds")
    .custom((userIds) => {
      if (!mongoIdsValidator(userIds)) {
        throw err;
      }
      return true;
    })
    .optional({ nullable: true }),
  body("senderIds")
    .custom((senderIds) => {
      if (!mongoIdsValidator(senderIds)) {
        throw err;
      }
      return true;
    })
    .optional({ nullable: true }),
  body("opertIds")
    .custom((opertsId) => {
      if (!mongoIdsValidator(opertsId)) {
        throw err;
      }
      return true;
    })
    .optional({ nullable: true }),
  body("checkerIds")
    .custom((checkerIds) => {
      if (!mongoIdsValidator(checkerIds)) {
        throw err;
      }
      return true;
    })
    .optional({ nullable: true }),

  body("updated").isBoolean().optional({ nullable: true }),
  (req, res, next) => {
    const loggingMessage = "سحب بيانات المراجعين";
    loggingMiddleWare(req, res, next, action, loggingMessage);
  },
  paitentController.pullPatients
);

Router.delete(
  "/delete-patients",
  (req, res, next) => {
    res.required_privilege = "delete_patients";
    next();
  },
  authorizationMiddleWare,

  body("patientsIDs").custom((patientsIDs) => {
    if (dataType(patientsIDs) !== "array") {
      throw err;
    }
    if (patientsIDs.length < 1) {
      throw err;
    }
    patientsIDs.map((patientId) => {
      if (!ObjectId.isValid(patientId)) {
        throw err;
      }
    });
  }),

  (req, res, next) => {
    const loggingMessage = "حذف مراجعين";
    loggingMiddleWare(req, res, next, action, loggingMessage);
  },
  paitentController.deletePatients
);

Router.put(
  "/register-patient",
  (req, res, next) => {
    res.required_privilege = "register_patients";
    next();
  },
  authorizationMiddleWare,

  body("sequence").isDecimal(),
  body("senderId").isMongoId().optional({ nullable: true }),
  body("fullname").isAlpha("ar-IQ", { ignore: " " }),
  body("gender").isAlpha("ar-IQ", { ignore: " " }),
  body("age").custom((ageObj) => {
    if (!ageObj_validator(false, ageObj)) {
      throw err;
    }
    return true;
  }),

  body("checks").custom((checks) => {
    if (dataType(checks) !== "array") {
      throw err;
    }
    if (checks.length < 1) {
      throw err;
    }

    checks.map((check) => {
      if (dataType(check) !== "object") {
        throw err;
      }
      const { checkId, checkTypeNumber, cost, checkerId, opertId } = check;
      if (
        dataType(checkTypeNumber) !== "number" ||
        dataType(cost) !== "number"
      ) {
        throw err;
      }

      if (!ObjectId.isValid(checkId)) {
        throw err;
      }

      if (!ObjectId.isValid(checkerId) && checkerId) {
        throw err;
      }

      if (!ObjectId.isValid(opertId) && opertId) {
        throw err;
      }
    });

    return true;
  }),
  body("totalcost").isNumeric(),
  body("desc").isLength({ min: 1, max: 4000 }).optional({ nullable: true }),
  body("state").isAlpha("ar-IQ", { ignore: " " }),
  body("discountPres").isNumeric(),
  body("bookingInfo").custom((bookingInfo) => {
    if (dataType(bookingInfo) === "undefined") {
      return true;
    }

    if (dataType(bookingInfo) !== "object") {
      throw err;
    }

    if (dataType(bookingInfo.phoneNumb) !== "string" && bookingInfo.phoneNumb) {
      throw err;
    }

    if (
      dataType(bookingInfo.appointmentDate) !== "date" &&
      bookingInfo.appointmentDate
    ) {
      throw err;
    }

    if (dataType(bookingInfo.prepaid) !== "boolean" && bookingInfo.prepaid) {
      throw err;
    }

    return true;
  }),

  (req, res, next) => {
    const loggingMessage = "تسجيل مراجع";
    loggingMiddleWare(req, res, next, action, loggingMessage);
  },
  paitentController.registerPatient
);

Router.patch(
  "/update-patient",
  (req, res, next) => {
    res.required_privilege = "update_patients";
    next();
  },
  authorizationMiddleWare,

  body("patientId").isMongoId(),
  body("senderId").isMongoId().optional({ nullable: true }),
  body("fullname")
    .isAlpha("ar-IQ", { ignore: " " })
    .optional({ nullable: true }),
  body("gender").isAlpha("ar-IQ", { ignore: " " }).optional({ nullable: true }),
  body("age")
    .custom((ageObj) => {
      if (!ageObj_validator(true, ageObj)) {
        throw err;
      }
      return true;
    })
    .optional({ nullable: true }),

  body("checks")
    .custom((checks) => {
      if (dataType(checks) !== "array") {
        throw err;
      }
      if (checks.length < 1) {
        throw err;
      }

      checks.map((check) => {
        if (dataType(check) !== "object") {
          throw err;
        }
        const { checkId, checkTypeNumber, cost, checkerId, opertId } = check;
        if (
          dataType(checkTypeNumber) !== "number" ||
          dataType(cost) !== "number"
        ) {
          throw err;
        }

        if (!ObjectId.isValid(checkId)) {
          throw err;
        }

        if (!ObjectId.isValid(checkerId) && checkerId) {
          throw err;
        }

        if (!ObjectId.isValid(opertId) && opertId) {
          throw err;
        }
      });

      return true;
    })
    .optional({ nullable: true }),
  body("totalcost").isNumeric().optional({ nullable: true }),
  body("desc").isLength({ min: 1, max: 4000 }).optional({ nullable: true }),
  body("state").isAlpha("ar-IQ", { ignore: " " }).optional({ nullable: true }),
  body("discountPres").isNumeric().optional({ nullable: true }),
  body("bookingInfo")
    .custom((bookingInfo) => {
      if (dataType(bookingInfo) === "undefined") {
        return true;
      }

      if (dataType(bookingInfo) !== "object") {
        throw err;
      }

      if (
        dataType(bookingInfo.phoneNumb) !== "string" &&
        bookingInfo.phoneNumb
      ) {
        throw err;
      }

      if (
        dataType(bookingInfo.appointmentDate) !== "date" &&
        bookingInfo.appointmentDate
      ) {
        throw err;
      }

      if (dataType(bookingInfo.prepaid) !== "boolean" && bookingInfo.prepaid) {
        throw err;
      }

      return true;
    })
    .optional({ nullable: true }),
  (req, res, next) => {
    const loggingMessage = "تحديث بيانات مراجع";
    loggingMiddleWare(req, res, next, action, loggingMessage);
  },
  paitentController.updatePatient
);

module.exports = Router;
