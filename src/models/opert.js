const mongoose = require("mongoose");

const stringProp = {
  type: String,
  required: true,
};

const opertScheme = new mongoose.Schema({
  name: stringProp,
  qualification:stringProp,
  specialization: stringProp,
  created_at: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Opert", opertScheme);
