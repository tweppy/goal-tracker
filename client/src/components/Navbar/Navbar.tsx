import "./style.scss";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useAuth } from "../../auth/AuthContext";
import { Button, ButtonType } from "../Button/Button";

const links = [
  { title: "Home", url: "/" },
  { title: "Today", url: "/today" },
  { title: "Goals", url: "/goals" },
  { title: "Progress", url: "/progress" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`}>
      <aside onClick={toggleMenu} className={`navicon ${isOpen ? "active" : ""}`}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </aside>
      <motion.section
        className={`menu ${isOpen ? "active" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
      >
        <ul className="links">
          {links.map((link, index) => (
            <li key={index}>
              {
                <Link to={link.url} className="links__link">
                  {link.title}
                </Link>
              }
            </li>
          ))}
        </ul>
        <Button type={ButtonType.default} onClick={handleLogout}>
          Logout
        </Button>
      </motion.section>
    </nav>
  );
};
