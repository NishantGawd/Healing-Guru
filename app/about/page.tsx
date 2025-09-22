"use client" // This is required to use interactive hooks for the parallax effect

import Image from "next/image"
import { useState, useEffect } from "react" // We need these hooks for the effect
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SiteProvider } from "@/components/site-context"

export default function AboutPage() {

  return (
    <SiteProvider>
      <SiteHeader />
      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
          {/* This div contains the image and will move based on scroll position */}
          <div
            className="absolute inset-0 z-0"
            // The transform moves the image vertically at a slower speed for the parallax effect
          >
            <Image
              src="/welcoming-healing-sanctuary.jpg"
              alt="Welcoming healing sanctuary with soft natural light and peaceful atmosphere"
              fill
              // object-cover ensures the image always covers the area without distortion
              className="object-cover"
              // Using a higher quality for the main hero image
              quality={100}
            />
            <div className="absolute inset-0 bg-black/15" />
          </div>

          {/* The text container stays in place and scrolls normally with the page */}
          <div className="relative z-10 flex h-full items-end">
            <div className="container mx-auto px-4 pb-12">
              <h1 className="font-serif text-5xl md:text-6xl text-cream drop-shadow-lg">About Me</h1>
              <p className="mt-4 text-lg text-cream/90 drop-shadow-md max-w-2xl">
                Discover the journey that led me to holistic healing and wellness
              </p>
            </div>
          </div>
        </section>

        {/* --- MY JOURNEY SECTION --- */}
        <section className="section bg-cream">
          <div className="container-soft grid gap-12 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-serif text-3xl text-charcoal mb-6">My Journey</h2>
              <p className="text-charcoal/80 leading-relaxed mb-4">
                I began my path in holistic healing over a decade ago, studying modalities that invite calm and clarity.
                My approach blends intuition with time-tested practices, creating a supportive, peaceful space for every
                client.
              </p>
              <p className="text-charcoal/80 leading-relaxed">
                Through continued learning and compassionate presence, I'm honored to guide others as they reconnect
                with their inner wisdom and resilience.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/healing-hands-energy-work.jpg"
                  alt="Gentle healing hands demonstrating energy work and therapeutic touch"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- THE HEALING SPACE SECTION --- */}
        <section className="section bg-beige/60">
          <div className="container-soft">
            <h2 className="font-serif text-3xl text-charcoal mb-12 text-center">The Healing Space</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
              <div className="relative overflow-hidden rounded-lg shadow-md group">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/meditation-room-cushions.jpg"
                    alt="Peaceful meditation room with comfortable cushions and soft lighting"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg shadow-md group">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/crystal-healing-setup.jpg"
                    alt="Crystal healing setup with various healing stones and candles"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg shadow-md group">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/aromatherapy-essential-oils.jpg"
                    alt="Aromatherapy station with essential oils and diffuser"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg shadow-md group">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/yoga-mat-peaceful-corner.jpg"
                    alt="Yoga mat in a peaceful corner with plants and natural light"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg shadow-md group">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/sound-healing-bowls.jpg"
                    alt="Sound healing setup with singing bowls and meditation tools"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg shadow-md group">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/healing-garden-nature.jpg"
                    alt="Peaceful healing garden with plants and natural elements"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteProvider>
  )
}
