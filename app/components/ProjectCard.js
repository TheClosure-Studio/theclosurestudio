"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export default function ProjectCard({
  image,
  title,
  type,
  category,
  year,
  link = "#",
  white
}) {
  const cardRef = useRef(null);

  // Mouse parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Scroll parallax value
  const scrollY = useMotionValue(0);

  // Smooth spring animations for mouse parallax
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  const smoothScrollY = useSpring(scrollY, { stiffness: 200, damping: 40 });

  // Transform mouse values to parallax offset (minimal - 2%)
  const parallaxX = useTransform(smoothX, (value) => value * 0.01);
  const parallaxY = useTransform(smoothY, (value) => value * 0.01);

  // Transform scroll value to parallax offset (minimal - 10%)
  const scrollParallaxY = useTransform(smoothScrollY, (value) => value * 0.04);

  // Combine mouse and scroll parallax with constraints
  // With scale 1.15, we have more room for movement while keeping image within bounds
  const constrainedX = useTransform(parallaxX, (value) => {
    // Constrain to keep image within bounds (scale 1.15 allows ~7.5% movement)
    return Math.max(-15, Math.min(15, value));
  });

  const constrainedY = useTransform(
    [parallaxY, scrollParallaxY],
    ([mouse, scroll]) => {
      const combined = mouse + scroll;
      // Constrain to keep image within bounds (scale 1.15 allows ~7.5% movement)
      return Math.max(-20, Math.min(20, combined));
    }
  );

  // Handle scroll parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate card center position relative to viewport center
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = cardCenter - viewportCenter;

      scrollY.set(distanceFromCenter);
    };

    // Initial calculation
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [scrollY]);

  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <Link href={link} className="block group">
      <motion.div
        ref={cardRef}
        className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Laptop Mockup Container */}
        <div className="relative  ">
          {/* Laptop Base */}
          <div className="relative bg-linear-to-b  rounded-lg  ">
            {/* Laptop Screen */}
            <div className="relative bg-black rounded overflow-hidden h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem]">
              {/* Screen Content with Parallax */}
              <motion.div
                className="absolute inset-0 w-full h-full"
                style={{
                  x: constrainedX,
                  y: constrainedY,
                  scale: 1.15, // Increased scale to prevent black background from showing
                }}
              >
                {image ? (
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <h3 className="text-2xl font-bold mb-2">{title}</h3>
                      <p className="text-sm opacity-80">{type}</p>
                    </div>
                  </div>
                )}
              </motion.div>
              {/* Screen Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
          {/* Laptop Bottom */}
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 absolute inset-0 w-full h-full flex items-start justify-between flex-col">
          <div>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${
                white ? "text-white" : "text-neutral-900"
              }`}
            >
              {title}
            </h2>

            <h3
              className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-1 sm:mt-2 ${
                white ? "text-white/70" : "text-neutral-900/70"
              }`}
            >
              {type}
            </h3>
          </div>

          <div className="flex items-center justify-between w-full mt-auto">
            <h3
              className={`text-xs sm:text-sm md:text-base font-semibold ${
                white ? "text-white/80" : "text-neutral-800"
              }`}
            >
              {category}, {year}
            </h3>
          </div>
        </div>


        {/* Hover Indicator */}
      </motion.div>
    </Link>
  );
}
