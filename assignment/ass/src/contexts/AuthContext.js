import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState("/");

  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = async (email, password) => {
    const res = await fetch("http://localhost:3001/accounts");
    const accounts = await res.json();
    const found = accounts.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found);
      localStorage.setItem("auth", JSON.stringify(found));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, redirectAfterLogin, setRedirectAfterLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
