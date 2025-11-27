"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// --- Configuration ---
const config = {
  lerpFactor: 0.03, // Slower, smoother animation
  parallaxStrength: 0.06, // Minimal parallax (like 1cm change)
  distortionMultiplier: 2, // Much less distortion
  glassStrength: 0.6, // Subtle glass effect
  glassSmoothness: 0.0001, // Adjusted for subtle stripe appearance
  stripesFrequency: 40, // Less dense stripes
  edgePadding: 0.1,
};

// --- GLSL Shaders ---
// 1. Vertex Shader
const vertexShader = `
varying vec2 vUV;
void main() {
    vUV = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// 2. Fragment Shader
const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uTextureSize;
uniform vec2 uMouse;
uniform float uParallaxStrength;
uniform float uDistortionMultiplier;
uniform float uGlassStrength;
uniform float ustripesFrequency;
uniform float uglassSmoothness;
uniform float uEdgePadding;
varying vec2 vUV;

vec2 getCoverUV(vec2 uv, vec2 textureSize) {
    if (textureSize.x < 1.0 || textureSize.y < 1.0) return uv;
    
    vec2 s = uResolution / textureSize;
    float scale = max(s.x, s.y);
    
    vec2 scaledSize = textureSize * scale;
    vec2 offset = (uResolution - scaledSize) * 0.5;
    
    return (uv * uResolution - offset) / scaledSize;
}

float displacement(float x, float num_stripes, float strength) {
    float modulus = 1.0 / num_stripes;
    return mod(x, modulus) * strength;
}

float fractalGlass(float x) {
    float d = 0.0;
    for (int i = -5; i <= 5; i++) {
        d += displacement(x + float(i) * uglassSmoothness, ustripesFrequency, uGlassStrength);
    }
    d = d / 11.0;
    return x + d;
}

float smoothEdge(float x, float padding) {
    float edge = padding;
    if (x < edge) {
        return smoothstep(0.0, edge, x);
    } else if (x > 1.0 - edge) {
        return smoothstep(1.0 - edge, 1.0, x);
    }
    return 1.0;
}

// Simple box blur approximation (optimized for performance)
vec4 blurSample(sampler2D tex, vec2 uv, vec2 texSize, float blurRadius) {
    vec4 color = vec4(0.0);
    float total = 0.0;
    float samples = 3.0; // Reduced for better performance
    float step = blurRadius / samples;
    
    for (float x = -samples; x <= samples; x += 1.0) {
        for (float y = -samples; y <= samples; y += 1.0) {
            vec2 offset = vec2(x * step, y * step) / texSize;
            color += texture2D(tex, clamp(uv + offset, 0.0, 1.0));
            total += 1.0;
        }
    }
    return color / total;
}

void main() {
    vec2 uv = vUV;
    
    float originalX = uv.x;
    
    float edgeFactor = smoothEdge(originalX, uEdgePadding);
    
    float distortedX = fractalGlass(originalX);
    
    uv.x = mix(originalX, distortedX, edgeFactor);
    
    float distortionFactor = uv.x - originalX;
    
    float parallaxDirection = -sign(0.5 - uMouse.x);
    
    // Very minimal parallax - max 1cm movement
    vec2 parallaxOffset = vec2(
        parallaxDirection * abs(uMouse.x - 0.5) * uParallaxStrength * (1.0 + abs(distortionFactor) * uDistortionMultiplier),
        0.0
    );
    
    parallaxOffset *= edgeFactor;
    
    uv += parallaxOffset;
    
    vec2 coverUV = getCoverUV(uv, uTextureSize);
    
    if (coverUV.x < 0.0 || coverUV.x > 1.0 || coverUV.y < 0.0 || coverUV.y > 1.0) {
        coverUV = clamp(coverUV, 0.0, 1.0);
    }
    
    // Check if texture is valid (size > 1x1 means texture is loaded)
    vec4 color;
    if (uTextureSize.x > 1.0 && uTextureSize.y > 1.0) {
        // Apply subtle blur for backdrop effect (backdrop-sm equivalent)
        color = blurSample(uTexture, coverUV, uTextureSize, 0.3);
    } else {
        // Texture not loaded yet - use pure black
        color = vec4(0.0, 0.0, 0.0, 1.0);
    }
    
    // Calculate which stripe we're in
    float stripeLocalX = fract(originalX * ustripesFrequency);
    
    // Gradient overlay: light black to transparent from left to right on each stripe
    // gradientFactor: 1.0 at left edge of stripe, 0.0 at right edge
    float gradientFactor = 1.0 - stripeLocalX;
    
    // Apply light black overlay (stronger on left, transparent on right)
    // Using a subtle black tint that fades from left to right
    float overlayStrength = gradientFactor * 0.25; // Max 25% darkening on left
    color.rgb = mix(color.rgb, vec3(0.0, 0.0, 0.0), overlayStrength);
    
    gl_FragColor = color;
}
`;

