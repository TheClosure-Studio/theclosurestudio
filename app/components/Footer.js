"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Top Section - Time/Location and Navigation */}
      <div className="border-b border-neutral-600/50 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          {/* Left - Time and Location */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="w-2 h-2 rounded-full bg-blue-900"></span>
              <div className="flex flex-col">
                <span className="text-neutral-400 font-instrument-serif text-xs sm:text-sm tracking-wide">
                  HYDERABAD, INDIA
                </span>
              </div>
            </div>
          </div>

          {/* Right - Navigation */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6 md:gap-8 font-medium text-sm sm:text-base">
            <Link
              href="/"
              className="hover:text-neutral-300 transition-colors relative group inline-block"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-in-out group-hover:w-full" />
            </Link>
            <Link
              href="/work"
              className="hover:text-neutral-300 transition-colors relative group inline-block"
            >
              Work
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-in-out group-hover:w-full" />
            </Link>
            <Link
              href="/project-studio"
              className="hover:text-neutral-300 transition-colors relative group inline-block"
            >
              Project Studio
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-in-out group-hover:w-full" />
            </Link>
            <Link
              href="/about"
              className="hover:text-neutral-300 transition-colors relative group inline-block"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-in-out group-hover:w-full" />
            </Link>
            <Link
              href="/contact"
              className="hover:text-neutral-300 transition-colors relative group inline-block"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-in-out group-hover:w-full" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative border-b border-neutral-600/50">
        <div className="text-neutral-900 text-base sm:text-lg md:text-xl lg:text-2xl font-instrument-serif flex flex-col gap-3 sm:gap-4 items-center justify-around px-4 sm:px-5 py-4 sm:py-5 rounded border-b border-white/10 pb-10 sm:pb-12 md:pb-15">
          <p className="text-center">Follow us on Social Platforms</p>
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between gap-4 sm:gap-6 md:gap-10 lg:gap-20 text-neutral-300 w-full lg:w-5xl">
            <div className="text-center sm:text-left">
              <Link
                href="https://www.instagram.com/theclosure.studio/"
                target="_blank"
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium"
              >
                <h2>
                  <span className="text-neutral-600 font-medium">
                    (Instagram)
                  </span>{" "}
                  <span className="hover:underline transition-all duration-500">
                    theclosure.studio
                  </span>
                </h2>
              </Link>
            </div>
            <div className="text-center sm:text-left">
              <Link
                href="https://x.com/ClosureStudio"
                target="_blank"
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium"
              >
                <h2>
                  <span className="text-neutral-600 font-medium">(X)</span>{" "}
                  <span className="hover:underline transition-all duration-500">
                    ClosureStudio
                  </span>
                </h2>
              </Link>
            </div>
            <div className="text-center sm:text-left">
              <Link
                href="https://www.linkedin.com/the-closure-studio/"
                target="_blank"
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium"
              >
                <h2>
                  <span className="text-neutral-600 font-medium">
                    (LinkedIn)
                  </span>{" "}
                  <span className="hover:underline transition-all duration-500">
                    The Closure Studio
                  </span>
                </h2>
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 h-full pt-20 sm:pt-24 md:pt-30 max-w-7xl flex flex-col sm:flex-row justify-between items-center  gap-4 sm:gap-0">
          {/* Bottom Left - Logo and Tagline */}
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 justify-center">
              <Link
                href="/"
                className="text-2xl sm:text-2xl md:text-3xl font-boldonse flex items-end justify-center"
              >
                
                <span className="">
                  {" "}
                  <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 41 41"
              width="30"
              height="30"
              className="h-12 w-12 md:h-14 md:w-14  relative top-2.5"
            >
              <path
                d="M27.1 9.4C27.4 8.3 26.4 7.7 25.4 8.4L12.1 17.9C11.1 18.6 11.2 20.1 12.3 20.1H15.9H22.7L17.1 22L14.7 30.8C14.4 31.8 15.4 32.5 16.4 31.8L29.7 22.3C30.7 21.6 30.6 20.1 29.5 20.1H24.1L27.1 9.4Z"
                fill="#22ff"
              
               
              />
            </svg>
                  {/* <Image
                    src="/favicon.svg"
                    alt="Logo"
                    width={80}
                    height={100}
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10"
                  /> */}
                </span>The Closure Studio.
              </Link>
            </div>
           
          </div>

          {/* Bottom Right - Copyright */}
          <div className="text-center sm:text-right">
            <p className="text-xs sm:text-sm text-neutral-300">
              &copy; 2026 The Closure Studio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
