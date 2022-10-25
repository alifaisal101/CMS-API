const mongoose = require("mongoose");

const specialValueScheme = new mongoose.Schema({
  type: {
    required: true,
    type: String,
    unique: true,
  },
  value: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("SpecialValue", specialValueScheme);
