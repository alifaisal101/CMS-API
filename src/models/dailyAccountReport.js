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
  earnings: numbProp,
  purchaces: [
    {
      purchacedItem: stringProp,
      cost: numbProp,
    },
  ],
  specialOfficeExpenses: [
    {
      item: stringProp,
      cost: numbProp,
    },
  ],
  companiesNdProvidersExpenses: [
    {
      case: stringProp,
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
      checks: [
        {
          checkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Check",
            required: true,
          },
          quantity: numbProp,
          cost: numbProp,
        },
      ],
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

  desc: {
    type: String,
    required: false,
  },
  dayInWeek: stringProp,
  created_at: dateProp,
  locked: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("Opert", logScheme);
