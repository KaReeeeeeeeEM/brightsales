const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    details: { type: String, required: true },
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", ActivitySchema);
module.exports = Activity;
