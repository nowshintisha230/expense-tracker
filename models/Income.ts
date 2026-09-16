import mongoose, { Schema, models, Document, Types } from "mongoose";
import { INCOME_CATEGORIES, PAYMENT_METHODS } from "@/lib/constants";

export interface IIncome extends Document {
  userId: Types.ObjectId;
  date: string;
  source: string;
  category: string;
  amount: number;
  paymentMethod: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const IncomeSchema = new Schema<IIncome>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    source: { type: String, required: true },
    category: { type: String, required: true, enum: INCOME_CATEGORIES },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: PAYMENT_METHODS, default: "Bank" },
    notes: { type: String, required: false },
  },
  { timestamps: true }
);

IncomeSchema.index({ userId: 1, date: -1 });

const Income = models.Income || mongoose.model<IIncome>("Income", IncomeSchema);
export default Income;