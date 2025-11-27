"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Hide footer on about page
  if (pathname === "/about" || pathname === '/contact') {
    return null;
  }

  return <Footer />;
}
