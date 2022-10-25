const mongoose = require("mongoose");

const logScheme = new mongoose.Schema({
  actionType: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Log", logScheme);
