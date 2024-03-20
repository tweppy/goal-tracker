import "./style.scss";

import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../Navbar/Navbar";
import { isTokenExpired } from "../../services/api";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <div className="layout">
      {token && <Navbar />}
      {children}
    </div>
  );
};
