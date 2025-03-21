# Pixelator

A gothic-inspired web application that transforms your images into stylized pixel art with retro effects.


## Overview

Pixelator is an elegant, browser-based tool that converts regular images into pixelated art with customizable retro effects. Featuring a sophisticated white and gold UI inspired by Gothic cathedral architecture, the application creates a unique artistic experience with a mesmerizing infinitely-zooming Mandelbrot set background.

## Features

- **Image Pixelation**: Convert any image into pixel art with adjustable pixel size
- **Retro Effects**: Apply nostalgic filters with adjustable intensity:
  - Scanlines (CRT monitor effect)
  - Color palette reduction
  - Contrast enhancement
  - Subtle sepia tone
  - Vignette darkening
- **Interactive Background**: Mesmerizing continuously-zooming Mandelbrot fractal pattern
- **Modern UI**: Elegant, glass-morphism interface inspired by Gothic cathedral aesthetics
- **Easy Download**: One-click download of your created pixel art

## How to Use

1. **Upload an Image**: Drag and drop an image or click to browse your files
2. **Adjust Settings**:
   - Set the pixel size (larger values create a more "blocky" look)
   - Control the retro effect intensity
3. **Download**: Save your pixelated creation with a click

## Technical Details

Pixelator is built using:
- React.js for the UI
- HTML5 Canvas for image processing and the Mandelbrot visualization
- CSS3 with glass-morphism effects
- Custom image processing algorithms for pixelation and retro filters

All processing happens locally in your browser — no server uploads required!

## Installation and Local Development

To run the project locally:

```bash
# Clone the repository
git clone https://github.com/badhtosh/pixelator.git

# Navigate to the project directory
cd pixelator

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at `http://localhost:3000`.

## Building for Production

```bash
npm run build
```

This creates a `build` directory with optimized production files.

## Design Inspiration

The visual design of Pixelator draws inspiration from:

- Gothic cathedral architecture, particularly Aachen Cathedral
- Minimalist black and white design principles
- Renaissance drawings and sketches
- Classic pixel art from the early computing era

## Credits

- Mandelbrot set visualization based on mathematical principles by Benoit Mandelbrot
- Font pairings: Cinzel (headers) and Montserrat (body text)
- Special thanks to the open-source community for their invaluable contributions
