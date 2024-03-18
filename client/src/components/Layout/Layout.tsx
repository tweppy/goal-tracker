import "./style.scss";

import { ReactNode } from "react";

import { Navbar } from "../Navbar/Navbar";
import { useAuth } from "../../auth/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return (
    <div className="layout">
      {isAuthenticated && <Navbar />}
      {children}
    </div>
  );
};
