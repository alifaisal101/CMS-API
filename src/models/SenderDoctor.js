const mongoose = require("mongoose");

const senderDocScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("SenderDoctor", senderDocScheme);
