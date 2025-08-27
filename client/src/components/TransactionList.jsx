import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import CategoryFilter from "./CategoryFilter";
import TransactionItem from "./TransactionItem";

const TransactionList = () => {
  const { transactions } = useContext(TransactionContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTransactions =
    selectedCategory === "All"
      ? transactions
      : transactions.filter((t) => t.category === selectedCategory);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transaction History</h2>
        <span className="text-sm text-gray-600">
          {filteredTransactions.length} transaction
          {filteredTransactions.length !== 1 ? "s" : ""}
        </span>
      </div>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No transactions found
          </p>
        ) : (
          filteredTransactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;
