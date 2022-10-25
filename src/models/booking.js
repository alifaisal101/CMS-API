const mongoose = require("mongoose");

const stringProp = {
  type: String,
  required: true,
};

const numbProp = {
  type: Number,
  required: true,
};

const dateProp = {
  type: Date,
  required: true,
};

const bookingScheme = new mongoose.Schema({
  fullname: stringProp,
  bookingIndex: {
    type: Number,
    required: true,
  },
  gender: stringProp,
  age: {
    years: numbProp,
    months: { required: false, type: Number },
  },
  discountPres: numbProp,

  desc: {
    type: String,
    required: false,
  },
  cost: { type: Number, required: false },
  prepaid: { type: Boolean, required: true },
  state: stringProp,
  appointmentDate: dateProp,
  created_at: dateProp,
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SenderDoctor",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingScheme);
