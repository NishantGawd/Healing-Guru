"use client";

import { SiteProvider } from "@/components/site-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BrainCircuit, Leaf, Smile } from "lucide-react";

function MeditationGuidancePageInner() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <SiteHeader />
      <main className="flex-grow">
        <section className="text-center py-20 px-4 bg-beige border-b border-gold/20">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal">
            Meditation Guidance
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-charcoal/70">
            Personalized one-on-one sessions to help you develop a sustainable meditation practice, quiet your mind, and connect with your inner self.
          </p>
        </section>

        <section className="py-16 px-4 container max-w-4xl mx-auto">
          <div className="space-y-12 text-charcoal/80">
            <div>
              <h2 className="font-serif text-3xl text-gold mb-4">Find Your Inner Stillness</h2>
              <p className="text-lg leading-relaxed">
                Whether you're a complete beginner struggling to quiet the 'mental chatter' or an experienced practitioner looking to deepen your practice, personalized guidance can make all the difference. Together, we will explore various meditation techniques to find what resonates with you, helping you build a practice that fits seamlessly into your life.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center p-4">
                <BrainCircuit className="h-12 w-12 text-brand mb-4" />
                <h3 className="font-serif text-xl font-semibold text-charcoal">Enhance Focus</h3>
                <p className="mt-2 text-charcoal/70">Train your attention and improve your concentration in daily life.</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <Leaf className="h-12 w-12 text-brand mb-4" />
                <h3 className="font-serif text-xl font-semibold text-charcoal">Cultivate Presence</h3>
                <p className="mt-2 text-charcoal/70">Learn to live more fully in the present moment, reducing anxiety about the past and future.</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <Smile className="h-12 w-12 text-brand mb-4" />
                <h3 className="font-serif text-xl font-semibold text-charcoal">Increase Well-being</h3>
                <p className="mt-2 text-charcoal/70">Develop a greater sense of calm, compassion, and emotional resilience.</p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-3xl text-gold mb-4">Our Sessions Together</h2>
              <p className="text-lg leading-relaxed mb-4">
                Our sessions are a collaborative and supportive space. We'll begin by discussing your goals and any challenges you're facing. From there, I will guide you through practices such as mindfulness, breathwork, and visualization. You'll leave each session with practical tools and the confidence to continue your practice independently.
              </p>
            </div>

            <div className="text-center pt-8">
              <h3 className="font-serif text-2xl text-charcoal mb-4">Ready to Begin Your Practice?</h3>
              <Link href="/appointments">
                <Button size="lg" className="bg-gold text-cream hover:bg-gold/90 h-12 px-8 text-lg">
                  Book a Guidance Session
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default function ReikiHealingPage() {
  return (
    <SiteProvider>
      <MeditationGuidancePageInner />
    </SiteProvider>
  )
}
