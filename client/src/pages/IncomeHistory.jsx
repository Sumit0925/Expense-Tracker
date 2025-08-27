import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import TransactionItem from '../components/TransactionItem';

// Shows only the income transactions
const IncomeHistory = () => {
  const { transactions } = useContext(TransactionContext);
  const incomes = transactions.filter(t => t.type === 'income').sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Income History</h2>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {incomes.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No income records found</p>
        ) : (
          incomes.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>
    </div>
  );
};

export default IncomeHistory;
