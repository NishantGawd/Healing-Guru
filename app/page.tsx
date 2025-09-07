import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { AuthProvider } from "@/components/auth-context"

function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M21 3c-6 1-10.5 5.5-11.9 11.3C6.7 15 5 16.9 5 19c0 2.2 1.8 4 4 4 2.1 0 4-1.7 4.7-4.1C19.5 13.6 23 9 21 3z"
      />
    </svg>
  )
}
function LotusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 2s2.5 3.7 2.5 6.3S12 12 12 12s-2.5-1.7-2.5-3.7S12 2 12 2zm8 7s-1.8 3.6-4 4.7C18.5 15.5 20 18 20 18s-3.2-1.2-5-3c-1.2 1.5-3 3-3 3s-1.8-1.5-3-3c-1.8 1.8-5 3-5 3s1.5-2.5 4-4.3C5.8 12.6 4 9 4 9s3.3.3 6 2c.2-1.5 2-3 2-3s1.8 1.5 2 3c2.7-1.7 6-2 6-2z"
      />
    </svg>
  )
}
function SparkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2zm7 10l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3zM2 12l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"
      />
    </svg>
  )
}

const services = [
  { title: "Reiki Healing", desc: "Restore energetic balance and promote deep relaxation.", Icon: SparkIcon },
  {
    title: "Meditation Guidance",
    desc: "Cultivate presence and inner calm with personalized sessions.",
    Icon: LotusIcon,
  },
  { title: "Spiritual Counseling", desc: "Compassionate support to navigate life’s transitions.", Icon: LeafIcon },
]

export default function HomePage() {
  return (
    <AuthProvider>
      <SiteHeader />
      <main>
        {/* Hero */}
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
              <h1 className="text-balance font-serif text-4xl sm:text-5xl">Find Your Inner Peace and Harmony</h1>
              <p className="mt-3">Compassionate, holistic healing to help you feel grounded, clear, and renewed.</p>
              <div className="mt-6">
                <Link href="/appointments">
                  <Button className="bg-gold text-cream hover:opacity-90 cursor-pointer">Book a Consultation</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
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
              <h2 className="font-serif text-3xl text-charcoal">Welcome</h2>
              <p className="mt-3 text-charcoal/80 leading-relaxed">
                At Healing Guru, we create a nurturing space where you can breathe, release tension, and reconnect with
                your inner wisdom. With gentle, time-honored practices, we guide you toward balance and clarity.
              </p>
            </div>
          </div>
        </section>

        {/* Services overview */}
        <section className="section bg-beige/60">
          <div className="container-soft">
            <h2 className="font-serif text-3xl text-charcoal mb-6">Our Healing Services</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {services.map(({ title, desc, Icon }) => (
                <Card key={title}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Icon className="text-brand" />
                      <span>{title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-charcoal/80">{desc}</p>
                    <Link href="/services" className="mt-3 inline-block text-brand underline">
                      Learn More
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section">
          <div className="container-soft">
            <h2 className="font-serif text-3xl text-charcoal mb-6">What Clients Say</h2>
            <TestimonialsCarousel />
          </div>
        </section>

        {/* Final CTA */}
        <section className="section bg-brand">
          <div className="container-soft text-center">
            <h3 className="font-serif text-3xl text-cream text-balance">Ready to Begin Your Transformation?</h3>
            <Link href="/appointments" className="inline-block mt-6">
              <Button className="bg-gold text-cream hover:opacity-90">Book an Appointment</Button>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </AuthProvider>
  )
}
