"use client";

import { AuthProvider } from "@/components/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Book, Edit } from "lucide-react";

const downloads = [
  {
    title: "Beginner's Guide to Mindfulness",
    description: "An introductory e-book covering the core principles of mindfulness and simple exercises to get you started.",
    icon: <Book className="h-8 w-8 text-brand" />,
    file: "/downloads/mindfulness-guide.pdf"
  },
  {
    title: "Daily Gratitude Journal",
    description: "A printable PDF worksheet to help you cultivate a daily practice of gratitude and positive reflection.",
    icon: <Edit className="h-8 w-8 text-brand" />,
    file: "/downloads/gratitude-journal.pdf"
  },
  {
    title: "Chakra Balancing Cheat Sheet",
    description: "A beautifully designed one-page guide to understanding and balancing your seven main energy centers.",
    icon: <Book className="h-8 w-8 text-brand" />,
    file: "/downloads/chakra-guide.pdf"
  }
];

  function FreeDownloadsPageInner() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <SiteHeader />
      <main className="flex-grow">
        <section className="text-center py-20 px-4 bg-beige border-b border-gold/20">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal">
            Free Downloads
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-charcoal/70">
            Supportive resources to download and use on your personal wellness journey.
          </p>
        </section>

        <section className="py-16 px-4 container max-w-4xl mx-auto">
          <div className="space-y-8">
            {downloads.map((item) => (
              <Card key={item.title} className="bg-white border-beige">
                <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="bg-brand/10 p-4 rounded-full">
                    {item.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-serif text-2xl text-charcoal mb-1">{item.title}</h3>
                    <p className="text-charcoal/80">{item.description}</p>
                  </div>
                  <a href={item.file} download>
                    <Button className="bg-gold text-cream hover:bg-gold/90 w-full md:w-auto">
                      <Download className="h-4 w-4 mr-2" /> Download PDF
                    </Button>
                  </a>
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
      <FreeDownloadsPageInner />
    </AuthProvider>
  )
}