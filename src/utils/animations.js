import { useEffect } from "react";

// Convert to a custom hook
export const useFloatElements = (selector, options = {}) => {
  const { amplitude = 15, period = 3000, delay = 0, direction = "y" } = options;

  useEffect(() => {
    // Skip if selector is null or undefined
    if (!selector) return;

    const elements = document.querySelectorAll(selector);
    const animationFrames = [];

    elements.forEach((el, index) => {
      const startTime = Date.now() + delay * index;

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const value =
          amplitude * Math.sin(((elapsed % period) / period) * Math.PI * 2);

        if (direction === "y") {
          el.style.transform = `translateY(${value}px)`;
        } else if (direction === "x") {
          el.style.transform = `translateX(${value}px)`;
        } else if (direction === "rotate") {
          el.style.transform = `rotate(${value}deg)`;
        }

        animationFrames.push(requestAnimationFrame(animate));
      };

      animationFrames.push(requestAnimationFrame(animate));
    });

    // Cleanup function to cancel all animation frames on unmount
    return () => {
      animationFrames.forEach((frame) => cancelAnimationFrame(frame));
    };
  }, [selector, amplitude, period, delay, direction]);
};

// Convert to a custom hook
export const usePulseGlow = (selector, options = {}) => {
  const {
    color = "var(--gothic-gold)",
    minIntensity = 0,
    maxIntensity = 10,
    period = 2000,
  } = options;

  useEffect(() => {
    // Skip if selector is null or undefined
    if (!selector) return;

    const elements = document.querySelectorAll(selector);
    const animationFrames = [];

    elements.forEach((el, index) => {
      const startTime = Date.now() + 200 * index;

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const intensity =
          minIntensity +
          (maxIntensity - minIntensity) *
            (Math.sin(((elapsed % period) / period) * Math.PI * 2) * 0.5 + 0.5);

        el.style.boxShadow = `0 0 ${intensity}px ${color}`;

        animationFrames.push(requestAnimationFrame(animate));
      };

      animationFrames.push(requestAnimationFrame(animate));
    });

    // Cleanup function to cancel all animation frames on unmount
    return () => {
      animationFrames.forEach((frame) => cancelAnimationFrame(frame));
    };
  }, [selector, color, minIntensity, maxIntensity, period]);
};
