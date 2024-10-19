const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    cost: { type: "Number", required: true },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: "Date", required: true },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", ExpenseSchema);
module.exports = Expense;
