import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import IncomeHistory from "./pages/IncomeHistory";
import ExpenseHistory from "./pages/ExpenseHistory";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
// ...import other pages...

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Router>
        <div className="flex bg-gray-50 min-h-screen">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={`flex-1 w-full transition-all duration-300 md:ml-64`}>
            <Navbar toggleSidebar={toggleSidebar} />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/income-history" element={<IncomeHistory />} />
                <Route path="expense-history" element={<ExpenseHistory />} />
                <Route path="/income" element={<Income />} />
                <Route path="/expense" element={<Expense />} />
                {/* ...other routes... */}
              </Routes>
            </main>
            {/* <Footer /> */}
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
