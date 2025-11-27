import Link from "next/link";

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-black py-10 sm:py-16 md:py-20">
      <div className="w-screen flex flex-col gap-6 sm:gap-8 md:gap-10 items-center justify-center py-6 sm:py-8 md:py-10 px-4 sm:px-6">
        <h1 className="font-boldonse text-neutral-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
          Let&apos;s get in touch.
        </h1>
        <p className="max-w-2xl text-neutral-500 font-instrument-serif text-base sm:text-lg md:text-xl lg:text-2xl text-center px-4">
          Have a project in mind? Let&apos;s discuss how we can help bring your
          vision to life. We&apos;re here to answer any questions you may have.
        </p>

        <div className="text-neutral-300 text-base md:text-lg lg:text-xl xl:text-2xl font-instrument-serif flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 lg:gap-14 items-center justify-center px-4">
          <h2 className="text-center sm:text-left">
            <span className="text-neutral-500 font-medium">(email)</span>{" "}
            <span className="break-all sm:break-normal">
              theclosurestudio96@gmail.com
            </span>
          </h2>
          <h2 className="text-center sm:text-left">
            <span className="text-neutral-500 font-medium">(contact)</span>{" "}
            Koushik / +91 63053 10032
          </h2>
          <h2 className="text-center sm:text-left">
            <span className="text-neutral-500 font-medium">(location)</span>{" "}
            Hyderabad, India
          </h2>
        </div>
        <div className="text-neutral-400 rounded-full border border-neutral-600 h-12 w-12 sm:h-14 sm:w-14 md:h-15 md:w-15 flex items-center justify-center font-instrument-serif text-lg sm:text-xl md:text-2xl">
          <p>or</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 px-4">
          <p className="text-neutral-500 text-base sm:text-lg md:text-xl lg:text-2xl font-instrument-serif text-center max-w-2xl">
            Click the link below to contact us. If you have any questions,
            don&apos;t hesitate to reach out!
          </p>

          <Link
            href="\contact"
            className="inline-flex items-center gap-2 h-12 sm:h-14 md:h-15 bg-neutral-200 text-black rounded-full text-sm sm:text-base font-semibold transition hover:bg-neutral-800 p-1 group duration-200 hover:text-neutral-900 w-full sm:w-auto justify-between"
          >
            <span className="px-3 sm:px-4 group-hover:text-neutral-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl py-3 sm:py-4 md:py-5 text-neutral-800 font-instrument-serif">
              Let&apos;s Talk
            </span>{" "}
            <span className="h-full w-10 sm:w-12 md:w-13 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-neutral-200 group-hover:text-neutral-900 transition duration-200 px-2 flex-shrink-0">
              <span className="group-hover:-rotate-35 transform transition duration-800 px-3 sm:px-4 md:px-6 relative">
                →
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
