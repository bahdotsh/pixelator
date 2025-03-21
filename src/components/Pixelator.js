import React, { useState, useRef, useEffect } from "react";
import { saveAs } from "file-saver";
import GothicLoader from "./GothicLoader";
import { usePulseGlow } from "../utils/animations";
import "../styles/Pixelator.css";

const Pixelator = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [pixelatedImage, setPixelatedImage] = useState(null);
  const [pixelSize, setPixelSize] = useState(8);
  const [retroIntensity, setRetroIntensity] = useState(0.5);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);

  // Add animation effects using the custom hooks
  usePulseGlow(".gothic-btn", {
    color: "var(--gothic-gold)",
    minIntensity: 0,
    maxIntensity: 8,
    period: 2000,
  });

  // Apply glow effect to image frames if pixelatedImage exists
  usePulseGlow(pixelatedImage ? ".image-frame" : null, {
    color: "var(--gothic-gold)",
    minIntensity: 0,
    maxIntensity: 5,
    period: 3000,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setOriginalImage(img);
          pixelateImage(img, pixelSize, retroIntensity);
          setIsUploading(false);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.match("image.*")) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setOriginalImage(img);
          pixelateImage(img, pixelSize, retroIntensity);
          setIsUploading(false);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const pixelateImage = (image, pixelSize, retroIntensity) => {
    setIsProcessing(true);

    setTimeout(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to match the image
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the original image
      ctx.drawImage(image, 0, 0);

      // Pixelate the image
      const pixelatedWidth = Math.ceil(image.width / pixelSize);
      const pixelatedHeight = Math.ceil(image.height / pixelSize);

      // Draw small version
      ctx.drawImage(image, 0, 0, pixelatedWidth, pixelatedHeight);

      // Scale small version to original size with pixelation effect
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        canvas,
        0,
        0,
        pixelatedWidth,
        pixelatedHeight,
        0,
        0,
        image.width,
        image.height,
      );

      // Apply retro filter
      applyRetroFilter(ctx, canvas.width, canvas.height, retroIntensity);

      // Save the pixelated image URL
      setPixelatedImage(canvas.toDataURL());
      setIsProcessing(false);
    }, 500);
  };

  const applyRetroFilter = (ctx, width, height, intensity) => {
    // Get image data
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Color palette reduction
    const paletteReduction = 0.8 * intensity;

    for (let i = 0; i < data.length; i += 4) {
      // Apply contrast
      const contrastFactor = 1 + intensity;

      data[i] = applyContrast(data[i], contrastFactor); // Red
      data[i + 1] = applyContrast(data[i + 1], contrastFactor); // Green
      data[i + 2] = applyContrast(data[i + 2], contrastFactor); // Blue

      // Color palette reduction (quantize colors)
      if (paletteReduction > 0) {
        const factor = 1 + Math.floor(paletteReduction * 6);
        data[i] = Math.floor(data[i] / factor) * factor;
        data[i + 1] = Math.floor(data[i + 1] / factor) * factor;
        data[i + 2] = Math.floor(data[i + 2] / factor) * factor;
      }

      // Add slight sepia tone
      const sepiaAmount = intensity * 0.3;
      if (sepiaAmount > 0) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        data[i] = Math.min(
          255,
          r * (1 - sepiaAmount) +
            (r * 0.393 + g * 0.769 + b * 0.189) * sepiaAmount,
        );
        data[i + 1] = Math.min(
          255,
          g * (1 - sepiaAmount) +
            (r * 0.349 + g * 0.686 + b * 0.168) * sepiaAmount,
        );
        data[i + 2] = Math.min(
          255,
          b * (1 - sepiaAmount) +
            (r * 0.272 + g * 0.534 + b * 0.131) * sepiaAmount,
        );
      }
    }

    // Put the modified image data back
    ctx.putImageData(imageData, 0, 0);

    // Add scan lines if intensity is high enough
    if (intensity > 0.4) {
      for (let y = 0; y < height; y += 2) {
        ctx.fillStyle = `rgba(0, 0, 0, ${0.1 * intensity})`;
        ctx.fillRect(0, y, width, 1);
      }
    }

    // Add vignette effect
    if (intensity > 0.2) {
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.5,
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, `rgba(0, 0, 0, ${0.3 * intensity})`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }
  };

  const applyContrast = (value, contrast) => {
    return Math.min(
      255,
      Math.max(0, Math.floor(((value / 255 - 0.5) * contrast + 0.5) * 255)),
    );
  };

  const handlePixelSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPixelSize(newSize);
    if (originalImage) {
      pixelateImage(originalImage, newSize, retroIntensity);
    }
  };

  const handleRetroIntensityChange = (e) => {
    const newIntensity = parseFloat(e.target.value);
    setRetroIntensity(newIntensity);
    if (originalImage) {
      pixelateImage(originalImage, pixelSize, newIntensity);
    }
  };

  const handleDownload = () => {
    if (pixelatedImage) {
      canvasRef.current.toBlob((blob) => {
        saveAs(blob, "gothic-pixel-art.png");
      });
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setPixelatedImage(null);
  };

  return (
    <div className="pixelator-container">
      {!originalImage ? (
        <div
          className="upload-area glass-panel"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="upload-content">
            <h2>Transform Your Image</h2>
            <p>Upload an image to convert it into gothic pixelated art</p>

            <div className="upload-ornament">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
            <label htmlFor="imageUpload" className="gothic-btn">
              {isUploading ? "Processing..." : "Select Image"}
            </label>

            <p className="drag-instruction">Or drag and drop your image here</p>
          </div>
        </div>
      ) : (
        <div className="editor">
          <div className="control-panel glass-panel">
            <h2>Pixelate</h2>
            <div className="control-ornament">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="control-group">
              <label>Pixel Size: {pixelSize}px</label>
              <input
                type="range"
                min="2"
                max="32"
                value={pixelSize}
                onChange={handlePixelSizeChange}
                className="pixel-slider"
              />
            </div>

            <div className="control-group">
              <label>Retro Effect: {Math.round(retroIntensity * 100)}%</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={retroIntensity}
                onChange={handleRetroIntensityChange}
                className="pixel-slider"
              />
            </div>

            <div className="button-group">
              <button className="gothic-btn outline" onClick={handleReset}>
                Reset
              </button>
              <button
                className="gothic-btn"
                onClick={handleDownload}
                disabled={!pixelatedImage || isProcessing}
              >
                Download
              </button>
            </div>
          </div>

          <div className="preview-panel">
            <div className="preview-container">
              <div className="image-preview glass-panel">
                <h3>Original</h3>
                <div className="image-frame">
                  <img src={originalImage.src} alt="Original" />
                </div>
              </div>

              <div className="image-preview glass-panel">
                <h3>Gothic Pixel Art</h3>
                <div className="image-frame">
                  {isProcessing ? (
                    <div className="loading">Processing...</div>
                  ) : (
                    <img src={pixelatedImage} alt="Pixelated" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default Pixelator;
