const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, required: true,  },
  role: { type: String, default: "Admin" },
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
