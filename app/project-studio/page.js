"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const stages = [
  {
    number: "01",
    title: "Project Take Up & Requirement Analysis",
    description:
      "We begin by understanding your vision, goals, and specific requirements. Through detailed discussions and analysis, we create a comprehensive project roadmap that aligns perfectly with your business objectives.",
    accent: "#8B5CF6",
    highlightDots: [
      10, 12, 13, 14, 15, 16, 28, 30, 31, 32, 33, 34, 46, 48, 49, 50, 51, 52,
      64, 66, 67, 68, 69, 70,
    ],
  },
  {
    number: "02",
    title: "Client Choice",
    description:
      "You choose the color palette, theme, fonts, and overall aesthetic direction. We present curated options and work with your preferences to establish the visual foundation of your project.",
    accent: "#F97316",
    highlightDots: [
      1, 2, 9, 12, 18, 21, 24, 25, 27, 28, 29, 30, 35, 36, 39, 42, 43, 44, 45,
      48, 50, 53, 54, 57, 60, 61, 62,
    ],
  },
  {
    number: "03",
    title: "Project Design",
    description:
      "Our design team creates wireframes, mockups, and prototypes that bring your vision to life. We focus on user experience, visual appeal, and functionality to ensure your design is both beautiful and effective.",
    accent: "#4DD2C5",
    highlightDots: [
      0, 1, 2, 6, 7, 8, 9, 17, 18, 26, 31, 39, 40, 41, 49, 54, 62, 63, 71, 72,
      73, 74, 78, 79, 80,
    ],
  },
  {
    number: "04",
    title: "Code Development",
    description:
      "Using modern technologies and best practices, we transform your design into a fully functional website or application. Clean, maintainable code ensures optimal performance and scalability.",
    accent: "#8B5CF6",
    highlightDots: [
      2, 3, 5, 6, 10, 16, 19, 25, 27, 28, 34, 35, 45, 46, 52, 53, 55, 61, 64,
      70, 74, 75, 77, 78,
    ],
  },
  {
    number: "05",
    title: "Initial Version and Testing",
    description:
      "We conduct thorough testing across devices and browsers to ensure everything works flawlessly. Performance optimization, bug fixes, and quality assurance are completed before client review.",
    accent: "#F97316",
    highlightDots: [
      4, 11, 13, 15, 22, 31, 39, 41, 47, 51, 55, 61, 63, 64, 65, 66, 67, 68, 69,
      70, 71,
    ],
  },
  {
    number: "06",
    title: "Client Inspection",
    description:
      "You review the initial version and provide feedback. We collaborate closely to refine and adjust elements based on your input, ensuring the final product exceeds your expectations.",
    accent: "#4DD2C5",
    highlightDots: [
      3, 4, 5, 11, 12, 13, 14, 15, 19, 20, 24, 25, 27, 28, 31, 34, 35, 36, 37,
      39, 40, 41, 43, 44, 45, 46, 49, 52, 53, 55, 56, 60, 61, 65, 66, 67, 68,
      69, 75, 76, 77,
    ],
  },
  {
    number: "07",
    title: "Final Version",
    description:
      "After incorporating your feedback, we deliver the polished final version. All features are complete, tested, and ready for deployment. This is your project in its best form.",
    accent: "#8B5CF6",
    highlightDots: [
      0, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25, 29,
      30, 31, 32, 33, 39, 40, 41, 49, 58, 65, 66, 67, 68, 69, 72, 73, 74, 75,
      76, 77, 78, 79, 80,
    ],
  },
  {
    number: "08",
    title: "Project Deployment",
    description:
      "We handle the entire deployment process, ensuring a smooth launch. Your website goes live with proper configuration, hosting setup, and monitoring in place for optimal performance.",
    accent: "#F97316",
    highlightDots: [
      4, 12, 13, 14, 21, 22, 23, 30, 31, 32, 39, 40, 41, 47, 48, 49, 50, 51, 55,
      56, 57, 59, 60, 61, 63, 65, 66, 67, 68, 69, 71, 74, 75, 77, 78,
    ],
  },
  {
    number: "09",
    title: "Maintenance & Updations",
    description:
      "Our relationship continues after launch. We provide ongoing support, regular updates, security patches, and feature enhancements to keep your project running smoothly and up-to-date.",
    accent: "#4DD2C5",
    highlightDots: [
      4, 5, 15, 24, 29, 30, 31, 32, 33, 37, 38, 39, 40, 41, 42, 45, 47, 48, 49,
      50, 51, 56, 57, 58, 59, 60, 66, 68, 74, 76, 78,
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
      delayChildren: 0.1,
    },
  },
};

const articleVariantsNoStagger = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
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
          className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4.5 md:h-4.5 rounded-full transition-colors"
          style={{
            backgroundColor: highlightSet.has(index)
              ? accent
              : "rgba(255,255,255,0)",
          }}
        />
      ))}
    </div>
  );
}

function SplitTitle({ title }) {
  const words = title.split(" ");
  const midPoint = Math.ceil(words.length / 2);
  const firstHalf = words.slice(0, midPoint).join(" ");
  const secondHalf = words.slice(midPoint).join(" ");

  return (
    <>
      <div className="font-boldonse text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        {firstHalf}
      </div>
      {secondHalf && (
        <div className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl">
          {" "}
          {secondHalf}
        </div>
      )}
    </>
  );
}

