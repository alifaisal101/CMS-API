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
  Numb: {
    ...numbProp,
    unique: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SenderDoctor",
    required: true,
  },
  fullname: stringProp,
  sex: {
    type: Boolean, //0=male 1=female
    required: true,
  },
  age: stringProp,
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
  selectDiscountPres: numbProp,
  created_at: dateProp,
  updated_at: dateProp,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
