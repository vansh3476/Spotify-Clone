import { jwtDecode } from "jwt-decode";
import React, { createContext, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

export const AuthContext = createContext({
  user: null,
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ id: decoded.id, email: decoded.email, name: decoded.name });
    }
    setLoaded(true);
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    const decoded = jwtDecode(newToken);
    setUser({ id: decoded.id, email: decoded.email, name: decoded.name });
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider value={{ user, token, login, logout, loaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
