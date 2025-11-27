import Image from "next/image";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function About() {
  return (
    <main className=" min-h-screen ">
      <div className="relative bottom-50">
        <Navbar />
      </div>

      <div className="min-h-screen w-screen flex flex-col gap-16 justify-center items-center py-30 px-2">
        <h1 className="font-boldonse lg:text-7xl text-3xl md:text-5xl">The Closure Studio.</h1>
        <div className="max-w-4xl flex flex-col gap-16">
          <p className="font-instrument-serif text-xl tracking-wide text-neutral-400 text-center">
            &quot;At The Closure Studio, we build modern, high-performance
            websites that help businesses grow. We combine clean design, strong
            branding, and scalable technology to create digital experiences that
            look great and work even better. Our goal is simple: deliver
            websites that make you stand out, build trust, and convert visitors
            into customers.&quot;
          </p>
          <div className="flex items-center justify-center bg-[#2514a9] py-2">
            <Image
              src="/favicon.svg"
              alt="icon"
              width={200}
              height={130}
              className=" h-full w-1/2 bg-black rounded-full"
            />
          </div>
          <p className="font-instrument-serif text-xl tracking-wide text-neutral-400 text-center">
            The Closure Studio is a modern web development agency dedicated to
            helping businesses build a powerful and lasting online presence. We
            combine clean design, intuitive user experience, and
            high-performance development to create websites that don’t just look
            good—they deliver results. Our approach is simple: understand your
            brand, identify your goals, and craft digital solutions that elevate
            your business. Whether you’re launching a new idea or refining an
            established brand, we focus on building fast, responsive, and
            scalable websites that attract customers, build trust, and support
            long-term growth. At The Closure Studio, every project is driven by
            clarity, creativity, and a commitment to quality—making sure your
            website becomes your strongest business asset.
          </p>

          <div className="flex flex-col items-center justify-center-safe gap-5">
            <h3 className="text-xl text-neutral-200 text-center">Ready to grow your brand? Let’s connect and make it happen.</h3>
            <div className="font-boldonse  text-black px-4 py-2 rounded-md  transition-colors duration-300 flex items-center justify-center">
            <Link
                      href="\contact"
                      className="inline-flex items-center gap-2 h-12 sm:h-14 md:h-15 bg-neutral-200 text-black rounded-full text-sm sm:text-base font-semibold transition hover:bg-neutral-800 p-1 group duration-500 hover:text-neutral-900 w-full md:w-auto justify-between"
                    >
                      <span className="px-3 sm:px-4 group-hover:text-neutral-200 text-lg sm:text-xl md:text-2xl text-neutral-800 py-2 sm:py-3 md:py-10">
                        Contact Us
                      </span>{" "}
                      <span className="h-full w-10 sm:w-12 md:w-13 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-neutral-200 group-hover:text-neutral-900 transition duration-200 px-2 flex-shrink-0">
                        <span className="group-hover:-rotate-35 transform transition duration-800 px-3 sm:px-4 md:px-6 relative bottom-0 sm:bottom-1 md:bottom-2 font-bold text-lg sm:text-xl md:text-2xl">
                          →
                        </span>
                      </span>
                    </Link>
              </div>
          </div>
        </div>
      </div>
    </main>
  );
}
