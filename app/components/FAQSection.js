"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const answerVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    y: -10,
  },
  visible: {
    height: "auto",
    opacity: 1,
    y: 0,
    transition: {
      height: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
      opacity: {
        duration: 0.3,
        delay: 0.1,
      },
      y: {
        duration: 0.3,
        delay: 0.1,
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    y: -10,
    transition: {
      height: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
      opacity: {
        duration: 0.2,
      },
      y: {
        duration: 0.2,
      },
    },
  },
};

const faqs = [
  {
    id: 1,
    question: "What services do you offer?",
    answer:
      "We offer comprehensive web design, web development, and branding services. From creating stunning visual designs to building scalable web applications and crafting memorable brand identities, we provide end-to-end solutions for your digital presence.",
  },
  {
    id: 2,
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope and complexity. A simple website might take 4-6 weeks, while a comprehensive web application or full rebranding project could take 8-12 weeks or more. We'll provide a detailed timeline during our initial consultation.",
  },
  {
    id: 3,
    question: "What is your pricing structure?",
    answer:
      "Our pricing is customized based on your specific project requirements. We offer both fixed-price projects and retainer-based arrangements for ongoing work. Contact us for a detailed quote tailored to your needs.",
  },
  {
    id: 4,
    question: "Do you work with small businesses?",
    answer:
      "Absolutely! We work with businesses of all sizes, from startups to established enterprises. We believe every business deserves exceptional design and development, regardless of size.",
  },
  {
    id: 5,
    question: "Can you help with existing projects?",
    answer:
      "Yes, we can help improve, redesign, or maintain existing websites and applications. We'll assess your current setup and provide recommendations for enhancements or complete overhauls.",
  },
  {
    id: 6,
    question: "What technologies do you use?",
    answer:
      "We work with modern web technologies including React, Next.js, Node.js, and various design tools. Our tech stack is chosen based on what's best for your specific project requirements and long-term maintainability.",
  },
  {
    id: 7,
    question: "Do you provide ongoing support?",
    answer:
      "Yes, we offer ongoing maintenance and support packages. This includes updates, security patches, content changes, and technical support. We can discuss support options that fit your needs.",
  },
  {
    id: 8,
    question: "How do we get started?",
    answer:
      "Getting started is easy! Simply reach out through our contact form or email us. We'll schedule a consultation to discuss your project, goals, and requirements. From there, we'll provide a proposal and timeline.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-10 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.h2
            className="  md:text-4xl lg:text-5xl font-bold text-neutral-800 mb-3 sm:mb-4 font-boldonse"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Got questions? We&apos;ve got answers. Find everything you need to
            know about working with us.
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto space-y-3 sm:space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px" }}
        >
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              className="bg-neutral-800 border border-black/20 rounded-lg overflow-hidden backdrop-blur-sm hover:bg-black/90 hover:border-white/20 transition-colors"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 text-left flex items-center justify-between"
                whileHover={{ backgroundColor: "#000000" }}
              >
                <motion.span
                  className="text-sm sm:text-md md:text-xl font-semibold text-neutral-800 pr-3 sm:pr-4"
                  initial={false}
                  animate={{
                    color: openId === faq.id ? "#ffffff" : "#ffffff",
                  }}
                >
                  {faq.question}
                </motion.span>
                <motion.span
                  className="text-xl sm:text-2xl text-white flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white/10"
                  animate={{
                    rotate: openId === faq.id ? 45 : 0,
                    backgroundColor:
                      openId === faq.id
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(255, 255, 255, 0.1)",
                  }}
                  transition={{
                    duration: 0.2,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  whileHover={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  }}
                >
                  +
                </motion.span>
              </motion.button>

              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    variants={answerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="overflow-hidden"
                  >
                    <motion.div
                      className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 pt-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
