"use client";

import { AuthProvider } from "@/components/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

const guides = [
  {
    title: "5-Minute Morning Meditation",
    description: "Start your day with clarity and intention. A short and simple practice to ground your energy.",
    type: "Audio Guide"
  },
  {
    title: "Guided Body Scan for Relaxation",
    description: "Release physical tension and calm your nervous system with this gentle, guided body scan.",
     type: "Audio Guide"
  },
  {
    title: "Walking Meditation Practice",
    description: "Learn how to turn a simple walk into a powerful mindfulness exercise with this step-by-step guide.",
     type: "Article"
  },
  {
    title: "Loving-Kindness Meditation",
    description: "Cultivate feelings of warmth, kindness, and compassion for yourself and others.",
     type: "Audio Guide"
  }
]

  function MeditationGuidesPageInner() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <SiteHeader />
      <main className="flex-grow">
        <section className="text-center py-20 px-4 bg-beige border-b border-gold/20">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal">
            Meditation Guides
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-charcoal/70">
            A collection of guided practices and articles to support you on your mindfulness journey.
          </p>
        </section>

        <section className="py-16 px-4 container max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((guide) => (
              <Card key={guide.title} className="bg-white border-beige hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-charcoal">{guide.title}</CardTitle>
                  <CardDescription className="text-brand pt-1">{guide.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-charcoal/80 mb-6">{guide.description}</p>
                  <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">
                    <PlayCircle className="h-4 w-4 mr-2" /> Listen or Read Now
                  </Button>
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
      <MeditationGuidesPageInner />
    </AuthProvider>
  )
}