export default function ProjectStudio() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar theme="black" />
      <section className="relative bg-black pb-20 pt-20">
        {/* Header Section */}
        <div className="mx-auto px-4 sm:px-5 md:px-10 py-12 sm:py-16 md:py-24 flex items-center w-full">
          <div className="h-full w-full">
            <div className="flex items-center justify-between text-white font-boldonse text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl py-4 sm:py-6 md:py-7 px-4 sm:px-8 md:px-12 w-full">
              <h2 className="tracking-wider text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Project Studio
              </h2>
              <div className="font-extrabold pb-4 sm:pb-6 md:pb-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-7xl">
                ↓
              </div>
            </div>
            <div className="text-neutral-300 font-instrument-serif text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-8 md:px-12 max-w-4xl">
              <p>
                Discover how we transform your ideas into exceptional digital
                experiences. Our structured 9-stage approach ensures every
                project is delivered on time, within budget, and exceeds
                expectations.
              </p>
            </div>
          </div>
        </div>

        {/* Stages Section */}
        <div className="mx-auto px-4 sm:px-6 md:px-10 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 space-y-6 sm:space-y-8 md:space-y-10">
          {stages.map((stage, index) => (
            <div key={stage.number}>
              <motion.article
                className="rounded-xl sm:rounded-2xl border border-black bg-neutral-900/80 backdrop-blur-lg px-4 sm:px-8 md:px-12 lg:px-16 pt-4 sm:pt-5 md:pt-6 overflow-hidden flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-0"
                initial="visible"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                variants={
                  index === 0 ? articleVariantsNoStagger : articleVariants
                }
              >
                <div className="flex flex-col  md:items-start w-full md:w-4/5">
                  <div className="w-full pt-4 sm:pt-6 md:pt-8 text-neutral-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl flex items-center justify-between overflow-hidden border-b md:border-b-0 pb-4 md:pb-0">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl flex gap-2 sm:gap-3 flex-col">
                      <SplitTitle title={stage.title} />
                    </h3>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 sm:py-6 md:py-8 w-full max-w-4xl gap-4 md:gap-0">
                    <div className="flex-1 space-y-3 sm:space-y-4 w-full">
                      <div className="flex flex-col gap-3 sm:gap-4 overflow-hidden">
                        <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-300 leading-relaxed space-y-1 font-instrument-serif">
                          <motion.span
                            className="block"
                            variants={textReveal}
                            initial={index === 0 ? "visible" : "hidden"}
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.1 }}
                          >
                            {stage.description}
                          </motion.span>
                        </div>
                      </div>
                      <div className="w-full  flex md:hidden justify-center  pt-5 ">
                  <div className="p-4 sm:p-6 md:p-8">
                    <DotPattern
                      accent={stage.accent}
                      highlights={stage.highlightDots}
                    />
                  </div>
                </div>
                      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl pt-8 sm:pt-12 md:pt-15 font-boldonse relative top-4 sm:top-6 md:top-10 text-neutral-600">
                        Stage - <span className="">{stage.number}</span>
                      </p>
                      
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/5 lg:w-180 md:flex hidden justify-center md:justify-end mt-4 md:mt-0">
                  <div className="p-4 sm:p-6 md:p-8">
                    <DotPattern
                      accent={stage.accent}
                      highlights={stage.highlightDots}
                    />
                  </div>
                </div>
              </motion.article>

              {/* SVG Connector - Only show between cards, not after the last one */}
              {/* {index < stages.length - 1 && (
                <div
                  className={`flex relative top-7 ${
                    index % 2 === 0 ? "justify-start " : "justify-end "
                  } `}
                >
                  <div className="w-full max-w-6xl h-8 z-100">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 202 45"
                      className="my-svg-animation"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        transform:
                          index % 2 === 0
                            ? "rotate(65deg)"
                            : "scaleX(-1) rotate(65deg)",
                        transformOrigin: "center",
                      }}
                    >
                      <path
                        className="animated-path"
                        d="M3 41.657C23.0883 23.0705 39.5765 9.86276 67.236 5.56013C84.5957 2.8597 104.477 6.9178 121.463 10.6465C140.02 14.7199 156.838 17.1804 175.773 15.0766C178.448 14.7793 197.867 9.59351 196.446 8.84164C191.664 6.31003 182.22 3.26306 176.675 3.26306C171.446 3.26306 186.926 5.34686 192.016 6.5446C196.661 7.63757 201.877 5.93812 197.841 10.6465C193.732 15.44 189.575 20.2159 186.109 25.4134"
                        stroke="#ffffff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
              )} */}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">
          <motion.div
            className="rounded-2xl sm:rounded-3xl md:rounded-[32px] border border-black bg-neutral-900 text-white/80 p-4 sm:p-6 md:p-8 lg:p-10 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textReveal}
          >
            <h2 className="text-md sm:text-3xl md:text-4xl lg:text-5xl font-boldonse mb-3 sm:mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-instrument-serif text-neutral-300 mb-4 sm:mb-6 max-w-2xl mx-auto px-4">
              Let&apos;s discuss how we can bring your vision to life with our
              proven 9-stage process.
            </p>
            <Link
              href="\contact"
              className="inline-flex items-center gap-2 h-10 sm:h-12 md:h-14 lg:h-15 bg-neutral-200 text-black rounded-full text-sm sm:text-base font-semibold transition hover:bg-neutral-800 p-1 group duration-200 hover:text-neutral-900 w-full sm:w-auto justify-between"
            >
              <span className="px-3 sm:px-4 group-hover:text-neutral-200 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl py-2 sm:py-3 md:py-4 lg:py-5 text-neutral-800 font-instrument-serif">
                Let&apos;s Talk
              </span>{" "}
              <span className="h-full w-8 sm:w-10 md:w-12 lg:w-13 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-neutral-200 group-hover:text-neutral-900 transition duration-200 px-2 flex-shrink-0">
                <span className="group-hover:-rotate-35 transform transition duration-800 px-2 sm:px-3 md:px-4 lg:px-6 relative text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                  →
                </span>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
