import React, { useContext } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { TransactionContext } from "../context/TransactionContext";

const TransactionItem = ({ transaction }) => {
  const { deleteTransaction, setEditingTransaction } =
    useContext(TransactionContext);

  const typeStyles =
    transaction.type === "income"
      ? "border-l-4 border-green-500 bg-green-50"
      : "border-l-4 border-red-500 bg-red-50";

  return (
    <div className={`p-4 rounded-lg shadow ${typeStyles}`}>
      <div className="flex sm:flex-row sm:justify-between sm:items-center gap-3">
        {/* Left Side: Description, Category, Date */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-gray-900 text-sm sm:text-base">
              {transaction.description}
            </h3>
            <span
              className={`px-2 py-0.5 rounded-full text-xs sm:text-sm ${
                transaction.type === "income"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {transaction.category}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">{transaction.date}</p>
        </div>

        {/* Right Side: Amount & Actions */}
        <div className="flex flex-wrap flex-col sm:flex-row sm:items-center sm:justify-end">
          <span
            className={`text-base sm:text-lg font-semibold ${
              transaction.type === "income" ? "text-green-600" : "text-red-600"
            }`}
          >
            {transaction.type === "income" ? "+" : "-"}$
            {transaction.amount.toFixed(2)}
          </span>
          <div className="flex gap-2 sm:mt-0 justify-end">
            <button
              onClick={() => setEditingTransaction(transaction)}
              className="p-1.5 sm:p-2 md:ml-3 text-blue-600 hover:bg-blue-100 rounded"
            >
              <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => deleteTransaction(transaction.id)}
              className="p-1.5 sm:p-2 text-red-600 hover:bg-red-100 rounded"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
