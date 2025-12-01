"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const isInitialMount = useRef(true);
  const timersRef = useRef([]);

  // Clear all timers helper
  const clearAllTimers = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  };

  useEffect(() => {
    // Clear any existing timers
    clearAllTimers();

    // Check if this is a route change
    const isRouteChange = prevPathnameRef.current !== pathname;

    if (isRouteChange) {
      prevPathnameRef.current = pathname;
    }

    // On initial mount or route change, show loading
    if (isInitialMount.current || isRouteChange) {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      }

      // Show loading immediately
      setIsLoading(true);
      setIsActive(false);

      // Trigger SVG animation after a brief delay to ensure DOM is ready
      const timer1 = setTimeout(() => {
        setIsActive(true);
      }, 150);
      timersRef.current.push(timer1);

      // Hide loading after animation completes (1s stroke + 0.7s fill + 0.15s buffer)
      const timer2 = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      timersRef.current.push(timer2);

      return () => clearAllTimers();
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (isLoading) {
      document.body.classList.add("loading-active");
    } else {
      document.body.classList.remove("loading-active");
    }

    return () => {
      document.body.classList.remove("loading-active");
    };
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key={`loading-${pathname}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            exit: {
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            },
          }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          style={{ pointerEvents: isLoading ? "auto" : "none" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 41 41"
              width="120"
              height="120"
              className={isActive ? "active" : ""}
            >
              <path
                d="M27.1 9.4C27.4 8.3 26.4 7.7 25.4 8.4L12.1 17.9C11.1 18.6 11.2 20.1 12.3 20.1H15.9H22.7L17.1 22L14.7 30.8C14.4 31.8 15.4 32.5 16.4 31.8L29.7 22.3C30.7 21.6 30.6 20.1 29.5 20.1H24.1L27.1 9.4Z"
                fill="transparent"
                stroke="#FFFFFF"
                strokeWidth="0.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                className="svg-elem-1"
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
