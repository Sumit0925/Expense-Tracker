import React from "react";
import TransactionSummary from "../components/TransactionSummary";
import TransactionForm from "../components/TransactionForm";
import ExpenseChart from "../components/ExpenseChart";
import TransactionList from "../components/TransactionList";
import DataManager from "../components/DataManager";

const Dashboard = () => (
  <div>
    <TransactionSummary />
    <div className="grid lg:grid-cols-2 gap-8 mb-8">
      <TransactionForm />
      <DataManager />
    </div>
    <div className="grid lg:grid-cols-2 gap-8 mb-8">
      <TransactionList />
      <ExpenseChart />
    </div>
  </div>
);

export default Dashboard;
