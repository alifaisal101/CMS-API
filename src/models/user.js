const mongoose = require("mongoose");

const stringProps = {
  type: String,
  required: true,
};

const numbProps = {
  type: Number,
  required: true,
};

const userSchema = new mongoose.Schema({
  username: stringProps,
  type: numbProps,
  password: stringProps,
});

module.exports = mongoose.model("User", userSchema);
