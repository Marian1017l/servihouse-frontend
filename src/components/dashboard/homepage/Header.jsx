import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>ServiHouse</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="/">Inicio</a></li>
            <li><a href="/about">Acerca</a></li>
            <li><a href="/contact">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;