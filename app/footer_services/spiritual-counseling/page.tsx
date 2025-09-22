"use client";

import { SiteProvider } from "@/components/site-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Compass, Lightbulb, MessageCircle } from "lucide-react";

function SpiritualCounselingPageInner() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <SiteHeader />
      <main className="flex-grow">
        <section className="text-center py-20 px-4 bg-beige border-b border-gold/20">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal">
            Spiritual Counseling
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-charcoal/70">
            A heart-centered approach to navigating life's challenges, finding your purpose, and connecting with your authentic spiritual path.
          </p>
        </section>

        <section className="py-16 px-4 container max-w-4xl mx-auto">
          <div className="space-y-12 text-charcoal/80">
            <div>
              <h2 className="font-serif text-3xl text-gold mb-4">Guidance for Your Soul's Journey</h2>
              <p className="text-lg leading-relaxed">
                Spiritual counseling is a supportive partnership that honors your unique beliefs and life experiences. It is not about religion, but about your personal connection to meaning, purpose, and the greater whole. In a safe and non-judgmental space, we can explore life transitions, existential questions, and the desire for a deeper connection to your inner wisdom.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center p-4">
                <Compass className="h-12 w-12 text-brand mb-4" />
                <h3 className="font-serif text-xl font-semibold text-charcoal">Find Direction</h3>
                <p className="mt-2 text-charcoal/70">Gain clarity on your life's purpose and next steps.</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <Lightbulb className="h-12 w-12 text-brand mb-4" />
                <h3 className="font-serif text-xl font-semibold text-charcoal">Gain Insight</h3>
                <p className="mt-2 text-charcoal/70">Explore deep questions and transform limiting beliefs.</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <MessageCircle className="h-12 w-12 text-brand mb-4" />
                <h3 className="font-serif text-xl font-semibold text-charcoal">Feel Heard</h3>
                <p className="mt-2 text-charcoal/70">Receive compassionate support as you navigate your path.</p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-3xl text-gold mb-4">How It Works</h2>
              <p className="text-lg leading-relaxed mb-4">
                Our sessions are confidential conversations focused on you. Using techniques from transpersonal psychology, mindfulness, and ancient wisdom traditions, we will work together to uncover the answers that already lie within you. My role is to listen deeply, ask insightful questions, and provide tools and perspectives to help you integrate your spiritual life with your everyday reality.
              </p>
            </div>

            <div className="text-center pt-8">
              <h3 className="font-serif text-2xl text-charcoal mb-4">Seek Deeper Understanding?</h3>
              <Link href="/appointments">
                <Button size="lg" className="bg-gold text-cream hover:bg-gold/90 h-12 px-8 text-lg">
                  Book a Counseling Session
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
      <SpiritualCounselingPageInner />
    </SiteProvider>
  )
}
