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
  privileges: [stringProps],
  password: stringProps,
});

module.exports = mongoose.model("User", userSchema);
