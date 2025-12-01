const baseUrl = "https://theclosurestudio.vercel.app";

export default function sitemap() {
  const routes = [
    "",
    "/about",
    "/work",
    "/services",
    "/project-studio",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
