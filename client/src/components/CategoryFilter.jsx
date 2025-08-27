import React from "react";

const categories = [
  "All",
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Bills",
  "Healthcare",
  "Salary",
  "Freelance",
  "Investment",
  "Gift",
  "Other",
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Filter by Category
    </label>
    <select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
      className="w-full md:w-auto p-2 border border-gray-300 rounded-md"
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>
);

export default CategoryFilter;
