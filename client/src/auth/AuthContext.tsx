/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { UserCredentials } from "../interfaces";
import { notifyError, notifySuccess } from "../utils/notifications";
import { jwtDecode } from "jwt-decode";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  login: (user: UserCredentials) => void;
  logout: () => void;
  getUsername: () => string | null;
}

interface DecodedToken {
  userId: string;
  username: string;
}

export const AuthContext = createContext<AuthContextProps>({
  login: () => {},
  logout: () => {},
  getUsername: () => null,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
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
        notifySuccess(result.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        const error = await response.json();
        notifyError(error.message);
        console.log("Login failed", error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const getUsername = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);
      return decodedToken.username;
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ login, logout, getUsername }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