// --- Main React Component ---
const FractalGlassHero = ({ imageUrl = "/export.png" }) => {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const imageRef = useRef(null); // Reference to the hidden <img> for texture loading
  const heroSectionRef = useRef(null); // Reference for scroll detection

  const threeRef = useRef({}); // Store Three.js objects
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const requestRef = useRef(); // For animation frame
  const lerp = (start, end, factor) => start + (end - start) * factor;

  // --- Scene Initialization and Cleanup ---
  const [webglFailed, setWebglFailed] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isFullScreenMenuOpen, setIsFullScreenMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/project-studio", label: "Project Studio" },
    { href: "/services", label: "Services" },
  ];

  useEffect(() => {
    // --- Animation Loop ---
    const animate = () => {
      const { current: refs } = threeRef;
      const { renderer, scene, camera, material } = refs;
      if (!renderer || !material) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      mouse.current.x = lerp(
        mouse.current.x,
        targetMouse.current.x,
        config.lerpFactor
      );
      mouse.current.y = lerp(
        mouse.current.y,
        targetMouse.current.y,
        config.lerpFactor
      );

      material.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    const { current: refs } = threeRef;
    const container = containerRef.current;
    const imageElement = imageRef.current; // Get the actual image DOM element

    if (!container || !imageElement) {
      console.error("Container or Image Element not found.");
      return;
    }

    // 1. Setup Renderer, Scene, Camera (optimized for performance)
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
        preserveDrawingBuffer: false,
      });
    } catch (error) {
      console.error("Failed to create WebGLRenderer:", error);
      setWebglFailed(true);
      return;
    }

    const gl = renderer.getContext();
    if (!gl) {
      console.error("WebGL context could not be obtained.");
      setWebglFailed(true);
      renderer.dispose();
      return;
    }
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Append renderer's DOM element to the container
    container.appendChild(renderer.domElement);
    // Style the canvas to fill the container
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // 2. Setup Material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null }, // Will be set once image loads
        uResolution: {
          value: new THREE.Vector2(
            container.clientWidth,
            container.clientHeight
          ),
        },
        uTextureSize: {
          value: new THREE.Vector2(1, 1), // Initial dummy value
        },
        uMouse: { value: new THREE.Vector2(mouse.current.x, mouse.current.y) },
        uParallaxStrength: { value: config.parallaxStrength },
        uDistortionMultiplier: { value: config.distortionMultiplier },
        uGlassStrength: { value: config.glassStrength },
        ustripesFrequency: { value: config.stripesFrequency },
        uglassSmoothness: { value: config.glassSmoothness },
        uEdgePadding: { value: config.edgePadding },
      },
      vertexShader,
      fragmentShader,
    });

    // 3. Create Mesh
    const geometry = new THREE.PlaneGeometry(2, 2); // A plane that covers the whole screen
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Store refs for cleanup and animation
    refs.renderer = renderer;
    refs.scene = scene;
    refs.camera = camera;
    refs.material = material;
    refs.geometry = geometry;
    refs.mesh = mesh;

    // 4. Load Image Texture - optimized for fast loading
    const loadTexture = () => {
      // Check if image is already loaded
      if (imageElement.complete && imageElement.naturalWidth > 0) {
        // Image already loaded, create texture immediately
        const texture = new THREE.Texture(imageElement);
        texture.needsUpdate = true;
        material.uniforms.uTexture.value = texture;
        material.uniforms.uTextureSize.value.set(
          imageElement.naturalWidth,
          imageElement.naturalHeight
        );
        console.log("Texture loaded from cached image.");
        return;
      }

      // Image not loaded yet, use TextureLoader
      const textureLoader = new THREE.TextureLoader();
      textureLoader.setCrossOrigin("anonymous");

      textureLoader.load(
        imageUrl,
        (texture) => {
          // On load - set the loaded texture
          material.uniforms.uTexture.value = texture;
          material.uniforms.uTextureSize.value.set(
            texture.image.width,
            texture.image.height
          );
          console.log("Texture loaded successfully.");
        },
        undefined, // On progress callback
        (error) => {
          // On error - shader will use fallback color
          console.warn("Error loading texture image:", error);
        }
      );
    };

    // Try to load texture immediately
    loadTexture();

    // Also listen for image load event in case it loads after our check
    const handleImageLoad = () => {
      if (
        !material.uniforms.uTexture.value ||
        material.uniforms.uTextureSize.x <= 1
      ) {
        const texture = new THREE.Texture(imageElement);
        texture.needsUpdate = true;
        material.uniforms.uTexture.value = texture;
        material.uniforms.uTextureSize.value.set(
          imageElement.naturalWidth,
          imageElement.naturalHeight
        );
      }
    };
    imageElement.addEventListener("load", handleImageLoad);

    // Start animation immediately
    animate();

    // --- Event Handlers ---
    const handleMouseMove = (e) => {
      targetMouse.current.x = e.clientX / window.innerWidth;
      targetMouse.current.y = 1.0 - e.clientY / window.innerHeight; // Invert Y for shader consistency
    };
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      refs.renderer.setSize(width, height);
      refs.camera.aspect = width / height; // Important for non-orthographic cameras, but good practice
      refs.camera.updateProjectionMatrix();
      refs.material.uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    // Cleanup function for useEffect
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      imageElement.removeEventListener("load", handleImageLoad);

      if (refs.renderer) {
        if (refs.mesh) refs.scene.remove(refs.mesh);
        if (refs.material) refs.material.dispose();
        if (refs.geometry) refs.geometry.dispose();
        refs.renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [imageUrl]);

  // IntersectionObserver to detect when hero section leaves viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "0px",
      }
    );

    const currentHero = heroSectionRef.current;
    if (currentHero) {
      observer.observe(currentHero);
    }

    return () => {
      if (currentHero) {
        observer.unobserve(currentHero);
      }
    };
  }, []);

  if (webglFailed) {
    return (
      <div
        ref={heroSectionRef}
        className="relative w-full h-screen overflow-hidden bg-black"
      >
        {/* Hero Section with Background Image */}
        <section className="hero w-full h-full relative">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${imageUrl}')`,
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
          </div>

          {/* Content Overlay */}
          <div className="hero-content absolute inset-0 z-10 text-neutral-50 px-4 sm:px-6 md:px-8 py-4">
            <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-6 md:gap-10 h-full">
              {/* Left Side - Logo and Taglines */}
              <div className="flex flex-col justify-between h-full w-full md:w-auto">
                <div className="font-boldonse flex flex-col font-bold text-3xl sm:text-4xl md:text-[5vw] lg:gap-4 gap-2">
                  <h1 className="text-3xl sm:text-4xl md:text-[5vw]">
                    The Closure
                  </h1>
                  <div className="flex items-center gap-2 md:gap-3">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 41 41"
                        width="100%"
                        height="100%"
                        className="w-8 h-8 sm:w-12 sm:h-12 md:w-[6vw] md:h-[6vw]"
                      >
                        <path
                          d="M27.1 9.4C27.4 8.3 26.4 7.7 25.4 8.4L12.1 17.9C11.1 18.6 11.2 20.1 12.3 20.1H15.9H22.7L17.1 22L14.7 30.8C14.4 31.8 15.4 32.5 16.4 31.8L29.7 22.3C30.7 21.6 30.6 20.1 29.5 20.1H24.1L27.1 9.4Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-[5vw]">
                      Studio<span className="">.</span>
                    </h1>
                  </div>
                </div>
              </div>

              {/* Right Side - Navigation - Hidden on screens < lg */}
              <div className="hidden lg:flex flex-col items-end md:items-end justify-between h-full pb-10 md:pb-20 w-full md:w-auto">
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 sm:gap-6 md:gap-18 font-space-grotesk mb-4 md:mb-0">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-neutral-100">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`font-medium transition-all duration-300 ease-in-out relative group inline-block ${
                          pathname === link.href
                            ? "opacity-100 text-white"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-white/50 transition-all duration-500 ease-in-out group-hover:w-full" />
                      </Link>
                    ))}
                  </div>

                  <div className="font-boldonse bg-white text-black px-2 sm:px-3 py-1 rounded-md">
                    <Link
                      href="/contact"
                      className="text-xs sm:text-sm font-medium"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Right Card - How We Build Projects - Visible on all screens */}
              <div className="p-2 absolute bottom-15 md:bottom-5 right-0 md:right-5">
                <div className="flex flex-col gap-3 md:gap-4 pb-4 md:pb-8 font-instrument-serif max-w-full md:max-w-115 bg-neutral-900 p-4 md:p-6 rounded-xl md:rounded-2xl w-full md:w-auto">
                  <h2 className="text-sm sm:text-base md:text-lg text-neutral-300">
                    Your business needs a website that stands out in the modern
                    era. We build websites that boost your business. Let&apos;s
                    work together to level up your business.
                  </h2>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center w-full gap-2">
                    <Link
                      href="/contact"
                      className="flex items-center justify-between gap-2 h-10 bg-neutral-800 text-white rounded-full text-xs sm:text-sm md:text-base transition hover:bg-neutral-200 p-1 group duration-500 hover:text-neutral-900 w-full sm:w-1/2"
                    >
                      <span className="px-3 sm:px-4 group-hover:text-neutral-800">
                        Let&apos;s Talk
                      </span>{" "}
                      <span className="h-full w-8 sm:w-10 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-neutral-800 group-hover:text-neutral-50 transition duration-200 flex-shrink-0">
                        <span className="group-hover:-rotate-35 transform transition duration-800">
                          →
                        </span>
                      </span>
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center justify-between gap-2 h-10 bg-neutral-800 text-white rounded-full text-xs sm:text-sm md:text-base transition hover:bg-neutral-200 p-1 group duration-500 hover:text-neutral-900 w-full sm:w-1/2"
                    >
                      <span className="px-3 sm:px-4 group-hover:text-neutral-800">
                        Explore Studio
                      </span>{" "}
                      <span className="h-full w-8 sm:w-10 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-neutral-800 group-hover:text-neutral-50 transition duration-200 flex-shrink-0">
                        <span className="group-hover:-rotate-35 transform transition duration-800">
                          →
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Floating + Button - appears when hero is out of view or menu is open on lg+ screens */}
        <AnimatePresence>
          {(!isHeroVisible || isFullScreenMenuOpen) && (
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
              className="hidden lg:flex fixed top-4 right-4 z-[9999] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#2514a9]/50 text-white rounded-full items-center justify-center text-3xl sm:text-4xl md:text-5xl font-light hover:bg-[#2514a9] transition-all duration-300 shadow-2xl hover:scale-110 backdrop-blur-sm"
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
          className="lg:hidden fixed top-4 right-4 z-[9999] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#2514a9]/50 text-white rounded-full flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-light hover:bg-[#2514a9] transition-all duration-300 shadow-2xl hover:scale-110 backdrop-blur-sm"
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

        {/* Full Screen Menu Overlay - Same as normal version */}
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
                    className="font-boldonse flex flex-col justify-between h-full font-bold text-3xl sm:text-4xl md:text-[5vw] w-full md:w-auto lg:gap-4 gap-2"
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
                      <div className="flex flex-col gap-2 md:gap-3 text-neutral-300">
                        <Link
                          href="/contact"
                          className="text-sm md:text-lg font-medium hover:text-neutral-100 transition-colors duration-300"
                        >
                          <span className="text-neutral-500 font-medium">
                            (Instagram)
                          </span>{" "}
                          <span className="hover:underline transition-all duration-500">
                            theclosure.studio
                          </span>
                        </Link>
                        <Link
                          href="/contact"
                          className="text-sm md:text-lg font-medium hover:text-neutral-100 transition-colors duration-300"
                        >
                          <span className="text-neutral-500 font-medium">
                            (X)
                          </span>{" "}
                          <span className="hover:underline transition-all duration-500">
                            theclosure.studio
                          </span>
                        </Link>
                        <Link
                          href="/contact"
                          className="text-sm md:text-lg font-medium hover:text-neutral-100 transition-colors duration-300"
                        >
                          <span className="text-neutral-500 font-medium">
                            (LinkedIn)
                          </span>{" "}
                          <span className="hover:underline transition-all duration-500">
                            The Closure Studio
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
                        <motion.div
                          key={link.href}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.2 + index * 0.1,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                          className="flex"
                        >
                          <Link
                            href={link.href}
                            onClick={() => {
                              setIsFullScreenMenuOpen(false);
                              document.body.classList.remove("menu-open");
                            }}
                            className={`text-3xl lg:text-4xl xl:text-5xl font-medium transition-all duration-500 ease-in-out relative group font-boldonse hover:scale-105 ${
                              pathname === link.href
                                ? "text-neutral-100"
                                : "text-neutral-500 hover:text-neutral-100"
                            }`}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
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
                      className="font-boldonse transition-colors duration-300 py-4 md:py-6 w-full md:w-auto"
                    >
                      <Link
                        href="\contact"
                        className="inline-flex items-center gap-2 h-12 sm:h-14 md:h-15 bg-neutral-200 text-black rounded-full text-sm sm:text-base font-semibold transition hover:bg-neutral-800 p-1 group duration-500 hover:text-neutral-900 w-full md:w-auto justify-between"
                      >
                        <span className="px-3 sm:px-4 group-hover:text-neutral-200 text-lg sm:text-xl md:text-2xl text-neutral-800 py-2 sm:py-3 md:py-5">
                          Contact Us
                        </span>{" "}
                        <span className="h-full w-10 sm:w-12 md:w-13 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-neutral-200 group-hover:text-neutral-900 transition duration-200 px-2 flex-shrink-0">
                          <span className="group-hover:-rotate-35 transform transition duration-800 px-3 sm:px-4 md:px-6 relative bottom-1 sm:bottom-1 md:bottom-2 font-bold text-lg sm:text-xl md:text-2xl">
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
      </div>
    );
  }

  return (
    <>
      <div
        ref={heroSectionRef}
        className="relative w-full h-screen  overflow-hidden bg-black"
      >
        {/* Hero Section Container (THREE.js canvas will be injected here) */}
        <section ref={containerRef} className="hero w-full h-full relative">
          {/* Image element - preloaded for faster rendering */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Hero Background"
            className="hidden"
            loading="eager"
            decoding="async"
          />

          {/* Gradient Overlay - Light black to transparent from left to right */}
          {/* <div className="absolute inset-0 z-5 pointer-events-none bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div> */}

          {/* Content Overlay */}
          <div className="hero-content absolute inset-0 z-10 text-neutral-50 px-4 sm:px-6 md:px-8 py-4">
            <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-6 md:gap-10 h-full">
              {/* Left Side - Logo and Taglines */}
              <div className="flex flex-col justify-between h-full w-full md:w-auto">
                <div className="font-boldonse flex flex-col font-bold text-3xl sm:text-4xl md:text-[5vw] lg:gap-4 gap-2">
                  <h1 className="text-3xl sm:text-4xl md:text-[5vw]">
                    The Closure
                  </h1>
                  <div className="flex items-center gap-2 md:gap-3">
                    <span>
                      <Image
                        src="/favicon.svg"
                        alt="Logo"
                        width={135}
                        height={125}
                        className="w-8 h-8 sm:w-12 sm:h-12 md:w-[6vw] md:h-[6vw]"
                      />
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-[5vw]">
                      Studio<span className="">.</span>
                    </h1>
                  </div>
                </div>

                {/* Taglines */}
              </div>

              {/* Right Side - Navigation - Hidden on screens < lg */}
              <div className="hidden lg:flex flex-col items-end md:items-end justify-between h-full pb-10 md:pb-20 w-full md:w-auto">
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 sm:gap-6 md:gap-18 font-space-grotesk mb-4 md:mb-0">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-neutral-100">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={` font-medium transition-all duration-300 ease-in-out relative group inline-block ${
                          pathname === link.href
                            ? "opacity-100 text-white"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-white/50 transition-all duration-500 ease-in-out group-hover:w-full" />
                      </Link>
                    ))}
                  </div>

                  <div className="font-boldonse bg-white text-black px-2 sm:px-3 py-1 rounded-md">
                    <Link
                      href="/contact"
                      className="text-xs sm:text-sm font-medium"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Right Card - How We Build Projects - Visible on all screens */}
              <div className="p-2 absolute bottom-15 md:bottom-5 right-0 md:right-5">
                <div className=" flex flex-col gap-3 md:gap-4 pb-4 md:pb-8 font-instrument-serif max-w-full md:max-w-115 bg-neutral-900 p-4 md:p-6 rounded-xl md:rounded-2xl w-full md:w-auto">
                  <h2 className="text-sm sm:text-base md:text-lg text-neutral-300">
                    Your business needs a website that stands out in the modern
                    era. We build websites that boost your business. Let&apos;s
                    work together to level up your business.
                  </h2>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center w-full gap-2">
                    <Link
                      href="/contact"
                      className="flex items-center justify-between gap-2 h-10 bg-neutral-800 text-white rounded-full text-xs sm:text-sm md:text-base transition hover:bg-neutral-200 p-1 group duration-500 hover:text-neutral-900 w-full sm:w-1/2"
                    >
                      <span className="px-3 sm:px-4 group-hover:text-neutral-800">
                        Let&apos;s Talk
                      </span>{" "}
                      <span className="h-full w-8 sm:w-10 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-neutral-800 group-hover:text-neutral-50 transition duration-200 flex-shrink-0">
                        <span className="group-hover:-rotate-35 transform transition duration-800">
                          →
                        </span>
                      </span>
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center justify-between gap-2 h-10 bg-neutral-800 text-white rounded-full text-xs sm:text-sm md:text-base transition hover:bg-neutral-200 p-1 group duration-500 hover:text-neutral-900 w-full sm:w-1/2"
                    >
                      <span className="px-3 sm:px-4 group-hover:text-neutral-800">
                        Explore Studio
                      </span>{" "}
                      <span className="h-full w-8 sm:w-10 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-neutral-800 group-hover:text-neutral-50 transition duration-200 flex-shrink-0">
                        <span className="group-hover:-rotate-35 transform transition duration-800">
                          →
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Floating + Button - appears when hero is out of view or menu is open on lg+ screens */}
      <AnimatePresence>
        {(!isHeroVisible || isFullScreenMenuOpen) && (
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
            className="hidden lg:flex fixed top-4 right-4 z-[9999] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#2514a9]/50 text-white rounded-full items-center justify-center text-3xl sm:text-4xl md:text-5xl font-light hover:bg-[#2514a9] transition-all duration-300 shadow-2xl hover:scale-110 backdrop-blur-sm"
            aria-label={isFullScreenMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              className="transform transition-transform duration-300 "
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
        className="lg:hidden fixed top-4 right-4 z-[9999] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#2514a9]/50 text-white rounded-full flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-light hover:bg-[#2514a9] transition-all duration-300 shadow-2xl hover:scale-110 backdrop-blur-sm"
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
                  className="font-boldonse flex flex-col justify-between h-full font-bold text-3xl sm:text-4xl md:text-[5vw] w-full md:w-auto lg:gap-4 gap-2"
                >
                  <div className="flex flex-col  gap-2 md:gap-4">
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
                      >
                        <Image
                          src="/favicon.svg"
                          alt="Logo"
                          width={135}
                          height={125}
                          className="w-8 h-8 sm:w-12 sm:h-12 md:w-[6vw] md:h-[6vw]"
                        />
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
                    <div className="flex flex-col gap-2 md:gap-3 text-neutral-300">
                      <Link
                        href="/contact"
                        className="text-sm md:text-lg font-medium hover:text-neutral-100 transition-colors duration-300"
                      >
                        <span className="text-neutral-500 font-medium">
                          (Instagram)
                        </span>{" "}
                        <span className="hover:underline transition-all duration-500">
                          theclosure.studio
                        </span>
                      </Link>
                      <Link
                        href="/contact"
                        className="text-sm md:text-lg font-medium hover:text-neutral-100 transition-colors duration-300"
                      >
                        <span className="text-neutral-500 font-medium">
                          (X)
                        </span>{" "}
                        <span className="hover:underline transition-all duration-500">
                          theclosure.studio
                        </span>
                      </Link>
                      <Link
                        href="/contact"
                        className="text-sm md:text-lg font-medium hover:text-neutral-100 transition-colors duration-300"
                      >
                        <span className="text-neutral-500 font-medium">
                          (LinkedIn)
                        </span>{" "}
                        <span className="hover:underline transition-all duration-500">
                          The Closure Studio
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
                      <motion.div
                        key={link.href}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.2 + index * 0.1,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="flex "
                      >
                        <Link
                          href={link.href}
                          onClick={() => {
                            setIsFullScreenMenuOpen(false);
                            document.body.classList.remove("menu-open");
                          }}
                          className={`text-3xl  lg:text-4xl xl:text-5xl font-medium transition-all duration-500 ease-in-out relative group font-boldonse hover:scale-105 ${
                            pathname === link.href
                              ? "text-neutral-100"
                              : "text-neutral-500 hover:text-neutral-100"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
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
                    className="font-boldonse transition-colors duration-300 py-4 md:py-6 w-full md:w-auto"
                  >
                    <Link
                      href="\contact"
                      className="inline-flex items-center gap-2 h-12 sm:h-14 md:h-15 bg-neutral-200 text-black rounded-full text-sm sm:text-base font-semibold transition hover:bg-neutral-800 p-1 group duration-500 hover:text-neutral-900 w-full md:w-auto justify-between"
                    >
                      <span className="px-3 sm:px-4 group-hover:text-neutral-200 text-lg sm:text-xl md:text-2xl text-neutral-800 py-2 sm:py-3 md:py-5">
                        Contact Us
                      </span>{" "}
                      <span className="h-full w-10 sm:w-12 md:w-13 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-neutral-200 group-hover:text-neutral-900 transition duration-200 px-2 flex-shrink-0">
                        <span className="group-hover:-rotate-35 transform transition duration-800 px-3 sm:px-4 md:px-6 relative bottom-1 sm:bottom-1 md:bottom-2 font-bold text-lg sm:text-xl md:text-2xl">
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
};

export default FractalGlassHero;
