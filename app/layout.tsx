import type React from "react";
import type { Metadata } from "next";
// 1. Import Lora (for headings) and Quicksand (for body text)
import { Lora, Quicksand } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// 2. Configure both fonts
const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora", // This will be our serif/heading font
});

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand", // This will be our sans-serif/body font
});

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
    <html lang="en" className={`${lora.variable} ${quicksand.variable} antialiased`}>
      <body className="text-charcoal">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

