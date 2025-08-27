import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.id;

  // Load/store transactions for the active user only
  const storageKey = userId ? `transactions_${userId}` : null;
  const [transactions, setTransactionsState] = useState(
    () => JSON.parse(localStorage.getItem(storageKey)) || []
  );
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Sync to localStorage on transactions/user change
  useEffect(() => {
    if (storageKey) {
      // If switched user, refresh from storage
      setTransactionsState(JSON.parse(localStorage.getItem(storageKey)) || []);
    }
  }, [storageKey]);

  // Save any transaction change
  useEffect(() => {
    if (storageKey)
      localStorage.setItem(storageKey, JSON.stringify(transactions));
  }, [transactions, storageKey]);

  // All your existing transaction functions with state referring to transactions and setTransactionsState...

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: transaction.date || new Date().toISOString().split("T")[0],
    };
    setTransactionsState((prev) => [...prev, newTransaction]);
  };

  const deleteTransaction = (id) => {
    setTransactionsState((prev) => prev.filter((t) => t.id !== id));
  };

  const editTransaction = (id, updatedTransaction) => {
    setTransactionsState((prev) =>
      prev.map((t) => (t.id === id ? { ...updatedTransaction, id } : t))
    );
    setEditingTransaction(null);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(transactions, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "expense-tracker-data.json";
    link.click();
  };

  const importData = (jsonData) => {
    try {
      const importedTransactions = JSON.parse(jsonData);
      if (Array.isArray(importedTransactions)) {
        setTransactionsState(importedTransactions);
        return true;
      }
    } catch (error) {
      // handle error
    }
    return false;
  };

  // TransactionProvider only works when a user is active
  // if (!userId) {
  //   return (
  //     <div className="text-center text-xl p-8">Please select or add a user.</div>
  //   );
  // }

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

export const useTransaction = () => useContext(TransactionContext);
