"use client";

import { AuthProvider } from "@/components/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent } from "@/components/ui/card";

const stories = [
  {
    quote: "The Reiki sessions have been transformative. I came in feeling anxious and overwhelmed, and now I feel a sense of calm and clarity I didn't think was possible. It's been a true gift.",
    name: "Jessica M.",
    service: "Reiki Healing"
  },
  {
    quote: "I always thought meditation wasn't for me, but the personalized guidance made all the difference. I now have a daily practice that feels effortless and has profoundly impacted my focus and patience.",
    name: "David L.",
    service: "Meditation Guidance"
  },
  {
    quote: "Spiritual counseling provided a safe space to explore my path without judgment. I feel more connected to myself and my purpose. I'm so grateful for the compassionate guidance I received.",
    name: "Sarah P.",
    service: "Spiritual Counseling"
  }
];

  function ClientStoriesPageInner() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <SiteHeader />
      <main className="flex-grow">
        <section className="text-center py-20 px-4 bg-beige border-b border-gold/20">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal">
            Client Stories
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-charcoal/70">
            Real experiences from individuals on their journey to wellness and self-discovery.
          </p>
        </section>

        <section className="py-16 px-4 container max-w-4xl mx-auto">
          <div className="space-y-10">
            {stories.map((story, index) => (
              <Card key={index} className="bg-white border-beige shadow-sm overflow-hidden">
                <CardContent className="p-8">
                  <blockquote className="text-center">
                    <p className="text-xl italic text-charcoal/90 leading-relaxed">
                      "{story.quote}"
                    </p>
                    <footer className="mt-6">
                      <p className="font-serif text-lg font-semibold text-charcoal">{story.name}</p>
                      <p className="text-sm text-gold tracking-wide uppercase">{story.service}</p>
                    </footer>
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default function ReikiHealingPage() {
  return (
    <AuthProvider>
      <ClientStoriesPageInner />
    </AuthProvider>
  )
}