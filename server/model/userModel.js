const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 15,
  },
  fbEmail: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
