import React, { useContext } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TransactionContext } from "../context/TransactionContext";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
];

const ExpenseChart = () => {
  const { transactions } = useContext(TransactionContext);

  const expenseData = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, transaction) => {
      const category = transaction.category;
      acc[category] = (acc[category] || 0) + transaction.amount;
      return acc;
    }, {});

  const chartData = Object.entries(expenseData).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Expense Distribution</h2>
        <p className="text-gray-500 text-center py-8">
          No expense data to display
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
      <h2 className="text-xl font-semibold mb-4">Expense Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, "Amount"]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
