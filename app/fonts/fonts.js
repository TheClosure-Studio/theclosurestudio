import { Boldonse, Instrument_Serif, Space_Grotesk } from "next/font/google";

// Google Fonts - All fonts loaded from Google Fonts
export const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const boldonse = Boldonse({
  variable: "--font-boldonse",
  subsets: ["latin"],
  weight: ["400"],
});

// Export all font variables for easy use
export const fontVariables = `${instrumentSerif.variable} ${spaceGrotesk.variable} ${boldonse.variable}`;
