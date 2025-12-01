"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Web Design",
    categories: "E-commerce | Portfolio | Business Website | Personal Branding",
    description:
      "We design clean, modern, conversion-focused websites that strengthen your brand and improve user engagement. Every design is optimized for mobile, accessibility, SEO, and fast loading to help your business attract and convert customers effectively.",
    benefits: [
      "Higher Conversions – optimized layout",
      "Brand Credibility – modern visuals",
      "SEO Ready – search-friendly build",
      "Mobile First – smooth on devices .....many more",
    ],
    accent: "#8B5CF6",
    link: "/services",
    highlightDots: [
      0, 1, 7, 8, 9, 17, 20, 21, 22, 23, 24, 29, 30, 31, 32, 33, 38, 39, 40, 41,
      42, 47, 48, 49, 50, 51, 56, 57, 58, 59, 60, 63, 71, 72, 73, 79, 80,
    ],
  },

  {
    id: "02",
    title: "Web Development",
    categories: "SaaS | Dashboards | E-commerce | Custom Web Apps",
    description:
      "We build fast, secure, and scalable websites and applications with clean code and modern technology. From e-commerce stores to SaaS dashboards, we ensure high performance, strong security, SEO optimization, and long-term maintainability.",
    benefits: [
      "Fast Performance – optimized codebase",
      "Scalability – grows with business",
      "Technical SEO – ranking improvements",
      "Security – protected architecture",
    ],
    accent: "#F97316",
    link: "/services",
    highlightDots: [
      4, 5, 6, 12, 13, 14, 20, 21, 22, 28, 29, 30, 36, 37, 38, 39, 40, 41, 42,
      43, 50, 51, 58, 59, 66, 67, 74, 75,
    ],
  },

  {
    id: "03",
    title: "Branding & Logo Design",
    categories:
      "Brand Identity | Logo Design | Visual Systems | Brand Strategy",
    description:
      "We create distinctive brand identities and logos that communicate your story clearly. From strategy to final visuals, we deliver systems that stay memorable, consistent, and ready to scale across all platforms.",
    benefits: [
      "Brand Recognition – memorable identity",
      "Differentiation – stand out easily",
      "Consistency – unified visual style",
      "Professional Image – trustworthy look",
    ],
    accent: "#4DD2C5",
    link: "/services",
    highlightDots: [
      2, 6, 12, 14, 20, 21, 22, 23, 24, 28, 29, 31, 33, 34, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 47, 48, 49, 50, 51, 53, 54, 56, 60, 62, 65, 69, 73,
      75, 77, 79,
    ],
  },
];

const textReveal = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const articleVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

function DotPattern({ accent, highlights }) {
  const dots = Array.from({ length: 81 });
  const highlightSet = new Set(highlights);

  return (
    <div className="grid grid-cols-9 gap-1.5 sm:gap-2 md:gap-3">
      {dots.map((_, index) => (
        <span
          key={index}
          className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 rounded-full transition-colors"
          style={{
            backgroundColor: highlightSet.has(index)
              ? accent
              : "rgba(255,255,255,10.35)",
          }}
        />
      ))}
    </div>
  );
}

