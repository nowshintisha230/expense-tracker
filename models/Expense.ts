import mongoose, { Schema, models, Document, Types } from "mongoose";
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from "@/lib/constants";

export interface IExpense extends Document {
  userId: Types.ObjectId;
  date: string;
  description: string;
  category: string;
  amount: number;
  paymentMethod: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: EXPENSE_CATEGORIES },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: PAYMENT_METHODS, default: "Cash" },
    notes: { type: String, required: false },
  },
  { timestamps: true }
);

// Every list/dashboard query filters by userId first, then usually sorts by
// date or filters by category, so compound indexes here matter.
ExpenseSchema.index({ userId: 1, date: -1 });
ExpenseSchema.index({ userId: 1, category: 1 });

const Expense = models.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema);
export default Expense;