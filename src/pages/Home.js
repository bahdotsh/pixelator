import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MandelbrotPixelArt from "../components/MandelbrotPixelArt";
import PixelArtCanvas from "../components/PixelArtCanvas";
import pixelArtGallery from "../data/pixelArtGallery";
import "../styles/Home.css";

const Home = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mandelbrotRef, mandelbrotInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [galleryRef, galleryInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home">
      <motion.section
        className="hero"
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <h1 className="gradient-text">
            Transform Your Images Into Retro Pixel Art
          </h1>
          <p>
            Create stunning pixel art with nostalgic vibes from any image with
            our easy-to-use pixelator tool
          </p>
          <div className="hero-buttons">
            <Link to="/create" className="button primary-button">
              Create Pixel Art
            </Link>
            <a href="#mandelbrot" className="button secondary-button">
              Explore Pixel Art
            </a>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="mandelbrot"
        className="mandelbrot-section"
        ref={mandelbrotRef}
        initial={{ opacity: 0, y: 50 }}
        animate={
          mandelbrotInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
        }
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2 className="section-title">Interactive Mandelbrot Pixel Art</h2>
          <p className="section-description">
            The Mandelbrot set is a mathematical fractal that creates infinite
            complexity from a simple equation. It's a perfect demonstration of
            pixel art's ability to turn math into visual beauty.
          </p>
          <MandelbrotPixelArt />
        </div>
      </motion.section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3>Retro Gaming Aesthetics</h3>
              <p>Apply authentic color palettes from classic gaming systems</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Artistic Control</h3>
              <p>Fine-tune pixel size, contrast, and color effects</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📺</div>
              <h3>CRT Scanlines</h3>
              <p>
                Add optional scanlines for that authentic vintage display look
              </p>
            </div>
          </div>
        </div>
      </section>

      <motion.section
        id="gallery"
        className="gallery"
        ref={galleryRef}
        initial={{ opacity: 0, y: 50 }}
        animate={galleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2 className="section-title">Pixel Art Gallery</h2>
          <div className="gallery-grid">
            {pixelArtGallery.map((art) => (
              <motion.div
                key={art.id}
                className="gallery-item"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <PixelArtCanvas
                  artData={art.data}
                  pixelSize={art.pixelSize}
                  title={art.title}
                  artist={art.artist}
                />
              </motion.div>
            ))}
          </div>
          <div className="gallery-note">
            <p>All pixel art is generated through code!</p>
          </div>
        </div>
      </motion.section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Create Your Own Pixel Art?</h2>
          <p>
            Transform your photos into retro masterpieces with just a few clicks
          </p>
          <Link to="/create" className="button cta-button">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
