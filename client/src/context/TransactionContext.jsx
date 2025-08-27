import React, { createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useLocalStorage('transactions', []);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: transaction.date || new Date().toISOString().split('T')[0],
    };
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const editTransaction = (id, updatedTransaction) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...updatedTransaction, id } : t))
    );
    setEditingTransaction(null);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(transactions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'expense-tracker-data.json';
    link.click();
  };

  const importData = (jsonData) => {
    try {
      const importedTransactions = JSON.parse(jsonData);
      if (Array.isArray(importedTransactions)) {
        setTransactions(importedTransactions);
        return true;
      }
    } catch (error) {
      console.error('Error importing data:', error);
    }
    return false;
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        editTransaction,
        editingTransaction,
        setEditingTransaction,
        exportData,
        importData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
