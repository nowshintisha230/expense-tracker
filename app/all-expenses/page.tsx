"use client";
import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

type Expense = {
  _id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
};
const categoryStyles: Record<string, string> = {
Food: "bg-green-100 text-green-700",
 Transport: "bg-blue-100 text-blue-700",
 Health: "bg-red-100 text-red-700",
 Shopping: "bg-purple-100 text-purple-700",
  Other: "bg-gray-100 text-gray-600",
};

const fmtDate = (d?: string) => (d ? d.slice(0, 10) : "-");

const COLORS: Record<string, string> = {
  Food: "#22c55e",
  Transport: "#3b82f6",
  Health: "#ef4444",
  Shopping: "#a855f7",
  Other: "#6b7280",
};

const Page = () => {
 const [expenses, setExpenses] = useState<Expense[]>([]);
const [loading, setLoading] = useState(true);
const [dateFilter, setDateFilter] = useState("");
const [categoryFilter, setCategoryFilter] = useState("");
const [isOpen, setIsOpen] = useState(false);
const [editExpense, setEditExpense] = useState<Expense | null>(null);
const [formError, setFormError] = useState("");
const [form, setForm] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch("/api/expenses");
        if (!res.ok) {
          console.error("Failed to fetch expenses:", res.status);
          setExpenses([]);
          return;
        }
        const data = await res.json();
        setExpenses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch expenses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  const filtered = expenses.filter((e) => {
    const matchDate = dateFilter ? fmtDate(e.date) === dateFilter : true;
    const matchCat = categoryFilter ? e.category === categoryFilter : true;
    return matchDate && matchCat;
  });

  const total = filtered.reduce((sum, e) => sum + (e.amount ?? 0), 0);

  const chartData = Object.entries(
    filtered.reduce((acc: Record<string, number>, e) => {
      acc[e.category] = (acc[e.category] || 0) + (e.amount ?? 0);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const handleAdd = async () => {
    if (!form.date || !form.description || !form.category || !form.amount) return;
    setFormError("");
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount: Number(form.amount) }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        console.error("Failed to add expense:", res.status, errBody);
        setFormError(
          res.status === 401
            ? "You're not signed in. Please sign in and try again."
            : errBody?.error || "Failed to add expense. Please try again."
        );
        return; 
      }

      const newExpense = await res.json();
      setExpenses((prev) => [newExpense, ...prev]);
      setForm({ date: "", description: "", category: "", amount: "" });
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to add expense", err);
      setFormError("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/expenses/${id}`, { method: "DELETE" });
      if (!res.ok) {
        console.error("Failed to delete expense:", res.status);
        return;
      }
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Failed to delete expense", err);
    }
  };

  const handleUpdate = async () => {
    if (!editExpense) return;
    try {
      const res = await fetch(`/api/expenses/${editExpense._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editExpense),
      });
      if (!res.ok) {
        console.error("Update failed:", await res.text());
        return;
      }
      const updated = await res.json();
      if (updated?._id) {
        setExpenses((prev) => prev.map((e) => (e._id === updated._id ? updated : e)));
      }
      setEditExpense(null);
    } catch (err) {
      console.error("Failed to update", err);
    }
  };

  return (
    <div className="p-3 sm:p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-2 mb-4">
        <h1 className="text-lg sm:text-2xl font-medium italic bg-gradient-to-r from-blue-500 to-yellow-400 bg-clip-text text-transparent">
          Your All Expenses
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5">
            <span className="text-xs text-blue-500 font-medium">Total:</span>
            <span className="text-sm font-semibold text-blue-700">$ {total.toLocaleString()}</span>
          </div>
          <Button size="sm" className="text-xs sm:text-sm px-2 sm:px-4" onPress={() => { setFormError(""); setIsOpen(true); }}>
            + Add
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Date</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border rounded-lg px-2 py-1.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded-lg px-2 py-1.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
          >
            <option value="">All</option>
            {["Food", "Transport", "Health", "Shopping", "Other"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => { setDateFilter(""); setCategoryFilter(""); }}
          className="col-span-2 sm:col-span-1 border rounded-lg px-3 py-1.5 text-xs sm:text-sm hover:bg-gray-50 mt-auto"
        >
          Clear
        </button>
      </div>

      {chartData.length > 0 && (
        <div className="mb-6 border rounded-xl p-4">
          <h2 className="text-sm font-medium text-gray-500 mb-3">Spending by Category</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[entry.name] || "#6b7280"} />
                ))}
              </Pie>
             <Tooltip formatter={(value) => `$ ${Number(value).toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:hidden">
        {loading ? (
          <p className="text-center text-gray-400 text-sm py-10">Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-2">🧾</p>
            <p className="text-gray-500 font-medium text-sm">No expenses yet</p>
            <p className="text-gray-400 text-xs mt-1">Add your first expense to get started</p>
            <Button size="sm" className="text-xs m-2.5" onPress={() => { setFormError(""); setIsOpen(true); }}>
              + Add
            </Button>
          </div>
        ) : (
          filtered.map((e, i) => (
            <div key={e._id ?? i} className="border rounded-xl p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryStyles[e.category]}`}>
                  {e.category}
                </span>
                <span className="text-sm font-semibold text-gray-800">$ {(e.amount ?? 0).toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-700">{e.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{fmtDate(e.date)}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditExpense(e)}
                    className="text-xs text-blue-500 border border-blue-200 rounded px-2 py-1 hover:bg-blue-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(e._id)}
                    className="text-xs text-red-500 border border-red-200 rounded px-2 py-1 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hidden sm:block border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">Date</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">Description</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">Category</th>
              <th className="text-right px-4 py-3 text-gray-500 font-medium">Amount</th>
              <th className="text-center px-4 py-3 text-gray-500 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400 text-sm">Loading...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <p className="text-4xl mb-2">🧾</p>
                  <p className="text-gray-500 font-medium text-sm">No expenses yet</p>
                  <p className="text-gray-400 text-xs mt-1">Add your first expense to get started</p>
                  <Button size="sm" className="text-sm m-2.5 px-4" onPress={() => { setFormError(""); setIsOpen(true); }}>
                    + Add
                  </Button>
                </td>
              </tr>
            ) : (
              filtered.map((e, i) => (
                <tr key={e._id ?? i} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400">{fmtDate(e.date)}</td>
                  <td className="px-4 py-3">{e.description}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryStyles[e.category]}`}>
                      {e.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">$ {(e.amount ?? 0).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setEditExpense(e)}
                        className="text-xs text-blue-500 border border-blue-200 rounded px-2 py-1 hover:bg-blue-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(e._id)}
                        className="text-xs text-red-500 border border-red-200 rounded px-2 py-1 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 flex flex-col gap-3">
            <h2 className="text-base font-medium">Add Expense</h2>
            {formError && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {formError}
              </p>
            )}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Date</label>
              <input type="date" value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="border rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Description</label>
              <input type="text" placeholder="e.g. Lunch, Rickshaw fare" value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="border rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Category</label>
              <select value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select category</option>
                {["Food", "Transport", "Health", "Shopping", "Other"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Amount</label>
              <input type="number" placeholder="0.00" value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="border rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button onClick={() => { setIsOpen(false); setFormError(""); }}
                className="border rounded-lg px-4 py-2 text-sm hover:bg-gray-50">Cancel</button>
              <button onClick={handleAdd}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-600">Add Expense</button>
            </div>
          </div>
        </div>
      )}

      {editExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 flex flex-col gap-3">
            <h2 className="text-base font-medium">Edit Expense</h2>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Date</label>
              <input type="date" value={editExpense.date ? editExpense.date.slice(0, 10) : ""}
                onChange={(e) => setEditExpense({ ...editExpense, date: e.target.value })}
                className="border rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Description</label>
              <input type="text" value={editExpense.description}
                onChange={(e) => setEditExpense({ ...editExpense, description: e.target.value })}
                className="border rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Category</label>
              <select value={editExpense.category}
                onChange={(e) => setEditExpense({ ...editExpense, category: e.target.value })}
                className="border rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {["Food", "Transport", "Health", "Shopping", "Other"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Amount</label>
              <input type="number" value={editExpense.amount ?? 0}
                onChange={(e) => setEditExpense({ ...editExpense, amount: Number(e.target.value) })}
                className="border rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button onClick={() => setEditExpense(null)}
                className="border rounded-lg px-4 py-2 text-sm hover:bg-gray-50">Cancel</button>
              <button onClick={handleUpdate}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-600">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;