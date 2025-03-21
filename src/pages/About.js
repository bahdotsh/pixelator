import React from "react";
import { Link } from "react-router-dom";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-page page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1 className="gradient-text">About PixelWave</h1>
          <p>The story behind our retro pixel art creator</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              PixelWave was created to celebrate the nostalgia and aesthetic of
              retro pixel art. We believe that the charm of early digital art
              deserves to be preserved and reimagined for the modern era. Our
              mission is to make pixel art creation accessible to everyone,
              whether you're a digital artist, a gamer with fond memories of
              8-bit adventures, or simply someone who appreciates the unique
              visual style of the pixel.
            </p>
          </section>

          <section className="about-section">
            <h2>The Pixel Art Renaissance</h2>
            <p>
              In recent years, pixel art has experienced a renaissance. From
              indie games to digital art communities, the distinctive blocky
              aesthetic continues to captivate creators and audiences alike.
              There's something timeless about the pixel—perhaps it's the way it
              reduces visual information to its essence, or how it reminds us of
              gaming's formative years.
            </p>
            <p>
              PixelWave joins this movement by offering tools that honor the
              techniques and limitations that gave birth to the pixel art form,
              while making the creation process intuitive and enjoyable.
            </p>
          </section>

          <section className="about-section">
            <h2>How It Works</h2>
            <p>
              Our pixelator tool uses advanced image processing algorithms to
              transform your photos into authentic-looking pixel art. Unlike
              simple downsampling, our process considers aspects like color
              palette restriction, contrast enhancement, and optional CRT
              scanlines to create that perfect retro look.
            </p>
            <p>
              The technology behind PixelWave respects the intentional
              constraints that pixel artists embraced in the early days of
              digital art. By working within these limitations, we help you
              create images with that distinctive charm that only pixel art can
              deliver.
            </p>
          </section>

          <div className="about-cta">
            <h2>Ready to Create Your Own Pixel Art?</h2>
            <Link to="/create" className="button cta-button">
              Try The Pixelator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
