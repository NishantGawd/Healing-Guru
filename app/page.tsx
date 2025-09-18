"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variant } from "framer-motion";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthProvider } from "@/components/auth-context";
import { LeafIcon, LotusIcon, SparkIcon } from "@/components/icons";
import { HumanizedTestimonials } from "@/components/HumanizedTestimonials";
import { MindfulBreathing } from "@/components/MindfulBreathing";
import { ImageWaveDivider } from "@/components/wave-divider";

const services = [
  { title: "Reiki Healing", desc: "Restore energetic balance and promote deep relaxation.", Icon: SparkIcon },
  { title: "Meditation Guidance", desc: "Cultivate presence and inner calm with personalized sessions.", Icon: LotusIcon },
  { title: "Spiritual Counseling", desc: "Compassionate support to navigate life’s transitions.", Icon: LeafIcon },
];

export default function HomePage() {
  const cardHover: Variant = {
    scale: 1.05,
    boxShadow: "0px 10px 30px -5px rgba(54, 69, 79, 0.15)",
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  return (
    <AuthProvider>
      <SiteHeader />
      <main>
        {/* Hero Section */}
        <section className="relative h-[72vh] min-h-[500px] w-full">
          <Image
            src="/misty-forest-soft-morning-light.png"
            alt="Misty forest with soft morning light"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/30" />
          <div className="container-soft relative z-10 flex h-full items-center">
            <div className="max-w-2xl text-cream">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-balance text-4xl sm:text-5xl"
              >
                Find Your Inner Peace and Harmony
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="mt-3"
              >
                {/* COPYWRITING: More direct and personal invitation. */}
                Our compassionate, holistic practices will help you feel grounded, clear, and renewed.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="mt-6"
              >
                <Link href="/appointments">
                  {/* COPYWRITING: Changed "Book a Consultation" to a softer call to action. */}
                  <Button className="bg-gold text-cream glowing-button cursor-pointer">Begin Your Journey</Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="section">
          <div className="container-soft grid items-center gap-8 md:grid-cols-2">
            <Image
              src="/healer-portrait-soft-interior.png"
              alt="Healing Guru healer portrait in a softly lit interior"
              width={640}
              height={480}
              className="rounded-lg border bg-cream"
            />
            <div>
              {/* COPYWRITING: Changed "Welcome" to be more descriptive and inviting. */}
              <h2 className="text-3xl text-charcoal">A Nurturing Space for You</h2>
              <p className="mt-3 text-charcoal/80">
                You are safe. You are seen. You are healing. At Healing Guru, we create a sanctuary where you can breathe, release tension, and reconnect with your inner wisdom.
              </p>
            </div>
          </div>
        </section>
        <ImageWaveDivider />
        {/* Services Overview Section */}
        <section className="section bg-beige/60">
          <div className="container-soft">
            {/* COPYWRITING: Changed "Our Healing Services" to be more benefit-focused. */}
            <h2 className="text-3xl text-charcoal mb-6 text-center">Paths to Your Wellbeing</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {services.map(({ title, desc, Icon }) => (
                <motion.div whileHover={cardHover} key={title}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Icon className="text-brand" />
                        <span>{title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-charcoal/80">{desc}</p>
                      <Link href="/services" className="mt-3 inline-block text-brand font-semibold hover:underline">
                        {/* COPYWRITING: Changed "Learn More" to be more inviting. */}
                        Explore this Path
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mindful Breathing section */}
        <section className="section healing-gradient">
          <div className="container-soft text-center">
            <h2 className="text-3xl text-charcoal mb-4">A Moment for You</h2>
            <p className="text-charcoal/80 max-w-2xl mx-auto mb-6">
              We invite you to pause, find your center, and join us in a moment of mindful breathing.
            </p>
            <MindfulBreathing />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section">
          <div className="container-soft">
            <h2 className="text-3xl text-charcoal mb-6 text-center">What Clients Say</h2>
            <HumanizedTestimonials />
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="section bg-brand">
          <div className="container-soft text-center">
            <h3 className="text-3xl text-cream text-balance">Ready to Begin Your Transformation?</h3>
            <Link href="/appointments" className="inline-block mt-6">
               {/* COPYWRITING: Changed "Book an Appointment" to be more personal. */}
              <Button className="bg-gold text-cream glowing-button">Schedule Your Session</Button>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </AuthProvider>
  );
}