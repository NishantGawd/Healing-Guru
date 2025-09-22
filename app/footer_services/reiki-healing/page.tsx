"use client"; // Required for SiteProvider and other hooks

import { SiteProvider } from "@/components/site-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Waves, Sun, HeartHandshake } from "lucide-react";

// 1. All of the original page content is moved into an "Inner" component.
function ReikiHealingPageInner() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <SiteHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="text-center py-20 px-4 bg-beige border-b border-gold/20">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal">
            Reiki Healing
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-charcoal/70">
            A gentle, non-invasive energy healing technique to promote relaxation, reduce stress, and support your body's natural healing processes.
          </p>
        </section>

        {/* Main Content Section */}
        <section className="py-16 px-4 container max-w-4xl mx-auto">
          <div className="space-y-12 text-charcoal/80">
            <div>
              <h2 className="font-serif text-3xl text-gold mb-4">What is Reiki?</h2>
              <p className="text-lg leading-relaxed">
                Reiki is a Japanese spiritual practice that involves the channeling of "universal life force energy" through the practitioner's hands to the recipient. It is based on the principle that this energy flows through us and is what causes us to be alive. If one's life force energy is low, then we are more likely to get sick or feel stress, and if it is high, we are more capable of being happy and healthy.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center p-4">
                    <Waves className="h-12 w-12 text-brand mb-4" />
                    <h3 className="font-serif text-xl font-semibold text-charcoal">Reduce Stress</h3>
                    <p className="mt-2 text-charcoal/70">Calm your nervous system and find a deep sense of peace.</p>
                </div>
                <div className="flex flex-col items-center p-4">
                    <Sun className="h-12 w-12 text-brand mb-4" />
                    <h3 className="font-serif text-xl font-semibold text-charcoal">Improve Clarity</h3>
                    <p className="mt-2 text-charcoal/70">Clear energetic blockages to enhance mental and emotional focus.</p>
                </div>
                 <div className="flex flex-col items-center p-4">
                    <HeartHandshake className="h-12 w-12 text-brand mb-4" />
                    <h3 className="font-serif text-xl font-semibold text-charcoal">Support Healing</h3>
                    <p className="mt-2 text-charcoal/70">Complement your wellness journey by supporting your body's innate ability to heal.</p>
                </div>
            </div>

            <div>
              <h2 className="font-serif text-3xl text-gold mb-4">What to Expect in a Session</h2>
              <p className="text-lg leading-relaxed mb-4">
                During a session, you will lie comfortably and fully clothed on a massage table. I will gently place my hands on or slightly above various parts of your body, including the head, torso, and limbs. There is no manipulation of muscles; it is a very gentle and calming experience. Most clients report feeling a wonderful glowing radiance that flows through and around them.
              </p>
              <blockquote className="border-l-4 border-gold bg-gold/10 p-6 rounded-r-lg text-charcoal italic">
                "After my reiki session, I felt lighter and more centered than I have in years. It was a profoundly peaceful experience." - Client
              </blockquote>
            </div>

            <div className="text-center pt-8">
              <h3 className="font-serif text-2xl text-charcoal mb-4">Ready to Experience Balance?</h3>
              <Link href="/appointments">
                <Button size="lg" className="bg-gold text-cream hover:bg-gold/90 h-12 px-8 text-lg">
                  Book a Reiki Session
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

// 2. The main export now simply wraps the "Inner" page with the SiteProvider.
export default function ReikiHealingPage() {
    return (
        <SiteProvider>
            <ReikiHealingPageInner />
        </SiteProvider>
    )
}

