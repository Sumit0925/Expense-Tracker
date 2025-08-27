import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import TransactionItem from '../components/TransactionItem';

// Shows only expense transactions
const ExpenseHistory = () => {
  const { transactions } = useContext(TransactionContext);
  const expenses = transactions.filter(t => t.type === 'expense').sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Expense History</h2>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No expense records found</p>
        ) : (
          expenses.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseHistory;
