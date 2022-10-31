const mongoose = require("mongoose");

const stringProp = {
  type: String,
  required: true,
};

const checkScheme = new mongoose.Schema({
  name: stringProp,
  types: [
    {
      type: String,
      required: true,
    },
  ],
  created_at: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("Check", checkScheme);
