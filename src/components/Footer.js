import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer glass-panel">
      <div className="container">
        <div className="footer-content">
          <div className="footer-ornament">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="footer-text">
            <p>PIXELATOR &copy; {new Date().getFullYear()}</p>
            <p>Transform your images into gothic pixel art</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
