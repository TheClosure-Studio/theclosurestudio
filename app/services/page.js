"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const services = [
  {
    id: "01",
    title: "Web Design",
    description:
      "We design clean, modern, conversion-focused websites that strengthen your brand and improve user engagement. Every design is optimized for mobile, accessibility, SEO, and fast loading to help your business attract and convert customers effectively.",

    accent: "#8B5CF6",

    categoryCards: [
      {
        title: "E-commerce Design",
        description:
          "Create stunning online storefronts that convert visitors into customers with intuitive navigation and compelling product displays. We offer a wide range of services to help you create a website that is both beautiful and functional.",
        features: [
          "Product showcase layouts  | Shopping cart design | Checkout flow optimization | Mobile shopping experience | Desktop shopping experience | Payment gateway integration | Payment success page ",
          
        ],
        highlightDots: [
          9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 26, 27, 29, 30, 32, 33, 35, 36,
          38, 39, 41, 42, 44, 45, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63,
          66, 67, 68, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        ],
      },
      {
        title: "Portfolio Websites",
        description:
          "Showcase your work beautifully with portfolio designs that highlight your projects and tell your story effectively. we design portfolio websites that are both beautiful and functional.",
        features: [
          "Project galleries | Case study layouts | About page design | Contact integration | Blog page design "
        ],
        highlightDots: [
          2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 22, 29, 30, 38, 39, 48, 49,
          50, 60, 68, 76,
        ],
      },
      {
        title: "Business Websites",
        description:
          "Professional business websites that establish credibility and help you connect with your target audience effectively. We build website that establish credibility and help you connect with your target audience effectively.",
        features: [
          "Service page layouts | Team section design | Testimonial displays | Call-to-action optimization ",
          
        ],
        highlightDots: [
          0, 1, 2, 9, 10, 11, 12, 13, 18, 19, 20, 21, 22, 23, 24, 28, 29, 30,
          31, 32, 33, 34, 35, 38, 39, 40, 41, 42, 43, 44, 49, 50, 51, 52, 53,
          60, 61, 62, 66, 70, 71, 74, 80,
        ],
      },
      {
        title: "Personal Branding",
        description:
          "Build your personal brand online with custom designs that reflect your unique personality and professional expertise. We build personal branding websites that are both beautiful and functional.",
        features: [
          "Personal brand identity | Blog layout design | Social media integration | Resume/portfolio pages ",
        ],
        highlightDots: [
          0, 8, 10, 16, 20, 21, 22, 23, 24, 29, 33, 37, 43, 45, 46, 47, 48, 49,
          50, 51, 52, 53, 55, 61, 65, 69, 75, 76, 77,
        ],
      },
    ],
    detailedBenefits: [
      {
        title: "Higher Conversions",
        subtitle: "Optimized Layout",
        description:
          "Every element of your design is strategically placed to guide visitors toward taking action. We use proven conversion optimization techniques, clear call-to-actions, and intuitive user flows that turn visitors into customers.",
      },
      {
        title: "Brand Credibility",
        subtitle: "Modern Visuals",
        description:
          "First impressions matter. Our modern, professional designs instantly communicate quality and trustworthiness, helping you stand out from competitors and build lasting relationships with your audience.",
      },
      {
        title: "SEO Ready",
        subtitle: "Search-Friendly Build",
        description:
          "Beautiful design that search engines love. We structure your content and design elements to be easily discoverable, helping you rank higher and attract organic traffic to your website.",
      },
      {
        title: "Mobile First",
        subtitle: "Smooth on Devices",
        description:
          "With most users browsing on mobile devices, we design with mobile in mind first. Your website will look and function perfectly on phones, tablets, and desktops, providing an excellent experience everywhere.",
      },
    ],
  },
  {
    id: "02",
    title: "Web Development",
    description:
      "We build fast, secure, and scalable websites and applications with clean code and modern technology. From e-commerce stores to SaaS dashboards, we ensure high performance, strong security, SEO optimization, and long-term maintainability.",
    accent: "#F97316",

    categoryCards: [
      {
        title: "SaaS Applications",
        description:
          "Build scalable software-as-a-service platforms with subscription management, user authentication, and payment integration. We build SaaS applications that are both beautiful and functional.",
        features: [
          "User authentication & authorization | Subscription billing systems | Multi-tenant architecture | API integrations ",
        ],
        highlightDots: [
          2,
          3,
          4,
          5,
          6,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          18,
          19,
          20,
          22,
          24,
          25,
          26, // Eyes are empty (21, 23)
          27,
          28,
          29,
          31,
          33,
          34,
          35,
          36,
          37,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          46,
          47,
          48,
          49,
          50,
          51,
          52,
          53,
          54,
          55,
          56,
          57,
          58,
          59,
          60,
          61,
          62,
          63,
          65,
          67,
          69,
          71,
          72,
          74,
          76,
          78,
          80,
        ],
      },
      {
        title: "Dashboards",
        description:
          "Create powerful data visualization dashboards that help businesses make informed decisions with real-time analytics. We build dashboards that are both beautiful and functional.",
        features: [
          "Real-time data visualization | Customizable widgets | Export & reporting tools | Role-based access control ",
        ],
        highlightDots: [
          0, 8, 10, 13, 16, 20, 21, 22, 23, 24, 27, 28, 29, 30, 31, 32, 33, 34,
          35, 38, 39, 40, 41, 42, 45, 46, 47, 48, 49, 50, 51, 52, 53, 56, 60,
          64, 70, 72, 80,
        ],
      },
      {
        title: "E-commerce",
        description:
          "Develop full-featured online stores with shopping carts, payment processing, inventory management, and order tracking. We build e-commerce websites that are both beautiful and functional.",
        features: [
          "Shopping cart & checkout | Payment gateway integration | Inventory management | Order tracking system ",
        ],
        highlightDots: [
          4, 5, 12, 13, 14, 21, 22, 23, 24, 29, 31, 32, 38, 39, 40, 41, 42, 49,
          50, 51, 58, 59, 60, 65, 66, 67, 68, 69, 70, 74, 75, 76, 77, 78, 79,
        ],
      },
      {
        title: "Custom Web Apps",
        description:
          "Tailored web applications built to your exact specifications, solving unique business challenges with custom solutions. We build custom web applications that are both beautiful and functional.",
        features: [
          "Custom functionality | Third-party integrations | Scalable architecture | Maintenance & support  ",
        ],
        highlightDots: [
          4, 11, 13, 15, 19, 21, 22, 23, 25, 28, 30, 31, 32, 34, 36, 37, 38, 39,
          40, 41, 42, 43, 44, 45, 46, 49, 52, 53, 55, 58, 61, 65, 66, 67, 68,
          69, 75, 76, 77,
        ],
      },
    ],
    detailedBenefits: [
      {
        title: "Fast Performance",
        subtitle: "Optimized Codebase",
        description:
          "We write clean, efficient code that loads quickly and runs smoothly. Our optimization techniques include code splitting, lazy loading, and performance monitoring to ensure your website responds instantly to user interactions.",
      },
      {
        title: "Scalability",
        subtitle: "Grows with Business",
        description:
          "Your application is built to handle growth. We architect solutions that can scale from startup to enterprise level without requiring complete rebuilds, saving you time and money as you expand.",
      },
      {
        title: "Technical SEO",
        subtitle: "Ranking Improvements",
        description:
          "Beyond content, we optimize the technical foundation of your site. Fast loading times, proper schema markup, and clean URL structures help search engines understand and rank your content higher.",
      },
      {
        title: "Security",
        subtitle: "Protected Architecture",
        description:
          "Security is built into every layer of your application. We implement best practices for data protection, secure authentication, and regular security audits to keep your business and customers safe.",
      },
    ],
  },
  {
    id: "03",
    title: "Branding & Logo Design",
    description:
      "We create distinctive brand identities and logos that communicate your story clearly. From strategy to final visuals, we deliver systems that stay memorable, consistent, and ready to scale across all platforms. We build brand identities and logos that are both beautiful and functional.",
    accent: "#4DD2C5",

    categoryCards: [
      {
        title: "Brand Identity",
        description:
          "Develop a complete brand identity system that reflects your values, mission, and unique positioning in the market. We build brand identity systems that are both beautiful and functional.",
        features: [
          "Brand strategy development | Visual identity systems | Brand guidelines | Tone of voice definition ",
        ],
        highlightDots: [
          2, 3, 4, 5, 6, 10, 16, 18, 22, 26, 27, 30, 31, 32, 35, 36, 39, 40, 41,
          44, 45, 48, 49, 50, 53, 54, 58, 62, 64, 70, 74, 75, 76, 77, 78,
        ],
      },
      {
        title: "Logo Design",
        description:
          "Create memorable logos that instantly communicate your brand essence and leave a lasting impression on your audience. We build logos that are both beautiful and functional.",
        features: [
          "Multiple logo concepts | Logo variations | Color palette selection | Typography pairing  ",
        ],
        highlightDots: [
          4, 12, 13, 14, 21, 22, 23, 31, 40, 48, 49, 50, 56, 57, 58, 59, 60, 65,
          66, 67, 68, 69, 74, 75, 76, 77, 78,
        ],
      },
      {
        title: "Visual Systems",
        description:
          "Build comprehensive visual systems that ensure consistency across all touchpoints, from digital to print materials. We build visual systems that are both beautiful and functional.",
        features: [
          "Design system creation | Component libraries | Style guide documentation | Asset management ",
        ],

        highlightDots: [
          0, 8, 10, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32,
          33, 35, 38, 40, 42, 47, 48, 49, 50, 51, 55, 57, 59, 61, 63, 65, 69,
          71, 72, 73, 79, 80,
        ],
      },
      {
        title: "Brand Strategy",
        description:
          "Define your brand positioning, messaging, and strategy to ensure every element aligns with your business goals. We build brand strategy systems that are both beautiful and functional.",
        features: [
          "Market positioning | Target audience analysis | Competitive research | Brand messaging framework   ",
        ],
        highlightDots: [
          0, 1, 2, 3, 4, 6, 7, 8, 13, 15, 18, 19, 20, 22, 24, 26, 27, 31, 33,
          35, 36, 38, 39, 40, 42, 44, 45, 47, 51, 53, 54, 56, 57, 58, 59, 60,
          62, 63, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        ],
      },
    ],
    detailedBenefits: [
      {
        title: "Brand Recognition",
        subtitle: "Memorable Identity",
        description:
          "A strong brand identity makes you instantly recognizable. We create distinctive visual elements and consistent messaging that help customers remember and choose you over competitors, building long-term brand equity.",
      },
      {
        title: "Differentiation",
        subtitle: "Stand Out Easily",
        description:
          "In a crowded market, standing out is essential. We help you identify what makes you unique and translate that into a brand identity that clearly differentiates you from competitors, attracting your ideal customers.",
      },
      {
        title: "Consistency",
        subtitle: "Unified Visual Style",
        description:
          "Consistency builds trust. We create comprehensive brand guidelines that ensure your visual identity remains cohesive across all platforms, from your website to social media to print materials.",
      },
      {
        title: "Professional Image",
        subtitle: "Trustworthy Look",
        description:
          "First impressions are everything. A professionally designed brand identity immediately communicates quality and credibility, helping you build trust with potential customers and partners from the first interaction.",
      },
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

// Dot Pattern Component with different structures
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

export default function Services() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="relative bg-white pb-10 sm:pb-16 md:pb-20 pt-10 sm:pt-16 md:pt-20">
        <div className="px-1 sm:px-6 md:px-10 py-12 sm:py-20 md:py-25">
          <div className="flex items-center justify-between text-neutral-900 font-boldonse text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl px-4 sm:px-5">
            <h2 className="tracking-wider text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
              Services Overview
            </h2>
            <div className="font-extrabold pr-4 sm:pr-6 md:pr-10 pb-4 sm:pb-6 md:pb-10 text-xl sm:text-2xl md:text-7xl">
              ↓
            </div>
          </div>
          <div className="text-neutral-700 font-instrument-serif text-base sm:text-lg md:text-xl pb-4 sm:pb-6 px-4 sm:px-5 pt-3">
            <p>
              We offer a wide range of services to help you achieve your goals.
            </p>
            <p>
              We are a team of experts who are passionate about helping you
              achieve your goals. We are a team of experts who are passionate
              about helping you achieve your goals.
            </p>
          </div>
        </div>

        <div className="mx-auto px-2 sm:px-6 md:px-10 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 space-y-12 sm:space-y-16 md:space-y-20">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="space-y-6 sm:space-y-8 md:space-y-10 border rounded-xl sm:rounded-2xl border-black"
            >
              {/* Main Service Card */}
              <motion.article
                className="backdrop-blur-lg"
                initial="visible"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                variants={
                  index === 0 ? articleVariantsNoStagger : articleVariants
                }
              >
                <div className="flex flex-col  md:items-start">
                  <div className="w-full border-b px-4 sm:px-6 md:px-7 py-4 sm:py-6 md:py-8 font-boldonse text-neutral-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl flex items-center justify-between overflow-hidden bg-neutral-900 rounded-t-xl sm:rounded-t-2xl">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl">
                      {service.title}
                    </h3>
                    <p className="font-instrument-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl">
                      {service.id}
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 sm:p-6 md:p-8">
                    <div className="flex-1 space-y-3 sm:space-y-4 px-4 sm:px-6 md:px-7 w-full">
                      <div className="flex flex-col gap-3 sm:gap-4 overflow-hidden">
                        <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-700 leading-relaxed space-y-1 font-instrument-serif">
                          <motion.span
                            className="block"
                            variants={textReveal}
                            initial={index === 0 ? "visible" : "hidden"}
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.1 }}
                          >
                            {service.description}
                          </motion.span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4">
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 h-9 sm:h-10 bg-neutral-900 text-white rounded-full text-sm sm:text-base font-semibold transition hover:bg-neutral-200 p-1 group duration-500 hover:text-neutral-900"
                          >
                            <span className="px-3 sm:px-4 group-hover:text-neutral-800 text-sm sm:text-base">
                              Let&apos;s Talk
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
              </motion.article>

              {/* Category Cards Section */}
              <div className="space-y-4 sm:space-y-6 px-2 sm:px-6 md:px-7">
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {service.categoryCards.map((category, index) => (
                    <motion.div
                      key={index}
                      className="rounded-lg sm:rounded-xl border border-black bg-white overflow-hidden p-4 sm:p-6 md:p-8"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={textReveal}
                      custom={index}
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
                        {/* Content Section */}
                        <div className="flex flex-col gap-3 sm:gap-4 justify-between">
                          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-boldonse text-neutral-900 mb-2 sm:mb-3">
                            {category.title}
                          </h3>
                          <p className="text-neutral-700 font-instrument-serif mb-3 sm:mb-4 text-base sm:text-lg md:text-xl">
                            {category.description}
                          </p>
                          <div className="w-full  flex md:hidden justify-center  pb-4 md:mt-0 md:pb-10">
                          <div className=" p-2">
                            <DotPattern
                              accent={service.accent}
                              highlights={category.highlightDots}
                            />
                          </div>
                        </div >
                          <p className="text-neutral-700 font-instrument-serif mb-3 sm:mb-4 text-base sm:text-lg md:text-xl md:pt-10">{category.features.join(" | ")}</p>
                        </div>

                        {/* Dot Pattern Section */}
                        <div className="w-full md:w-72 lg:w-80 md:flex hidden justify-center md:justify-end mt-4 md:mt-0">
                          <div className="rounded-2xl sm:rounded-3xl border border-white/30 bg-linear-to-br from-white/30 to-white/10 p-4 sm:p-6 md:p-8">
                            <DotPattern
                              accent={service.accent}
                              highlights={category.highlightDots}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Detailed Benefits Section */}
              <div className="space-y-4 sm:space-y-6 px-4 sm:px-8 md:px-15 p-6 sm:p-8 md:p-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-boldonse text-neutral-900">
                  Benefits
                </h2>
                <div className="space-y-4 sm:space-y-6 pt-3 sm:pt-5">
                  {service.detailedBenefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className={`border-b border-black bg-white/80 ${
                        index === service.detailedBenefits.length - 1
                          ? "border-b-0"
                          : "border-b"
                      }`}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={textReveal}
                      custom={index}
                    >
                      <div className="flex items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <span
                          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-boldonse"
                          style={{ color: service.accent }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 items-end">
                          <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-boldonse text-neutral-900 mb-1">
                            {benefit.title}
                          </h3>
                          <p className="text-sm sm:text-lg text-neutral-600 font-instrument-serif">
                            {benefit.subtitle}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
