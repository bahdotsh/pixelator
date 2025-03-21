import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header glass-panel">
      <div className="container">
        <div className="logo">
          <h1>PIXELATOR</h1>
          <div className="logo-ornament">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
