import mongoose, { Schema, models } from "mongoose";
const ExpenseSchema = new Schema(
  {
    date: { type: String, required: true }, description: { type: String, required: true },
category: { type: String, required: true }, amount: { type: Number, required: true }, },
  { timestamps: true }
);

const Expense = models.Expense || mongoose.model("Expense", ExpenseSchema);

export default Expense;