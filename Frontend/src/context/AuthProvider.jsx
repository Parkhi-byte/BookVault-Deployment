import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for existing user and token on app load
    const storedUser = localStorage.getItem("Users");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      try {
        setAuthUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("Users");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (userData, userToken) => {
    setAuthUser(userData);
    setToken(userToken);
    localStorage.setItem("Users", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  };

  const logout = () => {
    setAuthUser(null);
    setToken(null);
    localStorage.removeItem("Users");
    localStorage.removeItem("token");
  };

  const updateUser = (userData) => {
    setAuthUser(userData);
    localStorage.setItem("Users", JSON.stringify(userData));
  };

  // Check if user is admin
  const isAdmin = authUser?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      authUser, 
      token, 
      login, 
      logout, 
      updateUser,
      isAuthenticated: !!authUser && !!token,
      isAdmin: isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
