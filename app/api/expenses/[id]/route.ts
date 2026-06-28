import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Expense from "@/models/Expense";

const ALLOWED_CATEGORIES = ["Food", "Transport", "Health", "Shopping", "Other"];

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { date, description, category, amount } = body;

    if (!date || !description || !category) {
      return NextResponse.json({ error: "date, description and category are required" }, { status: 400 });
    }

    if (typeof description !== "string" || description.trim().length === 0) {
      return NextResponse.json({ error: "description cannot be empty" }, { status: 400 });
    }

    if (!ALLOWED_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: "invalid category" }, { status: 400 });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ error: "invalid date" }, { status: 400 });
    }

    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json({ error: "amount must be a positive number" }, { status: 400 });
    }

    await connectDB();
    const updated = await Expense.findOneAndUpdate(
      { _id: id },
      {
        date: parsedDate.toISOString(),
        description: description.trim(),
        category,
        amount: parsedAmount,
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const deleted = await Expense.findOneAndDelete({ _id: id });

    if (!deleted) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}