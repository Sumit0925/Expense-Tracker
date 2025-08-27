import React, { createContext, useState, useContext, useEffect } from "react";

// Helpers for storage
function getUsersFromStorage() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function setUsersToStorage(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUserFromStorage() {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
}

function setCurrentUserToStorage(user) {
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("currentUser");
  }
}

// Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize users
  const [users, setUsers] = useState(() => getUsersFromStorage());
  // Initialize the current user (may be null)
  const [currentUser, setCurrentUser] = useState(() =>
    getCurrentUserFromStorage()
  );

  // Keep localStorage in sync on users change
  useEffect(() => {
    setUsersToStorage(users);
    // If there are no users, also ensure currentUser is null
    if (users.length === 0) {
      setCurrentUser(null);
      setCurrentUserToStorage(null);
    }
  }, [users]);

  // Keep localStorage in sync on currentUser change
  useEffect(() => {
    setCurrentUserToStorage(currentUser);
  }, [currentUser]);

  // Add a new user
  const addUser = (userName) => {
    if (!userName.trim() || users.some((u) => u.name === userName.trim())) {
      return false;
    }
    const newUser = { name: userName.trim(), id: Date.now().toString() };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    // Also initialize an empty transaction list for this user
    localStorage.setItem(`transactions_${newUser.id}`, JSON.stringify([]));
    return true;
  };

  // Switch user
  const switchUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  // Remove user
  const removeUser = (userId) => {
    const updatedUsers = users.filter((u) => u.id !== userId);
    setUsers(updatedUsers);
    localStorage.removeItem(`transactions_${userId}`);
    // If removing current user, clear current user
    if (currentUser && currentUser.id === userId) {
      // Set to first remaining user or null if no users left
      const nextUser = updatedUsers.length > 0 ? updatedUsers[0] : null;
      setCurrentUser(nextUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        addUser,
        switchUser,
        removeUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
