const mongoose = require("mongoose");

const SalesScheme = mongoose.Schema(
  {
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },
    amount: { type: "Number", required: true },
    quantity: {type: "Number", default: 0 },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: "Date", required: true },
  },
  { timestamps: true }
);

const Sales = mongoose.model("Sales", SalesScheme);
module.exports = Sales;
