import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <main className="min-h-screen bg-white">
      <div className="relative bottom-50">
        <Navbar />
      </div>

      <div className="w-full min-h-screen flex flex-col gap-6 sm:gap-8 md:gap-10 items-center justify-center py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8">
        <h1 className="font-boldonse text-neutral-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center">
          Let&apos;s get in touch.
        </h1>
        <p className="max-w-2xl text-neutral-700 font-instrument-serif text-base sm:text-lg md:text-xl lg:text-2xl text-center px-4">
          Have a project in mind? Let&apos;s discuss how we can help bring your
          vision to life. We&apos;re here to answer any questions you may have.
        </p>

        <div className="text-neutral-900 text-base sm:text-lg md:text-xl lg:text-2xl font-instrument-serif flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-14 items-center justify-center font-semibold px-4">
          <h2 className="text-center sm:text-left break-words">
            <span className="text-neutral-600 font-medium">(email)</span>{" "}
            <span className="break-all">theclosurestudio96@gmail.com</span>
          </h2>
          <h2 className="text-center sm:text-left">
            <span className="text-neutral-600 font-medium">(contact)</span>{" "}
            Koushik / +91 63053 10032
          </h2>
          <h2 className="text-center sm:text-left">
            <span className="text-neutral-600 font-medium">(location)</span>{" "}
            Hyderabad, India
          </h2>
        </div>
        <div className="text-neutral-600 rounded-full border h-12 w-12 sm:h-14 sm:w-14 md:h-15 md:w-15 flex items-center justify-center font-instrument-serif text-lg sm:text-xl md:text-2xl">
          <p>or</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 pb-8 sm:pb-12 md:pb-15 px-4">
          <p className="text-neutral-900 text-base sm:text-lg md:text-xl lg:text-2xl font-instrument-serif text-center">
            Click the link below to contact us. If you have any questions,
            don&apos;t hesitate to reach out!
          </p>

          <div className="font-boldonse bg-black text-white px-4 sm:px-5 py-2 sm:py-3 rounded-md">
            <Link
              href="https://tally.so/r/5BX5QM"
              target="_blank"
              className="text-lg sm:text-xl md:text-2xl font-medium"
            >
              Reach Out
            </Link>
          </div>
        </div>
        <div className="text-neutral-900 text-base sm:text-lg md:text-xl lg:text-2xl font-instrument-serif flex flex-col gap-3 sm:gap-4 items-center justify-center px-4 sm:px-5 py-4 sm:py-5 rounded w-full">
          <p className="text-center">Follow us on Social Platforms</p>
          <div className="flex flex-col sm:flex-row items-center justify-center max-w-5xl gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full">
            <div>
              <Link
                href="https://www.instagram.com/theclosure.studio/"
                target="_blank"
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium"
              >
                <h2 className="text-center sm:text-left">
                  <span className="text-neutral-600 font-medium">
                    (Instagram)
                  </span>{" "}
                  <span className="hover:underline transition-all duration-500">
                    theclosure.studio
                  </span>
                </h2>
              </Link>
            </div>
            <div>
              <Link
                href="https://x.com/ClosureStudio"
                target="_blank"
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium"
              >
                <h2 className="text-center sm:text-left">
                  <span className="text-neutral-600 font-medium">(X)</span>{" "}
                  <span className="hover:underline transition-all duration-500">
                    ClosureStudio
                  </span>
                </h2>
              </Link>
            </div>
            <div>
              <Link
                href="https://www.linkedin.com/the-closure-studio/"
                target="_blank"
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium"
              >
                <h2 className="text-center sm:text-left">
                  <span className="text-neutral-600 font-medium">
                    (LinkedIn)
                  </span>{" "}
                  <span className="hover:underline transition-all duration-500">
                    The-Closure-Studio
                  </span>
                </h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
