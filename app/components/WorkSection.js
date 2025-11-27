import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: 1,
    image: "/t1.jpg",
    title: "Summr",
    type: "Branding & 3D Website",
    category: "Branding",
    year: "2024",
    link: "/work/summr",
    white : false
  },
  {
    id: 2,
    image: "/t2.jpg",
    title: "E-Commerce Platform",
    type: "E-Commerce Website",
    category: "E-Commerce",
    year: "2024",
    link: "/work/ecommerce",
    white : true
  },
  {
    id: 3,
    image: "/t1.jpg",
    title: "Corporate Website",
    type: "Corporate Website",
    category: "Corporate",
    year: "2023",
    link: "/work/corporate",
    white : false
  },
  {
    id: 4,
    image: "/t2.jpg",
    title: "Techvenchure Dubai",
    type: "3D Website",
    category: "Web Development",
    year: "2024",
    link: "/work/techvenchure",
    white : true
  },
];

export default function WorkSection() {
  return (
    <>
      {/* SVG clip-path for bridge-like shape with responsive cutout */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Small screens - minimal cut */}
          <clipPath id="bridge-cutout-sm" clipPathUnits="objectBoundingBox">
            <path
              d="M0,0 
                 L0.35,0 
                 L0.38,0.01 
                 L0.62,0.01 
                 L0.65,0 
                 L1,0 
                 L1,1 
                 L0,1 
                 Z"
            />
          </clipPath>
          {/* Medium screens - medium cut */}
          <clipPath id="bridge-cutout-md" clipPathUnits="objectBoundingBox">
            <path
              d="M0,0 
                 L0.33,0 
                 L0.36,0.02 
                 L0.64,0.02 
                 L0.67,0 
                 L1,0 
                 L1,1 
                 L0,1 
                 Z"
            />
          </clipPath>
          {/* Large screens - full cut */}
          <clipPath id="bridge-cutout-lg" clipPathUnits="objectBoundingBox">
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
        id="work"
        className="bg-white relative rounded-b work-section-clip"
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            .work-section-clip {
              clip-path: url(#bridge-cutout-sm);
              -webkit-clip-path: url(#bridge-cutout-sm);
            }
            @media (min-width: 768px) {
              .work-section-clip {
                clip-path: url(#bridge-cutout-md);
                -webkit-clip-path: url(#bridge-cutout-md);
              }
            }
            @media (min-width: 1024px) {
              .work-section-clip {
                clip-path: url(#bridge-cutout-lg);
                -webkit-clip-path: url(#bridge-cutout-lg);
              }
            }
          `
        }} />
        <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="flex items-center justify-between text-neutral-900 font-boldonse text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl pb-6 sm:pb-8 md:pb-10">
            <h2 className="tracking-wider">Work</h2>
            <div className="font-extrabold pr-4 sm:pr-6 md:pr-8 lg:pr-10 pb-4 sm:pb-6 md:pb-8 lg:pb-12 text-xl sm:text-2xl md:text-3xl lg:text-4xl">↓</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 pb-8 sm:pb-10 md:pb-12 lg:pb-14">
            {projects.map((project, index) => (
              <div
                key={index}
                className={index % 3 === 0 ? "col-span-1 sm:col-span-2" : "col-span-1"}
              >
                <ProjectCard
                  key={project.id}
                  image={project.image}
                  title={project.title}
                  type={project.type}
                  category={project.category}
                  year={project.year}
                  link={project.link}
                  white={project.white}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
