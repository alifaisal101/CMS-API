const { validationResult } = require("express-validator");

const SenderDoctor = require("./../models/SenderDoctor");
const Booking = require("./../models/booking");

exports.pullBookings = (req, res, next) => {
  return Booking.find()
    .then((result) => {
      res.status(200).json({ bookings: result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.addBooking = (req, res, next) => {
  const validationResult_errors = validationResult(req);

  const validation_err = new Error();
  validation_err.statusCode = 422;
  validation_err.message = "Invalid Request";

  if (!validationResult_errors.isEmpty()) {
    return next(validation_err);
  }

  return Booking.findOne({ bookingIndex: req.body.bookingIndex })
    .then(async (matchingIndexResults) => {
      if (matchingIndexResults) {
        return next(validation_err);
      }

      let senderId;
      let patientIsOP = true;
      if (req.body.senderId) {
        const senderDoctor = await SenderDoctor.findById(req.body.senderId, {
          _id: 1,
        });
        if (senderDoctor) {
          senderId = senderDoctor._id;
          patientIsOP = false;
        }
      }
      if (patientIsOP) {
        const OP = await SenderDoctor.findOne(
          { name: "op" },
          {
            _id: 1,
          }
        );
        senderId = OP._id;
      }

      const bookingData = {
        fullname: req.body.fullname,
        phoneNumb: req.body.phoneNumb,
        bookingIndex: req.body.bookingIndex,
        gender: req.body.gender,
        age: req.body.age,
        discountPres: req.body.discountPres ? req.body.discountPres : 0,
        desc: req.body.desc ? req.body.desc : "",
        cost: req.body.cost ? req.body.cost : null,
        prepaid: req.body.prepaid ? req.body.prepaid : false,
        state: req.body.state ? req.body.state : "غير مثبت",
        appointmentDate: new Date(), // req.body.appointmentDate
        created_at: new Date(),
        senderId: senderId,
        userId: res.userData.userId,
      };

      if (!bookingData.cost) {
        delete bookingData.cost;
      }

      Booking.create(bookingData)
        .then((result) => {
          res.status(201).json({
            booking: result,
            message: "Booking was created successfully.",
          });
        })
        .catch((err) => {
          return next(err);
        });
    })
    .catch((err) => {
      return next(err);
    });
};

exports.updateBooking = (req, res, next) => {
  const validationResult_errors = validationResult(req);

  const validation_err = new Error();
  validation_err.statusCode = 422;
  validation_err.message = "Invalid Request";

  if (!validationResult_errors.isEmpty()) {
    return next(validation_err);
  }

  return Booking.findById(req.body.bookingId)
    .then(async (updatingBookingData) => {
      if (!updatingBookingData) {
        return next(validation_err);
      }
      if (req.body.senderId) {
        try {
          const senderDoctor = await SenderDoctor.findById(req.body.senderId, {
            _id: 1,
          });
          if (!senderDoctor) {
            return next(validation_err);
          }
        } catch (err) {
          return next(err);
        }
      }

      const bookingData = {
        fullname: req.body.fullname
          ? req.body.fullname
          : updatingBookingData.fullname,

        gender: req.body.gender ? req.body.gender : updatingBookingData.gender,
        age: req.body.age ? req.body.age : updatingBookingData.age,
        discountPres: req.body.discountPres
          ? req.body.discountPres
          : updatingBookingData.discountPres,

        desc: req.body.desc ? req.body.desc : updatingBookingData.desc,
        state: req.body.state ? req.body.state : updatingBookingData.state,
        // req.body.appotimentdate
        appointmentDate: new Date()
          ? new Date()
          : updatingBookingData.appointmentDate,
        senderId: req.body.senderId
          ? req.body.senderId
          : updatingBookingData.senderId,
      };
      if (req.body.cost) {
        bookingData.cost = req.body.cost;
      }
      try {
        const updatingResult = await Booking.updateOne(
          { _id: updatingBookingData._id },
          bookingData
        );

        return res.status(201).json({
          message: "Booking was updated successfully.",
          result: updatingResult,
        });
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateBookingIndexes = (req, res, next) => {
  const validationResult_errors = validationResult(req);

  const validation_err = new Error();
  validation_err.statusCode = 422;
  validation_err.message = "Invalid Request";

  if (!validationResult_errors.isEmpty()) {
    return next(validation_err);
  }

  return Booking.find({}, { _id: 1 })
    .then(async (result) => {
      if (req.body.bookingIndexes.length !== result.length) {
        return next(validation_err);
      }
      req.body.bookingIndexes.map(async (bookingIndexObj) => {
        const { _id, bookingIndex } = bookingIndexObj;

        try {
          await Booking.findByIdAndUpdate(_id, { $set: { bookingIndex } });
        } catch (err) {
          return next(err);
        }

        const updatedIndexes = await Booking.find(
          {},
          { _id: 1, bookingIndex: 1 }
        );
        return res.status(201).json({
          result: updatedIndexes,
          message: "Indexes were updated successfully",
        });
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteBooking = (req, res, next) => {
  const validationResult_errors = validationResult(req);

  const validation_err = new Error();
  validation_err.statusCode = 422;
  validation_err.message = "Invalid Request";

  if (!validationResult_errors.isEmpty()) {
    return next(validation_err);
  }

  return Booking.findByIdAndDelete(req.body.bookingId)
    .then((result) => {
      if (result) {
        res.status(200).json({ message: "Booking was deleted successfully." });
      } else {
        res.status(404).json({ message: "Invalid Id. No Booking was found." });
      }
    })
    .catch((err) => {
      next(err);
    });
};
