"use client"

import Link from "next/link"
import { HealingLogo } from "@/components/healing-logo";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Shield, Lock } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="container mx-auto px-4 py-12">
        {/* Using a 5-column grid for larger screens to fit all sections cleanly */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3">
              <HealingLogo className="w-9 h-9" />
              <span className="text-xl font-serif font-semibold">
                Healing Guru
              </span>
            </Link>
            <p className="text-cream/80 text-sm leading-relaxed">
              Compassionate, holistic healing to help you find inner peace and harmony.
            </p>
            <div className="flex space-x-4 pt-1">
              <a href="#" className="text-cream/60 hover:text-gold transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-cream/60 hover:text-gold transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-cream/60 hover:text-gold transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

             {/* Explore Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-cream/80 hover:text-gold">About Me</Link></li>
                <li><Link href="/services" className="text-cream/80 hover:text-gold">Services</Link></li>
                <li><Link href="/resources/blog" className="text-cream/80 hover:text-gold">Healing Blog</Link></li>
                <li><Link href="/contact" className="text-cream/80 hover:text-gold">Contact</Link></li>
                <li><Link href="/faq" className="text-cream/80 hover:text-gold">FAQ</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/healing" className="text-cream/80 hover:text-gold transition-colors">Energy Healing</Link></li>
              <li><Link href="/services/meditation" className="text-cream/80 hover:text-gold transition-colors">Guided Meditation</Link></li>
              <li><Link href="/services/consultation" className="text-cream/80 hover:text-gold transition-colors">Personal Consultation</Link></li>
              <li><Link href="/services/group" className="text-cream/80 hover:text-gold transition-colors">Group Sessions</Link></li>
              <li><Link href="/services/workshops" className="text-cream/80 hover:text-gold transition-colors">Healing Workshops</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/resources/meditation-guides" className="text-cream/80 hover:text-gold transition-colors">Meditation Guides</Link></li>
              <li><Link href="/resources/downloads" className="text-cream/80 hover:text-gold transition-colors">Free Downloads</Link></li>
              <li><Link href="/resources/testimonials" className="text-cream/80 hover:text-gold transition-colors">Client Stories</Link></li>
            </ul>
          </div>

          {/* Get In Touch & Trust Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get In Touch</h3>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input
                type="email"
                placeholder="Your email"
                aria-label="Email address"
                className="bg-cream text-charcoal placeholder:text-charcoal/60"
                />
                <Button className="bg-gold text-cream hover:opacity-90">Subscribe</Button>
            </form>
            <div className="space-y-2 text-sm pt-2">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold" />
                <span className="text-cream/80">hello@healingguru.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold" />
                <span className="text-cream/80">+91 123-456-7890</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gold" />
                <span className="text-xs text-cream/60">Licensed & Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-gold" />
                <span className="text-xs text-cream/60">SSL Protected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cream/60 text-sm">
            © {new Date().getFullYear()} Healing Guru. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <Link href="/privacy-policies" className="text-cream/60 hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-services" className="text-cream/60 hover:text-gold transition-colors">Terms of Service</Link>
            <Link href="/cancellation-policy" className="text-cream/60 hover:text-gold transition-colors">Cancellation Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}