export const EXPENSE_CATEGORIES = ["Food", "Transport", "Health", "Shopping", "Other"] as const;
export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const INCOME_CATEGORIES = ["Salary", "Freelance", "Investment", "Gift", "Other"] as const;
export type IncomeCategory = (typeof INCOME_CATEGORIES)[number];

export const PAYMENT_METHODS = ["Cash", "Bank", "Card", "Mobile Banking"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const CATEGORY_COLORS: Record<string, string> = {
  Food: "#22c55e",
  Transport: "#3b82f6",
  Health: "#ef4444",
  Shopping: "#a855f7",
  Other: "#6b7280",
};

export const CATEGORY_STYLES: Record<string, string> = {
  Food: "bg-green-100 text-green-700",
  Transport: "bg-blue-100 text-blue-700",
  Health: "bg-red-100 text-red-700",
  Shopping: "bg-purple-100 text-purple-700",
  Other: "bg-gray-100 text-gray-600",
};