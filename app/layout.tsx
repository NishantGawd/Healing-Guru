import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Healing Guru — Spiritual Healing & Appointments",
  description:
    "Find your inner peace and harmony with Healing Guru. Book appointments for Reiki, meditation, and spiritual counseling.",
  icons: {
    icon: "/logo.svg",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="bg-cream text-charcoal">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
