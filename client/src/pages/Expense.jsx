import React from "react";
import TransactionForm from "../components/TransactionForm";
import ExpenseHistory from "./ExpenseHistory";

const Expense = () => (
  <div className="grid lg:grid-cols-2 gap-8 mb-8">
    <div>
      <TransactionForm defaultType="expense" />
    </div>
    <div>
      <ExpenseHistory />
    </div>
  </div>
);

export default Expense;
