import React, { useContext, useState } from "react";
import { Download, Upload } from "lucide-react";
import { TransactionContext } from "../context/TransactionContext";

const DataManager = () => {
  const { exportData, importData } = useContext(TransactionContext);
  const [importError, setImportError] = useState("");

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const success = importData(e.target.result);
        if (success) {
          setImportError("");
          alert("Data imported successfully!");
        } else {
          setImportError("Invalid JSON format");
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
          onClick={exportData}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          <Download className="w-4 h-4" />
          Export Data
        </button>
        <div>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
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
