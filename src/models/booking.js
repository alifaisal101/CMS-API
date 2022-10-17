const mongoose = require("mongoose");

const stringProp = {
  type: String,
  required: true,
};

const dateProp = {
  type: Date,
  required: true,
};

const bookingScheme = new mongoose.Schema({
  name: stringProp,
  bookingIndex: {
    type: Number,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: false,
  },
  cost: { type: Number, required: false },
  prepaid: { type: Boolean, required: false },
  state: stringProp,
  appointment: dateProp,
  created_at: dateProp,
});

module.exports = mongoose.model("Booking", bookingScheme);
