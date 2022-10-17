const express = require("express");
const { body } = require("express-validator");

const bookingController = require("./../controllers/booking.js");

const authorizationMiddleWare = require("./../middlewares/authorization");

const Router = express();

Router.get(
  "/pull-bookings",
  (req, res, next) => {
    res.required_privilege = "view_bookings";
    next();
  },
  authorizationMiddleWare,
  bookingController.pullBookings
);

Router.put(
  "/add-booking",
  (req, res, next) => {
    res.required_privilege = "register_bookings";
    next();
  },
  authorizationMiddleWare,

  body("bookingData").custom((bookingData) => {
    console.log(bookingData);
  }),
  bookingController.addBooking
);

Router.patch(
  "/update-booking",
  (req, res, next) => {
    res.required_privilege = "update_bookings";
    next();
  },
  authorizationMiddleWare,

  body("bookingData").custom((bookingData) => {
    console.log(bookingData);
  }),
  bookingController.updateBooking
);

Router.delete(
  "/delete-booking",
  (req, res, next) => {
    res.required_privilege = "delete_bookings";
    next();
  },
  authorizationMiddleWare,
  body("id").custom((id) => {
    console.log(id);
  }),
  bookingController.deleteBooking
);

module.exports = Router;
