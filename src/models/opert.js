const mongoose = require("mongoose");

const opertScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Opert", opertScheme);
