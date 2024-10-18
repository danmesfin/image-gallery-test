import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("/auth/login", { username, password });
      localStorage.setItem("token", response.data.access_token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const register = async (username: string, password: string) => {
    try {
      await axios.post("/auth/register", { username, password });
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
