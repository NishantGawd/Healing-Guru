import "./globals.css";
import { Quicksand, Lora } from "next/font/google";
import { cn } from "@/lib/utils";

// Original Font Setup
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata = {
  title: "Healing Guru",
  description: "A nurturing space for your healing journey.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          quicksand.variable,
          lora.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}