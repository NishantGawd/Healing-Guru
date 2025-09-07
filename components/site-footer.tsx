"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function Icon({ path, label }: { path: string; label: string }) {
  return (
    <a aria-label={label} href="#" className="hover:opacity-80">
      <svg width="22" height="22" viewBox="0 0 24 24" className="fill-cream">
        <path d={path} />
      </svg>
    </a>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-cream mt-16">
      <div className="container-soft grid gap-10 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <div className="text-xl font-semibold">Healing Guru</div>
          <p className="text-sm/6 text-cream/80">
            Guiding you toward balance, clarity, and inner peace through compassionate, holistic practices.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Icon
              label="Instagram"
              path="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm11 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10z"
            />
            <Icon
              label="Facebook"
              path="M22 12a10 10 0 10-11.6 9.87v-6.99H7.9V12h2.5V9.8c0-2.46 1.47-3.82 3.72-3.82 1.08 0 2.21.19 2.21.19v2.43h-1.25c-1.23 0-1.62.76-1.62 1.54V12h2.76l-.44 2.88h-2.32v6.99A10 10 0 0022 12z"
            />
            <Icon
              label="YouTube"
              path="M23.5 6.2c-.3-1.1-1.2-1.9-2.3-2.1C19 3.6 12 3.6 12 3.6s-7 0-9.2.5C1.7 4.3.9 5.1.6 6.2 0 8.4 0 12 0 12s0 3.6.6 5.8c.3 1.1 1.2 1.9 2.3 2.1C5 20.4 12 20.4 12 20.4s7 0 9.2-.5c1.1-.2 2-1 2.3-2.1.6-2.2.6-5.8.6-5.8s0-3.6-.6-5.8zM9.6 15.4V8.6L15.8 12l-6.2 3.4z"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-semibold">Explore</div>
          <ul className="space-y-2 text-cream/90">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About Me</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="font-semibold">Legal</div>
          <ul className="space-y-2 text-cream/90">
            <li>
              <Link href="/privacy-policies">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-of-services">Terms of Service</Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="font-semibold">Stay Connected</div>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="email"
              placeholder="Your email"
              aria-label="Email address"
              className="bg-cream text-charcoal placeholder:text-charcoal/60"
            />
            <Button className="bg-gold text-cream hover:opacity-90">Subscribe</Button>
          </form>
        </div>
      </div>

      <div className="border-t border-cream/20">
        <div className="container-soft py-4 text-center text-sm text-cream/80">
          © 2025 Healing Guru. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
