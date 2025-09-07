"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

type Testimonial = { name: string; quote: string; photoAlt: string; photoUrl: string }

const items: Testimonial[] = [
  {
    name: "Aisha K.",
    quote: "I felt calm and centered after just one session. Truly transformative.",
    photoAlt: "Portrait of Aisha in soft light",
    photoUrl: "/client-portrait-soft-light.png",
  },
  {
    name: "Daniel R.",
    quote: "The guidance helped me release years of stress. Highly recommend.",
    photoAlt: "Portrait of Daniel with serene background",
    photoUrl: "/client-portrait-serene.png",
  },
  {
    name: "Meera S.",
    quote: "A warm, welcoming space and compassionate support throughout.",
    photoAlt: "Portrait of Meera in natural light",
    photoUrl: "/client-portrait-natural-light.png",
  },
]

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0)
  const next = () => setIndex((i) => (i + 1) % items.length)
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)

  const current = items[index]
  return (
    <div aria-label="Client Testimonials" className="w-full">
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={prev}
          aria-label="Previous testimonial"
          className="hover:bg-beige text-charcoal cursor-pointer"
        >
          ‹
        </Button>
        <div className="flex-1 rounded-lg border bg-cream p-6">
          <div className="flex items-center gap-4">
            <Image
              src={current.photoUrl || "/placeholder.svg"}
              alt={current.photoAlt}
              width={64}
              height={64}
              className="rounded-full border bg-cream"
            />
            <div className="font-semibold text-charcoal">{current.name}</div>
          </div>
          <p className="mt-4 text-charcoal/80">&ldquo;{current.quote}&rdquo;</p>
        </div>
        <Button variant="ghost" onClick={next} aria-label="Next testimonial" className="hover:bg-beige text-charcoal cursor-pointer">
          ›
        </Button>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-gold" : "bg-beige"}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}
