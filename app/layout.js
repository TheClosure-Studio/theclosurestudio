import "./globals.css";
import ConditionalFooter from "./components/ConditionalFooter";
import LenisProvider from "./components/LenisProvider";
import LoadingAnimation from "./components/LoadingAnimation";
import ScrollToTop from "./components/ScrollToTop";
import { fontVariables } from "./fonts/fonts";

const siteUrl = "https://theclosurestudio.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Closure Studio",
  description:
    "Transform your digital vision into reality. Professional web experiences, branding and product design crafted for ambitious teams.",
  keywords: [
    "The Closure Studio",
    "web development agency",
    "Next.js studio",
    "branding and UI/UX",
    "Framer Motion",
    "creative studio",
  ],
  authors: [{ name: "The Closure Studio" }],
  creator: "The Closure Studio",
  openGraph: {
    title: "The Closure Studio — Websites, Products & Brands",
    description:
      "A multidisciplinary studio building bold websites, immersive product experiences and premium brand systems.",
    url: siteUrl,
    siteName: "The Closure Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og.jpg`,
        width: 1200,
        height: 630,
        alt: "The Closure Studio — Digital products, websites and brand design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Closure Studio",
    description:
      "Websites, product experiences and brand systems for teams that want to stand out.",
    images: [`${siteUrl}/og.jpg`],
    creator: "@ClosureStudio",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fontVariables}>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "The Closure Studio",
              url: siteUrl,
              logo: `${siteUrl}/favicon.svg`,
              sameAs: [
                "https://www.instagram.com/theclosure.studio/",
                "https://x.com/ClosureStudio",
                "https://www.linkedin.com/the-closure-studio/",
              ],
            }),
          }}
        />
        <LoadingAnimation />
        <ScrollToTop />
        <LenisProvider>
          {children}
          <ConditionalFooter />
        </LenisProvider>
      </body>
    </html>
  );
}
