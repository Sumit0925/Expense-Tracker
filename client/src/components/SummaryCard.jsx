import React from 'react';

const SummaryCard = ({ title, amount, type, icon: Icon }) => {
  const colorClasses = {
    income: 'bg-green-500 text-white',
    expense: 'bg-red-500 text-white',
    balance: amount >= 0 ? 'bg-blue-500 text-white' : 'bg-red-500 text-white',
  };
  return (
    <div className={`rounded-lg p-6 shadow-lg ${colorClasses[type]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-2xl font-bold">${Math.abs(amount).toFixed(2)}</p>
        </div>
        <Icon className="w-8 h-8 opacity-80" />
      </div>
    </div>
  );
};

export default SummaryCard;
