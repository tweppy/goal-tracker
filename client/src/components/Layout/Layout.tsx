import "./style.scss";

import { ReactNode } from "react";

import { Navbar } from "../Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const token = localStorage.getItem("token");

  return (
    <div className="layout">
      {token && <Navbar />}
      {children}
    </div>
  );
};
