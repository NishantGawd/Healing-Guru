"use client" // This is required to use interactive hooks for the parallax effect

import Image from "next/image"
import { useState, useEffect } from "react" // We need these hooks for the effect
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AuthProvider } from "@/components/auth-context"

export default function AboutPage() {
  // This state will track the user's scroll position
  const [offsetY, setOffsetY] = useState(0)
  
  // This function updates the state as the user scrolls
  const handleScroll = () => setOffsetY(window.pageYOffset)

  // This effect adds the scroll listener when the page loads
  // and removes it when the page is left, to prevent memory leaks.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AuthProvider>
      <SiteHeader />
      <main>
        {/* --- HERO SECTION --- */}
        {/* THE FIX: Changed the height back to the original size */}
        <section className="relative h-[40vh] min-h-[280px] w-full overflow-hidden">
          
          {/* This div contains the image and will move based on scroll position */}
          <div
            className="absolute inset-0 z-0"
            // The transform moves the image vertically at a slower speed for the parallax effect
            style={{ transform: `translateY(${offsetY * 0.2}px)` }}
          >
            <Image
              src="/warm-professional-portrait-soft-light.png"
              alt="Warm professional portrait of the founder"
              fill
              // object-cover ensures the image always covers the area without distortion
              className="object-cover"
              // Using a higher quality for the main hero image
              quality={100}
            />
            {/* The darkening overlay moves with the image */}
            <div className="absolute inset-0 bg-charcoal/40" />
          </div>

          {/* The text container stays in place and scrolls normally with the page */}
          <div className="container-soft relative z-10 flex h-full items-end pb-8">
            <h1 className="font-serif text-4xl text-cream drop-shadow-md">About Me</h1>
          </div>
        </section>

        {/* --- THE REST OF THE PAGE REMAINS THE SAME --- */}
        <section className="section">
          <div className="container-soft grid gap-12 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-serif text-3xl text-charcoal">My Journey</h2>
              <p className="mt-4 text-charcoal/80 leading-relaxed">
                I began my path in holistic healing over a decade ago, studying modalities that invite calm and clarity.
                My approach blends intuition with time-tested practices, creating a supportive, peaceful space for every
                client.
              </p>
              <p className="mt-4 text-charcoal/80 leading-relaxed">
                Through continued learning and compassionate presence, I’m honored to guide others as they reconnect
                with their inner wisdom and resilience.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src="/serene-studio-interior.png"
                alt="Serene studio interior with soft lighting"
                width={640}
                height={420}
                className="rounded-lg border bg-cream shadow-md"
              />
            </div>
          </div>
        </section>

        <section className="section bg-beige/60">
          <div className="container-soft">
            <h2 className="font-serif text-3xl text-charcoal mb-8 text-center">The Healing Space</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-lg border bg-cream shadow-sm">
                  <Image
                    src={`/calming-healing-space-.png?height=240&width=360&query=calming%20healing%20space%20${i + 1}`}
                    alt={`A calming view of the healing space ${i + 1}`}
                    width={360}
                    height={240}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </AuthProvider>
  )
}

