import FractalGlassHero from "./components/FractalGlassHero";
import WorkSection from "./components/WorkSection";
import ServicesSection from "./components/ServicesSection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import AnimatedText from "./components/AnimatedText";
import Link from "next/link";

// The image path should point to your public/background.png or an external URL
const HERO_IMAGE_URL = "/export.png";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <FractalGlassHero imageUrl={HERO_IMAGE_URL} />
      {/* Add more content below the hero section */}
      <div className=" bg-black relative z-30">
        <WorkSection />
        <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 py-16 sm:py-20 md:py-30 px-2 sm:px-6">
          <div className="w-full flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 py-10 sm:py-16 md:py-20">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-boldonse text-neutral-300 px-2">
              Why Your Business Needs a Modern Website!
            </h2>
            <AnimatedText
              text="In the digital era, your website is your hardest-working employee. It acts as a 24/7 salesperson—answering questions, showcasing your value, and capturing leads even while you sleep. However, simply 'being online' is no longer enough. To truly grow, your business needs a modern, high-performance website that stands out from the noise, builds instant trust, and turns casual visitors into loyal customers."
              className="text-2xl lg:text-4xl font-instrument-serif text-center max-w-7xl text-neutral-400 px-1 tracking-tight"
            />
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                href="\contact"
                className="inline-flex items-center gap-2 h-9 sm:h-10 bg-neutral-900 text-white rounded-full text-sm sm:text-base font-semibold transition hover:bg-neutral-200 p-1 group duration-500 hover:text-neutral-900"
              >
                <span className="px-3 sm:px-4 group-hover:text-neutral-800 text-sm sm:text-base">
                  Contact us
                </span>{" "}
                <span className="h-full w-8 sm:w-10 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-neutral-800 group-hover:text-neutral-50 transition duration-200 flex-shrink-0">
                  <span className="group-hover:-rotate-35 transform transition duration-800">
                    →
                  </span>
                </span>
              </Link>
            </div>
          </div>
          <div className="p-2 sm:p-6 md:p-10 flex flex-col gap-6 sm:gap-8 md:gap-10 items-center justify-center relative pt-16 sm:pt-20 md:pt-30">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-boldonse text-center px-4">
              Our Approach to Building Your Project
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center overflow-x-auto w-full gap-4 md:gap-2 px-0 lg:px-4">
              <div className="flex-col flex p-3 sm:p-4 bg-neutral-900 w-full md:w-1/4 rounded gap-3 sm:gap-5 min-w-[280px]">
                <h3 className="text-lg sm:text-xl">
                  Project Takeup & Requirement Analysis
                </h3>
                <p className="font-instrument-serif tracking-wide text-neutral-400 text-sm sm:text-base">
                We begin by understanding your vision, goals, and specific requirements. Through detailed discussions and analysis, we create a comprehensive project roadmap that aligns perfectly with your business objectives.
                </p>
              </div>
              <svg
                className="hidden md:block w-8 md:w-12 lg:w-16 h-auto"
                viewBox="0 0 225 75"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 58.1151C35.9237 60.1367 64.1957 53.2742 82.9999 24.5151C89.33 14.8339 91.8913 -1.32279 74.1111 4.60398C57.5945 10.1095 48.7621 34.6091 55.1778 50.2929C64.8056 73.8289 92.9371 74.9924 114.644 69.3151C148.228 60.5317 181.089 48.8653 211 31.2706C217.093 27.6867 173.175 20.0151 187.8 24.5151C198.123 27.6912 207.525 27.7151 218.2 27.7151C225.887 27.7151 220.97 30.2928 216.511 34.1151C209.264 40.3271 202.139 50.3578 199.8 59.7151"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="flex-col flex p-3 md:p-4 bg-neutral-900 w-full md:w-1/4 rounded gap-3 sm:gap-5 min-w-[280px]">
                <h3 className="text-lg sm:text-xl">
                Client Choice & Color Palette 
                </h3>
                <p className="font-instrument-serif tracking-wide text-neutral-400 text-sm sm:text-base">
                You choose the color palette, theme, fonts, and overall aesthetic direction. We present curated options and work with your preferences to establish the visual foundation of your project.
                </p>
              </div>
              <svg
                className="hidden md:block w-8 md:w-12 lg:w-16 h-auto"
                viewBox="0 0 225 75"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 58.1151C35.9237 60.1367 64.1957 53.2742 82.9999 24.5151C89.33 14.8339 91.8913 -1.32279 74.1111 4.60398C57.5945 10.1095 48.7621 34.6091 55.1778 50.2929C64.8056 73.8289 92.9371 74.9924 114.644 69.3151C148.228 60.5317 181.089 48.8653 211 31.2706C217.093 27.6867 173.175 20.0151 187.8 24.5151C198.123 27.6912 207.525 27.7151 218.2 27.7151C225.887 27.7151 220.97 30.2928 216.511 34.1151C209.264 40.3271 202.139 50.3578 199.8 59.7151"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="flex-col flex p-3 sm:p-4 bg-neutral-900 w-full md:w-1/4 rounded gap-3 sm:gap-5 min-w-[280px]">
                <h3 className="text-lg sm:text-xl">
                  Project Design Sytem & Wireframes
                </h3>
                <p className="font-instrument-serif tracking-wide text-neutral-400 text-sm sm:text-base">
                Our design team creates wireframes, mockups, and prototypes that bring your vision to life. We focus on user experience, visual appeal, and functionality to ensure your design is both beautiful and effective.
                </p>
              </div>
              <svg
                className="hidden md:block w-8 md:w-12 lg:w-16 h-auto"
                viewBox="0 0 225 75"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 58.1151C35.9237 60.1367 64.1957 53.2742 82.9999 24.5151C89.33 14.8339 91.8913 -1.32279 74.1111 4.60398C57.5945 10.1095 48.7621 34.6091 55.1778 50.2929C64.8056 73.8289 92.9371 74.9924 114.644 69.3151C148.228 60.5317 181.089 48.8653 211 31.2706C217.093 27.6867 173.175 20.0151 187.8 24.5151C198.123 27.6912 207.525 27.7151 218.2 27.7151C225.887 27.7151 220.97 30.2928 216.511 34.1151C209.264 40.3271 202.139 50.3578 199.8 59.7151"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="flex-col flex p-3 sm:p-4 bg-neutral-900 w-full md:w-1/4 rounded gap-3 sm:gap-5 relative min-w-[280px]">
                <h3 className="text-lg sm:text-xl">
                Initial Version & Testing v1.0
                </h3>
                <p className="font-instrument-serif tracking-wide text-neutral-400 text-sm sm:text-base">
                We conduct thorough testing across devices and browsers to ensure everything works flawlessly. Performance optimization, bug fixes, and quality assurance are completed before client review.
                </p>
              </div>
              <div>
              <Link
              href="\contact"
              className="inline-flex items-center  h-12   text-neutral-300 rounded-full text-sm  font-semibold transition  p-1 group duration-500  w-full  justify-between"
            >
              <span className=" text-sm  py-1  text-neutral-200">
               more...
              </span>{" "}
              <span className=" text-white rounded-full flex items-center justify-center transition duration-200  flex-shrink-0">
                <span className="-rotate-35 transform transition duration-800   relative">
                →
                </span>
              </span>
            </Link>
              </div>
            </div>
          </div>
          <div className="max-w-4xl flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-15 px-4">
            <p className="font-instrument-serif tracking-wide text-neutral-500/80 font-semibold text-center text-sm sm:text-base md:text-lg">
              Curious about our workflow? Click on Project Studio to see a
              breakdown of our entire development lifecycle, from the first line
              of code to the final launch.
            </p>
            <Link
              href="\contact"
              className="inline-flex items-center gap-2 h-12 sm:h-14 md:h-15 bg-neutral-200 text-black rounded-full text-sm sm:text-base font-semibold transition hover:bg-neutral-800 p-1 group duration-500 hover:text-neutral-900 w-full sm:w-auto justify-between"
            >
              <span className="px-3 sm:px-4 group-hover:text-neutral-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl py-3 sm:py-4 md:py-5 text-neutral-800">
                Project Studio
              </span>{" "}
              <span className="h-full w-10 sm:w-12 md:w-13 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-neutral-200 group-hover:text-neutral-900 transition duration-200 px-2 flex-shrink-0">
                <span className="group-hover:-rotate-35 transform transition duration-800 px-3 sm:px-4 md:px-6 relative">
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>
        <div className="relative ">
          <ServicesSection />
        </div>

        <FAQSection />
        <ContactSection />
      </div>
    </main>
  );
}
