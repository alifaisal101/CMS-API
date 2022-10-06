const mongoose = require("mongoose");

const logScheme = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Opert", logScheme);
