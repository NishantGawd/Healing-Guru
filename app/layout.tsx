import type React from "react";
import type { Metadata } from "next";
// 1. Import Lora (for headings) and Quicksand (for body text)
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// 2. Configure both fonts
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display', // For headings
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato', // For body text
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Healing Guru — Spiritual Healing & Appointments",
  description:
    "Find your inner peace and harmony with Healing Guru. Book appointments for Reiki, meditation, and spiritual counseling.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 3. Apply both font variables to the html tag
    <html lang="en" className={`${playfairDisplay.variable} ${lato.variable} antialiased`}>
      <body className="text-charcoal">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

