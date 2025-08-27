import React from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart2,
  CreditCard,
  ArrowDownToLine,
  ArrowUpToLine,
  Wallet,
  Activity,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <aside
        className={`bg-gradient-to-b from-slate-800 to-slate-900 text-white w-64 min-h-screen fixed top-0 left-0 transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close Button for Mobile */}
        <div className="flex justify-end md:hidden p-4">
          <button onClick={toggleSidebar}>
            <X size={28} />
          </button>
        </div>

        <div className="hidden md:block py-6 px-4 font-bold text-xl">
          Expense Tracker
        </div>

        <nav className="flex flex-col gap-3 px-2 mt-4 md:mt-0">
          {[
            { to: "/", label: "Dashboard", icon: <BarChart2 /> },
            { to: "/transactions", label: "Transactions", icon: <CreditCard /> },
            { to: "/income", label: "Income", icon: <Wallet /> },
            { to: "/expense", label: "Expense", icon: <Activity /> },
            { to: "/income-history", label: "Income History", icon: <ArrowDownToLine /> },
            { to: "/expense-history", label: "Expense History", icon: <ArrowUpToLine /> },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 py-2 px-4 rounded hover:bg-slate-700 ${
                  isActive ? "bg-slate-700" : ""
                }`
              }
              end
              onClick={toggleSidebar}
            >
              {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
