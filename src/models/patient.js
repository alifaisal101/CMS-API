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

const patientSchema = new mongoose.Schema({
  sequence: {
    ...numbProp,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SenderDoctor",
    required: true,
  },
  fullname: stringProp,
  gender: stringProp,
  age: {
    years: numbProp,
    months: { required: false, type: Number },
    weeks: { required: false, type: Number },
    days: { required: false, type: Number },
  },
  checks: [
    {
      checkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Check",
        required: true,
      },
      checkTypeNumber: numbProp,
      cost: numbProp,
      checkerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Checker",
        required: false,
      },
      opertId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Opert",
        required: false,
      },
    },
  ],
  totalcost: numbProp,
  desc: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  discountPres: numbProp,
  created_at: dateProp,
  updated_at: {
    type: Date,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookingInfo: {
    appointmentDate: {
      type: Date,
      required: false,
    },
    prepaid: {
      type: Boolean,
      required: false,
    },
    phoneNumb: {
      type: String,
      required: false,
    },
  },
});

module.exports = mongoose.model("Patient", patientSchema);
