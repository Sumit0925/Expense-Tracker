import React, { useContext } from "react";
import  {TransactionContext}  from "../context/TransactionContext";
import calculateTotals from "../utils/calculateTotals";
import SummaryCard from "./SummaryCard";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const TransactionSummary = () => {
  const { transactions } = useContext(TransactionContext);
  const totals = calculateTotals(transactions);

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <SummaryCard
        title="Total Income"
        amount={totals.income}
        type="income"
        icon={TrendingUp}
      />
      <SummaryCard
        title="Total Expenses"
        amount={totals.expenses}
        type="expense"
        icon={TrendingDown}
      />
      <SummaryCard
        title="Net Balance"
        amount={totals.balance}
        type="balance"
        icon={DollarSign}
      />
    </div>
  );
};

export default TransactionSummary;
