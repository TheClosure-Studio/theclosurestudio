"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change or page refresh
    window.scrollTo(0, 0);

    // Also use Lenis if available
    if (typeof window !== "undefined") {
      const lenisInstance = window.lenis;
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true });
      }
    }
  }, [pathname]);

  return null;
}
