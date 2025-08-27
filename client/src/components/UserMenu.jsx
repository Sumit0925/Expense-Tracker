import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { UserCircle, ChevronDown, UserPlus, Trash2 } from "lucide-react";

const UserMenu = () => {
  const { users, currentUser, switchUser, addUser, removeUser } = useAuth();
  const [newUser, setNewUser] = useState("");
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  // Close dropdown on ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleAdd = () => {
    if (addUser(newUser)) {
      setNewUser("");
      setAdding(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Icon or Initial */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-200 transition relative z-50"
      >
        {currentUser ? (
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
        ) : (
          <UserCircle className="w-7 h-7 text-black" />
        )}
        <ChevronDown
          className={`w-4 h-4 text-black transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50 text-black">
          {/* User List */}
          <div className="max-h-60 overflow-y-auto">
            {users.length > 0 ? (
              users.map((u) => (
                <div
                  key={u.id}
                  onClick={() => {
                    switchUser(u.id);
                    setOpen(false);
                  }}
                  className={`flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                    currentUser?.id === u.id ? "bg-gray-50 font-semibold" : ""
                  }`}
                >
                  <span>{u.name}</span>
                  {currentUser?.id === u.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeUser(u.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500">No users</div>
            )}
          </div>

          {/* Add User */}
          {!adding ? (
            <button
              onClick={() => setAdding(true)}
              className="flex items-center gap-2 w-full px-3 py-2 border-t text-blue-600 hover:bg-blue-50"
            >
              <UserPlus className="w-4 h-4" /> Add New User
            </button>
          ) : (
            <div className="p-3 border-t">
              <input
                type="text"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                placeholder="Enter name"
                className="w-full px-2 py-1 border rounded mb-2 text-black"
              />
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-green-600 text-white py-1 rounded disabled:opacity-50"
                  onClick={handleAdd}
                  disabled={
                    !newUser.trim() ||
                    users.some((u) => u.name === newUser.trim())
                  }
                >
                  Add
                </button>
                <button
                  className="flex-1 bg-gray-300 text-black py-1 rounded"
                  onClick={() => {
                    setAdding(false);
                    setNewUser("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
