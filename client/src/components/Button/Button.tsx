/* eslint-disable react-refresh/only-export-components */
import { ReactNode } from "react";
import "./style.scss";

export enum ButtonType {
  "default" = "default",
  "delete" = "delete"
}

export interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  type: ButtonType;
}

export const Button = ({ children, disabled, onClick, type = ButtonType.default }: ButtonProps) => {
  return (
    <button
      role="button"
      className={`btn__${type}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
