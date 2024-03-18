/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";
import { UserCredentials } from "../interfaces";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  login: (user: UserCredentials) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (user: UserCredentials) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    try {
      const response = await fetch(baseUrl + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("RESULT:", result);

        const token = result.body.token;

        localStorage.setItem("token", token);
        setIsAuthenticated(true);
      } else {
        const error = await response.json();
        console.log("Login failed", error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
