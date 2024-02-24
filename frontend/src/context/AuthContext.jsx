import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || null
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("userDetails", JSON.stringify(user));
    } else {
      localStorage.removeItem("userDetails");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/users/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        setUser(null);
        toast.success(res.data.msg);
        navigate("/");
      }
    } catch (error) {
      console.error("Logged out error", error.res.data);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
