import React from "react";
import Pixelator from "../components/Pixelator";
import "../styles/Create.css";

const Create = () => {
  return (
    <div className="create-page page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1 className="gradient-text">Create Pixel Art</h1>
          <p>
            Upload an image and transform it into a retro pixelated masterpiece
          </p>
        </div>

        <Pixelator />
      </div>
    </div>
  );
};

export default Create;
