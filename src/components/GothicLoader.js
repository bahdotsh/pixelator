import React from "react";
import "../styles/GothicLoader.css";

const GothicLoader = () => {
  return (
    <div className="gothic-loader">
      <div className="gothic-loader-symbol">
        <div className="cross-vertical"></div>
        <div className="cross-horizontal"></div>
        <div className="loader-circle"></div>
      </div>
      <p>Processing...</p>
    </div>
  );
};

export default GothicLoader;
