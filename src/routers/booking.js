const express = require("express");
var ObjectId = require("mongoose").Types.ObjectId;
const { body } = require("express-validator");

const dataType = require("./../util/data-type");

const bookingController = require("./../controllers/booking.js");

const loggingMiddleWare = require("./../middlewares/action-logger");
const authorizationMiddleWare = require("./../middlewares/authorization");

const Router = express();

const action = "booking";

const err = new Error();
err.statusCode = 422;

Router.get(
  "/pull-bookings",
  (req, res, next) => {
    res.required_privilege = "view_bookings";
    next();
  },
  authorizationMiddleWare,
  (req, res, next) => {
    const loggingMessage = "سحب بيانات الحجز";
    loggingMiddleWare(req, res, next, action, loggingMessage);
  },
  bookingController.pullBookings
);

Router.put(
  "/add-booking",
  (req, res, next) => {
    res.required_privilege = "register_bookings";
    next();
  },
  authorizationMiddleWare,

  body("fullname").isAlpha("ar-IQ", { ignore: " " }),
  body("phoneNumb").isLength({ min: 4, max: 32 }),
  body("bookingIndex").isDecimal(),
  body("gender").isAlpha("ar-IQ", { ignore: " " }),
  body("age").custom((ageObj) => {
    if (dataType(ageObj) !== "object") {
      throw err;
    }
    if (dataType(ageObj.years) !== "number") {
      throw err;
    }
    if (dataType(ageObj.months) !== "number" && ageObj.months) {
      throw err;
    }

    return true;
  }),
  body("discountPres").isNumeric().optional({ nullable: true }),
  body("desc").isLength({ min: 1, max: 4000 }).optional({ nullable: true }),
  body("cost").isNumeric().optional({ nullable: true }),
  body("prepaid").isBoolean().optional({ nullable: true }),
  body("state").isAlpha("ar-IQ", { ignore: " " }),
  //body("appointmentDate").isDate(),
  body("senderId").isMongoId().optional({ nullable: true }),

  (req, res, next) => {
    const loggingMessage = "تسجيل حجز";
    loggingMiddleWare(req, res, next, action, loggingMessage);
  },
  bookingController.addBooking
);

Router.patch(
  "/update-booking",
  (req, res, next) => {
    res.required_privilege = "update_bookings";
    next();
  },
  authorizationMiddleWare,

  body("bookingId").isMongoId(),
  body("fullname")
    .isAlpha("ar-IQ", { ignore: " " })
    .optional({ nullable: true }),
  body("gender").isAlpha("ar-IQ", { ignore: " " }).optional({ nullable: true }),
  body("age")
    .custom((ageObj) => {
      if (dataType(ageObj) !== "object" && ageObj) {
        throw err;
      }
      if (dataType(ageObj.years) !== "number" && ageObj.years) {
        throw err;
      }
      if (dataType(ageObj.months) !== "number" && ageObj.months) {
        throw err;
      }

      return true;
    })
    .optional({ nullable: true }),
  body("discountPres").isNumeric().optional({ nullable: true }),
  body("desc").isLength({ min: 1, max: 4000 }).optional({ nullable: true }),
  body("cost").isNumeric().optional({ nullable: true }),
  body("state").isAlpha("ar-IQ", { ignore: " " }).optional({ nullable: true }),
  //body("appointmentDate").isDate().optional({ nullable: true }),
  body("senderId").isMongoId().optional({ nullable: true }),

  (req, res, next) => {
    const loggingMessage = "تحديث بيناتات حجز";
    loggingMiddleWare(req, res, next, action, loggingMessage);
  },
  bookingController.updateBooking
);

Router.patch(
  "/update-booking-indexes",
  (req, res, next) => {
    res.required_privilege = "update_bookings_indexs";
    next();
  },
  authorizationMiddleWare,

  body("bookingIndexes").custom((bookingIndexes) => {
    if (dataType(bookingIndexes) !== "array") {
      throw err;
    }
    if (bookingIndexes.length < 1) {
      throw err;
    }

    let indexesOnly = [];
    let _id_s = [];

    bookingIndexes.map((bookingIndexObj) => {
      if (dataType(bookingIndexObj) !== "object") {
        throw err;
      }

      const { _id, bookingIndex } = bookingIndexObj;

      if (dataType(bookingIndex) !== "number") {
        throw err;
      }

      if (!ObjectId.isValid(_id)) {
        throw err;
      }

      if (indexesOnly.includes(bookingIndex)) {
        throw err;
      }
      indexesOnly.push(bookingIndex);

      if (_id_s.includes(_id)) {
        throw err;
      }
      _id_s.push(_id);
    });

    return true;
  }),

  (req, res, next) => {
    const loggingMessage = "تحديث تسلسل الحجز";
    loggingMiddleWare(req, res, next, action, loggingMessage);
  },
  bookingController.updateBookingIndexes
);

Router.delete(
  "/delete-booking",
  (req, res, next) => {
    res.required_privilege = "delete_bookings";
    next();
  },
  authorizationMiddleWare,
  body("bookingId").isMongoId(),

  (req, res, next) => {
    const loggingMessage = "حذف حجز";
    loggingMiddleWare(req, res, next, action, loggingMessage);
  },
  bookingController.deleteBooking
);

module.exports = Router;
