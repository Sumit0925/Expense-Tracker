import React from "react";
import TransactionForm from "../components/TransactionForm";
import IncomeHistory from "./IncomeHistory";

const Income = () => (
  <div className="grid lg:grid-cols-2 gap-8 mb-8">
    <div>
      <TransactionForm defaultType="income" />
    </div>
    <div>
      <IncomeHistory />
    </div>
  </div>
);

export default Income;
