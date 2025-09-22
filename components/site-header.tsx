"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { useTranslation } from 'react-i18next'
import { cn } from "@/lib/utils"
import { useAppContext } from "@/components/site-context"
import { LanguageSwitcher } from "@/components/Language-switcher" // Assuming path
import { HealingLogo } from "@/components/healing-logo" // Assuming path
import { Button } from "@/components/ui/button"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {Avatar,AvatarFallback} from "@/components/ui/avatar"
import { AmbientSoundToggle } from "@/components/AmbientSoundToggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAppContext() // Assuming this context exists
  const pathname = usePathname()
  const { t } = useTranslation('common'); // Using the 'common' namespace

  // Navigation items using translation keys from your common.json
  const nav = [
    { href: "/", label: t('home') },
    { href: "/about", label: t('about') },
    { href: "/services", label: t('services') },
    { href: "/resources", label: t('resources') }, // Add 'resources' to common.json
    { href: "/contact", label: t('contact') },     // Add 'contact' to common.json
    { href: "/faq", label: t('faq') },             // Add 'faq' to common.json
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-cream">
      <div className="container-soft flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg tracking-wide text-charcoal">
          <HealingLogo className="w-8 h-8" />
          Healing Guru
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "relative text-sm text-charcoal/80 transition-colors hover:text-charcoal", {
                  "text-charcoal font-medium after:absolute after:bottom-[-4px] after:left-1/2 after:h-[3px] after:w-3/4 after:-translate-x-1/2 after:bg-gold after:content-['']": pathname === n.href,
                }
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
         <AmbientSoundToggle />
          <LanguageSwitcher />
          <Link href="/appointments">
            <Button className="cursor-pointer bg-gold text-cream hover:opacity-90">
              {t('bookAppointment')}
            </Button>
          </Link>
          {!user ? (
            <Link href="/login">
              <Button variant="ghost" className="cursor-pointer text-charcoal hover:bg-beige">
                {t('login')} {/* Add 'login' to common.json */}
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button aria-label="Open profile menu">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="bg-beige text-charcoal">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href="/dashboard">
                  <DropdownMenuItem className="cursor-pointer">
                    {t('myDashboard')} {/* Add 'myDashboard' to common.json */}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  {t('logout')} {/* Add 'logout' to common.json */}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border p-2 text-charcoal"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn("md:hidden border-t bg-cream", open ? "block" : "hidden")}>
        <div className="container-soft flex flex-col gap-2 py-4">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={cn("py-2 text-charcoal/90", {
                "rounded-md bg-beige/50 px-3 font-semibold text-charcoal": pathname === n.href,
              })}
            >
              {n.label}
            </Link>
          ))}
          <Link href="/appointments" onClick={() => setOpen(false)}>
            <Button className="mt-2 w-full cursor-pointer bg-gold text-cream">
              {t('bookAppointment')}
            </Button>
          </Link>
          {!user ? (
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button variant="ghost" className="w-full text-charcoal hover:bg-beige">
                {t('login')}
              </Button>
            </Link>
          ) : (
            <div className="flex flex-col gap-2 text-charcoal/90">
              <Link href="/dashboard" onClick={() => setOpen(false)} className="py-2">
                {t('myDashboard')}
              </Link>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="py-2 text-left"
              >
                {t('logout')}
              </button>
            </div>
          )}
          <div className="mt-2 flex items-center justify-start gap-2 border-t pt-4">
            <AmbientSoundToggle />  
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}