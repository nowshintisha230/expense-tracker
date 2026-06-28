import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Expense from "@/models/Expense";

const ALLOWED_CATEGORIES = ["Food", "Transport", "Health", "Shopping", "Other"];

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const category = searchParams.get("category");

    const query: any = {};
    if (date) query.date = { $regex: date };
    if (category) query.category = category;

    const expenses = await Expense.find(query).sort({ createdAt: -1 });

    const valid = expenses.filter(
      (e: any) =>
        e.date &&
        e.category &&
        typeof e.amount === "number" &&
        Number.isFinite(e.amount) &&
        typeof e.description === "string" &&
        e.description.trim().length > 0
    );

    return NextResponse.json(valid);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
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
    const expense = await Expense.create({
      date: parsedDate.toISOString(),
      description: description.trim(),
      category,
      amount: parsedAmount,
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}