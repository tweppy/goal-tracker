import "./style.scss";

import { ReactNode } from "react";

import { Layout, LayoutType } from "../Layout/Layout";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <Layout type={LayoutType.fullScreen}>
      <section className="modal">
        <aside onClick={onClose} className="close-icon">
          <div className="line"></div>
          <div className="line"></div>
        </aside>
        <section className="modal-content" onClick={e => e.stopPropagation()}>
          {children}
        </section>
      </section>
    </Layout>
  );
};
