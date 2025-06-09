import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const logout = () => {
    setToken_(null);
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common["Authorization"];
  };

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        try {
         
        } catch (e) {
          logout();
        }
      }
      setLoading(false);
    };
    validateToken();
  }, [token]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token');
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser,
      logout,
      loading,
      isAuthenticated: !!token,
    }),
    [token, user, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;