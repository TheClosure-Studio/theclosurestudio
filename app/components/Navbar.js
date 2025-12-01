"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ theme = "white" }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isFullScreenMenuOpen, setIsFullScreenMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  // Theme-based styles
  const isDark = theme === "black";
  const textColor = isDark ? "text-neutral-200" : "text-black";
  const bgColor = isDark ? "bg-black" : "bg-white";
  const logoTextColor = isDark ? "text-neutral-200" : "text-neutral-900";
  const navTextColor = isDark ? "text-neutral-200" : "text-black";
  const contactBtnBg = isDark ? "bg-white text-black" : "bg-black text-white";
  const mobileMenuBorder = isDark ? "border-gray-700" : "border-gray-200";
  const mobileMenuText = isDark
    ? "text-white hover:text-gray-300"
    : "text-gray-700 hover:text-blue-600";
  const mobileMenuActive = isDark ? "text-white" : "text-blue-600";
  const mobileButtonColor = isDark
    ? "text-white hover:bg-gray-800"
    : "text-gray-700 hover:bg-gray-100";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/project-studio", label: "Project Studio" },
    { href: "/services", label: "Services" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNavbarVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "0px",
      }
    );

    const currentNavbar = navbarRef.current;
    if (currentNavbar) {
      observer.observe(currentNavbar);
    }

    return () => {
      if (currentNavbar) {
        observer.unobserve(currentNavbar);
      }
    };
  }, []);

  return (
    <>
      {/* Navbar - Hidden on screens smaller than lg */}
      <nav ref={navbarRef} className={`${bgColor} hidden lg:block`}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 41 41"
                  width="36"
                  height="36"
                  className="flex-shrink-0"
                >
                  <path
                    d="M27.1 9.4C27.4 8.3 26.4 7.7 25.4 8.4L12.1 17.9C11.1 18.6 11.2 20.1 12.3 20.1H15.9H22.7L17.1 22L14.7 30.8C14.4 31.8 15.4 32.5 16.4 31.8L29.7 22.3C30.7 21.6 30.6 20.1 29.5 20.1H24.1L27.1 9.4Z"
                    fill={isDark ? "white" : "black"}
                  />
                </svg>
              </span>
              <span
                className={`text-xl font-semibold font-boldonse tracking-wide ${logoTextColor}`}
              >
                The Closure Studio
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className={`flex items-center space-x-21 ${navTextColor}`}>
              <div className="flex items-center justify-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-medium transition-all duration-300 ease-in-out ${navTextColor} relative group inline-block ${
                      pathname === link.href
                        ? "opacity-100 text-blue-600"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 w-0 h-px ${
                        isDark ? "bg-white" : "bg-black"
                      } transition-all duration-500 ease-in-out group-hover:w-full`}
                    />
                  </Link>
                ))}
              </div>
              <div
                className={`font-boldonse ${contactBtnBg} px-3 py-1 rounded-md`}
              >
                <Link href="/contact" className="text-xs font-medium">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating + Button - Always visible on screens < lg, or when navbar is out of view on lg+ */}
      <AnimatePresence>
        {(!isNavbarVisible || isFullScreenMenuOpen) && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={() => {
              setIsFullScreenMenuOpen(!isFullScreenMenuOpen);
              if (!isFullScreenMenuOpen) {
                document.body.classList.add("menu-open");
              } else {
                document.body.classList.remove("menu-open");
              }
            }}
            className={`fixed top-4 right-4 z-50 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 ${
              isDark
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            } rounded-full flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-light transition-all duration-300 shadow-lg hover:scale-110 z-[9999] lg:block`}
            aria-label={isFullScreenMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              className="transform transition-transform duration-300"
              animate={{ rotate: isFullScreenMenuOpen ? 45 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              +
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* + Button for screens < lg - Always visible */}
      <motion.button
        initial={false}
        animate={{ scale: 1, opacity: 1 }}
        onClick={() => {
          setIsFullScreenMenuOpen(!isFullScreenMenuOpen);
          if (!isFullScreenMenuOpen) {
            document.body.classList.add("menu-open");
          } else {
            document.body.classList.remove("menu-open");
          }
        }}
        className={`lg:hidden fixed top-4 right-4 z-50 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${
          isDark
            ? "bg-white text-black hover:bg-gray-200"
            : "bg-black text-white hover:bg-gray-800"
        } rounded-full flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-light transition-all duration-300 shadow-lg hover:scale-110 z-[9998]`}
        aria-label={isFullScreenMenuOpen ? "Close menu" : "Open menu"}
      >
        <motion.span
          className="transform transition-transform duration-300"
          animate={{ rotate: isFullScreenMenuOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          +
        </motion.span>
      </motion.button>

      {/* Full Screen Menu Overlay - Similar to Home Screen */}
      <AnimatePresence>
        {isFullScreenMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 overflow-hidden bg-black"
            onAnimationStart={() => {
              document.body.classList.add("menu-open");
            }}
            onAnimationComplete={() => {
              if (!isFullScreenMenuOpen) {
                document.body.classList.remove("menu-open");
              }
            }}
          >
            {/* Background Image with Overlay */}
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/export.png')",
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
            </motion.div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full text-neutral-300 px-4 sm:px-6 md:px-8 py-4">
              <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-6 md:gap-10 h-full">
                {/* Left Side - Logo and Title */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="font-boldonse flex flex-col justify-between h-full font-semibold text-3xl sm:text-4xl md:text-[5vw] w-full md:w-auto "
                >
                  <div className="flex flex-col gap-2 md:gap-4">
                    <h1 className="text-3xl sm:text-4xl md:text-[5vw]">
                      The Closure
                    </h1>
                    <div className="flex items-center gap-2 md:gap-3">
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="w-8 h-8 sm:w-12 sm:h-12 md:w-[6vw] md:h-[6vw]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 41 41"
                          width="100%"
                          height="100%"
                          className="w-full h-full"
                        >
                          <path
                            d="M27.1 9.4C27.4 8.3 26.4 7.7 25.4 8.4L12.1 17.9C11.1 18.6 11.2 20.1 12.3 20.1H15.9H22.7L17.1 22L14.7 30.8C14.4 31.8 15.4 32.5 16.4 31.8L29.7 22.3C30.7 21.6 30.6 20.1 29.5 20.1H24.1L27.1 9.4Z"
                            fill="white"
                          />
                        </svg>
                      </motion.span>
                      <h1 className="text-3xl sm:text-4xl md:text-[5vw]">
                        Studio<span className="">.</span>
                      </h1>
                    </div>
                  </div>

                  {/* Social Links - Bottom Left */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.7,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="flex flex-col gap-3 md:gap-4 mt-4 md:mt-0 font-instrument-serif p-4 md:p-6"
                  >
                    <p className="text-neutral-400 font-instrument-serif text-xs sm:text-sm">
                      Follow us
                    </p>
                    <div className="flex flex-col gap-2 md:gap-3 text-neutral-200">
                      <Link
                            href="https://www.instagram.com/theclosure.studio/"
                        target="_blank"
                        className="text-sm sm:text-base md:text-lg font-medium hover:text-neutral-100 transition-colors duration-300"
                      >
                        <span className="text-neutral-500 font-medium">
                          (Instagram)
                        </span>{" "}
                        <span className="hover:underline transition-all duration-500">
                          theclosure.studio
                        </span>
                      </Link>
                      <Link
                        href="https://x.com/ClosureStudio"
                        target="_blank"
                        className="text-sm sm:text-base md:text-lg font-medium hover:text-neutral-100 transition-colors duration-300"
                      >
                        <span className="text-neutral-500 font-medium">
                          (X)
                        </span>{" "}
                        <span className="hover:underline transition-all duration-500">
                          ClosureStudio
                        </span>
                      </Link>
                      <Link
                        href="https://www.linkedin.com/the-closure-studio/"
                        target="_blank"
                        className="text-sm sm:text-base md:text-lg font-medium hover:text-neutral-100 transition-colors duration-300"
                      >
                        <span className="text-neutral-500 font-medium">
                          (LinkedIn)
                        </span>{" "}
                        <span className="hover:underline transition-all duration-500">
                          The-Closure-Studio
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Side - Navigation Links */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="flex flex-col items-end md:items-end justify-center gap-6 md:gap-8 font-space-grotesk h-full w-full md:w-auto"
                >
                  <div className="flex flex-col items-end gap-4 sm:gap-6 md:gap-8 text-neutral-300">
                    {navLinks.map((link, index) => (
                      <div key={index} className="flex">
                        <Link
                          href={link.href}
                          onClick={() => {
                            setIsFullScreenMenuOpen(false);
                            document.body.classList.remove("menu-open");
                          }}
                          className={`text-3xl lg:text-4xl xl:text-5xl font-medium transition-all duration-500 ease-in-out relative group font-boldonse text-neutral-400 hover:scale-105`}
                        >
                          {link.label}
                        </Link>
                      </div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.6,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="font-boldonse text-black py-4 md:py-6 rounded-full transition-colors duration-300 w-full md:w-auto"
                  >
                    <Link
                      href="\contact"
                      className="inline-flex items-center gap-2 h-12 sm:h-14 md:h-15 bg-neutral-200 text-black rounded-full text-sm sm:text-base font-semibold transition hover:bg-neutral-800 p-1 group duration-500 hover:text-neutral-900 w-full md:w-auto justify-between"
                    >
                      <span className="px-3 sm:px-4 group-hover:text-neutral-200 text-lg sm:text-xl md:text-2xl text-neutral-800 py-2 sm:py-3 md:py-10">
                        Contact Us
                      </span>{" "}
                      <span className="h-full w-10 sm:w-12 md:w-13 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-neutral-200 group-hover:text-neutral-900 transition duration-200 px-2 flex-shrink-0">
                        <span className="group-hover:-rotate-35 transform transition duration-800 px-3 sm:px-4 md:px-6 relative bottom-0 sm:bottom-1 md:bottom-2 font-bold text-lg sm:text-xl md:text-2xl">
                          →
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