const ServicesSection = () => {
  return (
    <>
      {/* clip-path definition that mirrors WorkSection cut - responsive */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Small screens - minimal cut */}
          <clipPath id="services-bridge-sm" clipPathUnits="objectBoundingBox">
            <path
              d="M0,0 
                 L0.35,0 
                 L0.38,0.005 
                 L0.62,0.005 
                 L0.65,0 
                 L1,0 
                 L1,1 
                 L0,1 
                 Z"
            />
          </clipPath>
          {/* Medium screens - medium cut */}
          <clipPath id="services-bridge-md" clipPathUnits="objectBoundingBox">
            <path
              d="M0,0 
                 L0.33,0 
                 L0.36,0.01 
                 L0.64,0.01 
                 L0.67,0 
                 L1,0 
                 L1,1 
                 L0,1 
                 Z"
            />
          </clipPath>
          {/* Large screens - full cut */}
          <clipPath id="services-bridge-lg" clipPathUnits="objectBoundingBox">
            <path
              d="M0,0 
                 L0.32,0 
                 L0.35,0.03 
                 L0.65,0.03 
                 L0.68,0 
                 L1,0 
                 L1,1 
                 L0,1 
                 Z"
            />
          </clipPath>
        </defs>
      </svg>

      <section
        id="services"
        className="relative bg-white pb-10 sm:pb-16 md:pb-20 services-section-clip"
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .services-section-clip {
              clip-path: url(#services-bridge-sm);
              -webkit-clip-path: url(#services-bridge-sm);
            }
            @media (min-width: 768px) {
              .services-section-clip {
                clip-path: url(#services-bridge-md);
                -webkit-clip-path: url(#services-bridge-md);
              }
            }
            @media (min-width: 1024px) {
              .services-section-clip {
                clip-path: url(#services-bridge-lg);
                -webkit-clip-path: url(#services-bridge-lg);
              }
            }
          `,
          }}
        />
        <div className="flex items-center justify-between text-neutral-900 font-boldonse text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl p-4 sm:p-6">
          <h2 className="tracking-wider">Services</h2>
          <div className="font-extrabold pr-4 sm:pr-6 md:pr-10 pb-4 sm:pb-6 md:pb-10 text-2xl sm:text-3xl md:text-4xl">
            ↓
          </div>
        </div>
        <div className="mx-auto px-4 sm:px-6 md:px-10 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 space-y-6 sm:space-y-8 md:space-y-10">
          {services.map((service) => (
            <motion.article
              key={service.id}
              className="rounded-2xl sm:rounded-3xl md:rounded-[32px] border border-black bg-white/80 backdrop-blur-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={articleVariants}
            >
              <div className="flex flex-col md:flex-col md:items-start">
                <div className="w-full border-b px-4 sm:px-6 md:px-7 py-4 sm:py-6 md:py-8 font-boldonse text-neutral-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl flex items-center justify-between overflow-hidden">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl">
                    {service.title}
                  </h3>
                  <p className="font-instrument-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl">
                    {service.id}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start justify-between p-4 sm:p-6 md:p-8 gap-4 md:gap-0">
                  <div className="flex-1 space-y-3 sm:space-y-4 px-4 sm:px-6 md:px-7 w-full">
                    <div className="flex flex-col gap-3 sm:gap-4 overflow-hidden">
                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-700 leading-relaxed space-y-1 font-instrument-serif">
                        <motion.span className="block" variants={textReveal}>
                          {service.description}
                        </motion.span>
                        <div className="w-full md:hidden lg:w-80 flex justify-center md:justify-end mt-4 md:mt-0">
                    <div className="rounded-2xl sm:rounded-3xl border border-white/30 bg-linear-to-br from-white/30 to-white/10 p-4 sm:p-6 md:p-8">
                      <DotPattern
                        accent={service.accent}
                        highlights={service.highlightDots}
                      />
                    </div>
                  </div>
                      </div>
                      <div className="text-neutral-600 font-instrument-serif text-base sm:text-lg md:text-xl font-semibold p-4 sm:p-5 md:p-6">
                        {service.benefits.map((ben, index) => (
                          <div key={index} className="mb-2">
                            <motion.span
                              className="block"
                              variants={textReveal}
                            >
                              {ben}
                            </motion.span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed space-y-1">
                      <motion.span className="block" variants={textReveal}>
                        {service.categories}
                      </motion.span>
                    </div>

                    <motion.div
                      className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4"
                      variants={textReveal}
                    >
                      <Link
                        href={service.link}
                        className="inline-flex items-center gap-2 h-9 sm:h-10 bg-neutral-900 text-white rounded-full text-sm sm:text-base font-semibold transition hover:bg-neutral-200 p-1 group duration-500 hover:text-neutral-900"
                      >
                        <span className="px-3 sm:px-4 group-hover:text-neutral-800 text-sm sm:text-base">
                          Know more
                        </span>{" "}
                        <span className="h-full w-8 sm:w-10 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-neutral-800 group-hover:text-neutral-50 transition duration-200 flex-shrink-0">
                          <span className="group-hover:-rotate-35 transform transition duration-800">
                            →
                          </span>
                        </span>
                      </Link>
                    </motion.div>
                  </div>

                  <div className="w-full hidden md:w-72 lg:w-80 md:flex justify-center md:justify-end mt-4 md:mt-0">
                    <div className="rounded-2xl sm:rounded-3xl border border-white/30 bg-linear-to-br from-white/30 to-white/10 p-4 sm:p-6 md:p-8">
                      <DotPattern
                        accent={service.accent}
                        highlights={service.highlightDots}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
