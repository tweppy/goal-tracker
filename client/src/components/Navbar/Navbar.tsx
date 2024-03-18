import "./style.scss";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import navIconOpen from "../../assets/navicon-open.svg";
import navIconClose from "../../assets/navicon-close.svg";
import { useAuth } from "../../auth/AuthContext";

const links = [
  { title: "Home", url: "/" },
  { title: "Goals", url: "/goals" },
  { title: "Today", url: "/today" },
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
    <nav className="navbar">
      <aside className="navicon" onClick={toggleMenu}>
        <img src={isOpen ? navIconClose : navIconOpen} alt="nav icon" />
      </aside>
      <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
        {links.map((link, index) => (
          <li key={index}>
            {
              <Link to={link.url} className="navbar-links__link">
                {link.title}
              </Link>
            }
          </li>
        ))}
        <button onClick={handleLogout}>logout</button>
      </ul>
    </nav>
  );
};
