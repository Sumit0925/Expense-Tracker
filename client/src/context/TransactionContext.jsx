import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.id;

  // Load/store transactions for the active user only
  const storageKey = userId ? `transactions_${userId}` : null;
  const [transactions, setTransactionsState] = useState(() => {
    if (storageKey) {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    }
    return [];
  });
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Sync to localStorage on transactions/user change
  useEffect(() => {
    if (storageKey) {
      // If switched user, refresh from storage
      setTransactionsState(JSON.parse(localStorage.getItem(storageKey)) || []);
    } else {
      // If no user (storageKey is null), clear transactions
      setTransactionsState([]);
    }
  }, [storageKey]);

  // Save any transaction change (only if there's a valid user)
  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(transactions));
    }
  }, [transactions, storageKey]);

  const addTransaction = (transaction) => {
    // Only allow adding transactions if there's a current user
    if (!userId) return;
    
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: transaction.date || new Date().toISOString().split("T")[0],
    };
    setTransactionsState((prev) => [...prev, newTransaction]);
  };

  const deleteTransaction = (id) => {
    // Only allow deleting transactions if there's a current user
    if (!userId) return;
    
    setTransactionsState((prev) => prev.filter((t) => t.id !== id));
  };

  const editTransaction = (id, updatedTransaction) => {
    // Only allow editing transactions if there's a current user
    if (!userId) return;
    
    setTransactionsState((prev) =>
      prev.map((t) => (t.id === id ? { ...updatedTransaction, id } : t))
    );
    setEditingTransaction(null);
  };

  const exportData = () => {
    // Only allow export if there's a current user and transactions
    if (!userId || transactions.length === 0) return;
    
    const dataStr = JSON.stringify(transactions, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "expense-tracker-data.json";
    link.click();
  };

  const importData = (jsonData) => {
    // Only allow import if there's a current user
    if (!userId) return false;
    
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