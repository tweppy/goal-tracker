/* eslint-disable react-refresh/only-export-components */
import "./style.scss";

import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../Navbar/Navbar";
import { isTokenExpired } from "../../services/api";

export enum LayoutType {
  "default" = "default",
  "fullScreen" = "fullScreen",
  "fullScreenNav" = "fullScreenNav",
}

interface LayoutProps {
  children: ReactNode;
  type: LayoutType;
  title?: string;
  description?: string;
}

export const Layout = ({ children, type = LayoutType.default, title, description }: LayoutProps) => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <div className={`layout layout__${type}`}>
      {type !== LayoutType.fullScreen && <Navbar />}
      {type !== LayoutType.fullScreen && (
        <header className="header">
          <h1 className="header__title">{title}</h1>
          <p className="header__description">{description}</p>
        </header>
      )}
      <section className="content">{children}</section>
    </div>
  );
};
