const mongoose = require("mongoose");

const stringProp = {
  type: String,
  required: true,
};

const docterScheme = new mongoose.Schema({
  name: stringProp,
  qualification:stringProp,
  specialization: stringProp,
  created_at: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Docter", docterScheme);
