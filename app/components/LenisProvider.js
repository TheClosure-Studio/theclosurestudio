"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth ease-out
      smoothWheel: true,
      smoothTouch: false,
      gestureOrientation: "vertical",
    });

    // Make lenis available globally for ScrollToTop
    if (typeof window !== "undefined") {
      window.lenis = lenis;
    }

    let animationFrame;

    const raf = (time) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      if (typeof window !== "undefined") {
        delete window.lenis;
      }
      lenis.destroy();
    };
  }, []);

  return children;
}
