const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
