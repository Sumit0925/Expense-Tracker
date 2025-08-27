import React from "react";
import { DollarSign, Menu } from "lucide-react";

const Navbar = ({ toggleSidebar }) => (
  <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        {/* Logo & Title */}
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <DollarSign className="w-8 h-8" />
          Expense Tracker
        </h1>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleSidebar}
        >
          <Menu size={28} />
        </button>
        {/* Desktop Nav Links */}
        {/* <div className="hidden md:flex space-x-6">
          <a
            href="#dashboard"
            className="hover:text-blue-200 transition-colors"
          >
            Dashboard
          </a>
          <a href="#about" className="hover:text-blue-200 transition-colors">
            About
          </a>
        </div> */}
      </div>
    </div>
  </nav>
);

export default Navbar;
