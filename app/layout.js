import "./globals.css";
import ConditionalFooter from "./components/ConditionalFooter";
import LenisProvider from "./components/LenisProvider";
import LoadingAnimation from "./components/LoadingAnimation";
import ScrollToTop from "./components/ScrollToTop";
import { fontVariables } from "./fonts/fonts";

export const metadata = {
  title: "The Closure Studio",
  description:
    "Transform your digital vision into reality. Professional web development services that close the gap between your ideas and your audience.",
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
