import React, { useContext, useState } from "react";
import { Download, Upload } from "lucide-react";
import { TransactionContext } from "../context/TransactionContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const DataManager = () => {
  const { exportData, importData } = useContext(TransactionContext);
  const { currentUser } = useAuth();
  const [importError, setImportError] = useState("");

  const handleNoUser = () => {
    if (!currentUser) {
      toast.error("Please select or add a user before adding transactions.", {
        position: "top-right",
      });
      return;
    }
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const success = importData(e.target.result);
        if (success) {
          setImportError("");
          event.target.value = "";
          toast.success("Data imported successfully!", {
            position: "top-right",
          });
        } else {
          setImportError("Invalid JSON format");
          toast.error("Invalid JSON format. Please upload a valid file.", {
            position: "top-right",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Data Management</h2>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={!currentUser ? handleNoUser : exportData}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          <Download className="w-4 h-4" />
          Export Data
        </button>
        <div>
          <input
            type="file"
            accept=".json"
            onChange={!currentUser ? handleNoUser : handleImport}
            className="hidden"
            id="import-file"
          />
          <label
            htmlFor="import-file"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Import Data
          </label>
        </div>
      </div>
      {importError && (
        <p className="text-red-500 text-sm mt-2">{importError}</p>
      )}
    </div>
  );
};

export default DataManager;
