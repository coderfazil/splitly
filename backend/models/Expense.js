const mongoose =require("mongoose");

const expenseSchema = new mongoose.Schema({
  expType: { type: String, enum: ["groups", "friends"], required: true }, // Type of expense (group or individual)
  expId: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID of group or friend
  desc: { type: String, required: true }, // Description of expense
  paidBy: { type: String, required: true }, // Who paid the expense
  date: {
    fullDate: { type: Date, required: true },
    day: { type: Number, required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true }
  },
  expCost: { type: Number, required: true }, // Total cost of the expense
  paid: { type: String, default: "equally" }, // Default is split equally
  moneyLent: { type: Number, required: true }, // Amount lent
 
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
