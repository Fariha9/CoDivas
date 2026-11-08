import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const storedUser = {
      name: localStorage.getItem("user_name") || "",
      email: localStorage.getItem("user_email") || "",
      token: token,
      role: localStorage.getItem("role") || "student",
    };

    setUser(storedUser);
  }, []);

  const login = (data) => {
    const userData = {
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
      token: data.token,
    };

    localStorage.setItem("token", userData.token);
    localStorage.setItem("user_name", userData.name);
    localStorage.setItem("user_email", userData.email);
    localStorage.setItem("role", userData.role);

    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);