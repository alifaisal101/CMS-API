const mongoose = require("mongoose");

const stringProp = {
  type: String,
  required: true,
};

const checkScheme = new mongoose.Schema({
  name: stringProp,
  types: [
    {
      type: stringProp,
      number: {
        type: Number,
        required: true,
      },
    },
  ],
  created_at: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Check", checkScheme);
