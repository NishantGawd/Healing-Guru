"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-context"
import { cn } from "@/lib/utils"
import { HealingLogo } from "@/components/healing-logo"
import { usePathname } from "next/navigation"
import { AmbientSoundToggle } from "@/components/AmbientSoundToggle";
import { LanguageSwitcher } from "@/components/Language-switcher";

const nav = [
 { href: "/", label: "Home" },
 { href: "/about", label: "About Me" },
 { href: "/services", label: "Services" },
 { href: "/resources", label: "Resources" },
 { href: "/contact", label: "Contact" },
 { href: "/faq", label: "FAQ" },
]

export function SiteHeader() {
 const [open, setOpen] = useState(false)
 const { user, logout } = useAuth()
 const pathname = usePathname()

 return (
  <header className="sticky top-0 z-40 w-full border-b bg-cream">
   <div className="container-soft flex h-16 items-center justify-between">
    <Link href="/" className="flex items-center gap-2 font-semibold text-lg tracking-wide text-charcoal">
     <HealingLogo className="w-8 h-8" />
     Healing Guru
    </Link>

    <nav className="hidden md:flex items-center gap-6">
     {nav.map((n) => (
      <Link key={n.href} href={n.href} className={cn("relative text-sm text-charcoal/80 hover:text-charcoal transition-colors",{"text-charcoal font-medium after:content-[''] after:absolute after:w-3/4 after:h-[3px] after:bg-gold after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2": pathname === n.href})}>
       {n.label}
      </Link>
     ))}
    </nav>

    <div className="hidden md:flex items-center gap-3">
     <AmbientSoundToggle />
     <LanguageSwitcher />
     <Link href="/appointments">
      <Button className="bg-gold text-cream hover:opacity-90">Book an Appointment</Button>
     </Link>
     {!user ? (
      <Link href="/login">
       <Button variant="ghost" className="text-charcoal hover:bg-beige">
        Login
       </Button>
      </Link>
     ) : (
      <DropdownMenu>
       <DropdownMenuTrigger asChild>
        <button aria-label="Open profile menu">
         <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-beige text-charcoal">
           {user.name?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
         </Avatar>
        </button>
       </DropdownMenuTrigger>
       <DropdownMenuContent align="end">
        <Link href="/dashboard">
         <DropdownMenuItem>My Dashboard</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
       </DropdownMenuContent>
      </DropdownMenu>
     )}
    </div>

    <button
     className="md:hidden inline-flex items-center justify-center rounded-md border px-3 py-2 text-charcoal"
     onClick={() => setOpen((o) => !o)}
     aria-label="Toggle menu"
    >
     <span className="sr-only">Open Menu</span>
     <svg width="24" height="24" viewBox="0 0 24" className="fill-current">
      <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
     </svg>
    </button>
   </div>

   <div className={cn("md:hidden border-t bg-cream", open ? "block" : "hidden")}>
    <div className="container-soft flex flex-col gap-2 py-4">
     {nav.map((n) => (
      <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className={cn("py-2 text-charcoal/90",{ "font-semibold text-charcoal bg-beige/50 rounded-md px-3": pathname === n.href})}>
       {n.label}
      </Link>
     ))}
     <Link href="/appointments" onClick={() => setOpen(false)}>
      <Button className="bg-gold text-cream w-full mt-2">Book an Appointment</Button>
     </Link>
     {!user ? (
      <Link href="/login" onClick={() => setOpen(false)}>
       <Button variant="ghost" className="w-full text-charcoal hover:bg-beige">
        Login
       </Button>
      </Link>
     ) : (
      <div className="flex flex-col gap-2">
       <Link href="/dashboard" onClick={() => setOpen(false)} className="py-2">
        My Dashboard
       </Link>
       <button
        onClick={() => {
         logout()
         setOpen(false)
        }}
        className="text-left py-2"
       >
        Logout
       </button>
      </div>
     )}
    </div>
   </div>
  </header>
 )
}