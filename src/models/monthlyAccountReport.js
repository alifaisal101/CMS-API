const mongoose = require("mongoose");

const stringProp = {
  type: String,
  required: true,
};
const numbProp = {
  type: number,
  required: true,
};
const dateProp = {
  type: Date,
  required: true,
};

const logScheme = new mongoose.Schema({
  operationEarnings: {
    type: number,
    required: false,
  },
  labEarnings: {
    type: number,
    required: false,
  },
  laserEarnings: {
    type: number,
    required: false,
  },
  insurenceEarnings: {
    type: number,
    required: false,
  },
  companiesNdProvidersExpenses: [
    {
      case: stringProp,
      cost: numbProp,
    },
  ],
  totalExpenses: [
    {
      case: stringProp,
      cost: numbProp,
    },
  ],

  envoysExpenses: [
    {
      envoy: stringProp,
      cost: numbProp,
    },
  ],

  checkersExpenses: [
    {
      checkerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Checker",
        required: true,
      },
      checkerName: stringProp,
      quantity: numbProp,
      cost: numbProp,
    },
  ],
  opertExpenses: [
    {
      opertId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Opert",
        required: true,
      },
      opertName: stringProp,
      quantity: numbProp,
      cost: numbProp,
    },
  ],
  checksEarnings: [
    {
      checkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Check",
        required: true,
      },
      checkName: stringProp,
      quantity: numbProp,
      earnings: numbProp,
    },
  ],
  requests: {
    newSenderDoctors: numbProp,
    registerdSenderDoctors: numbProp,
    outpatients: numbProp,
    free: numbProp,
  },
  employeesSalaries: [
    {
      name: stringProp,
      role: stringProp,
      salary: numbProp,
    },
  ],
  month: numbProp,

  loans: [
    {
      case: stringProp,
      amount: numbProp,
      date: dateProp,
    },
  ],
  totalEarnings: numbProp,
  totalExpenses: numbProp,

  desc: {
    type: String,
    required: false,
  },
  created_at: dateProp,
  locked: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("Opert", logScheme);
