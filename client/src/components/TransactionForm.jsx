import React, { useContext, useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { TransactionContext } from "../context/TransactionContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const TransactionForm = ({ defaultType = "expense" }) => {
  const {
    addTransaction,
    editTransaction,
    editingTransaction,
    setEditingTransaction,
  } = useContext(TransactionContext);

  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    type: defaultType,
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState({});

  const categories = {
    expense: [
      "Food",
      "Transport",
      "Entertainment",
      "Shopping",
      "Bills",
      "Healthcare",
      "Other",
    ],
    income: ["Salary", "Freelance", "Investment", "Gift", "Other"],
  };

  useEffect(() => {
    if (editingTransaction) {
      setFormData(editingTransaction);
    } else {
      // Reset to defaultType if no editing in progress
      setFormData((prev) => ({
        ...prev,
        type: defaultType,
        category: "", // reset category on type change
      }));
    }
  }, [editingTransaction, defaultType]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.amount || formData.amount <= 0)
      newErrors.amount = "Amount must be greater than 0";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent transaction if no user is set
    if (!currentUser) {
      toast.error("Please select or add a user first!");
      return; // DO NOT add transaction!
    }

    if (validateForm()) {
      const transactionData = {
        ...formData,
        amount: parseFloat(formData.amount),
      };
      if (editingTransaction) {
        editTransaction(editingTransaction.id, transactionData);
        toast.success("Transaction updated successfully!");
      } else {
        addTransaction(transactionData);
        toast.success("Transaction added successfully!");
      }
      setFormData({
        type: defaultType,
        description: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
      });
      setErrors({});
    } else {
      toast.error("Please fill all fields correctly!");
    }
  };

  const handleCancel = () => {
    setEditingTransaction(null);
    setFormData({
      type: defaultType,
      description: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
    setErrors({});
    toast.info("Edit cancelled.");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
      </h2>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value, category: "" })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={editingTransaction !== null} // Optionally disable type when editing
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Enter description"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select category</option>
              {categories[formData.type].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              placeholder="0.00"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            {editingTransaction ? "Update" : "Add"} Transaction
          </button>

          {editingTransaction && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
