import "./style.scss";

import { ReactNode } from "react";

import { Navbar } from "../Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Navbar />
      {children}
    </div>
  );
};
