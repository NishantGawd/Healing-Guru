"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteProvider } from "@/components/site-context"
import { Clock, Heart, Sparkles, Brain, Users, ChevronDown, ChevronUp } from "lucide-react"

const SERVICES = [
  {
    id: "reiki",
    title: "Reiki Healing",
    shortDesc: "A gentle energy practice supporting relaxation and balance.",
    fullDesc:
      "Experience the ancient Japanese healing art of Reiki, where universal life energy flows through gentle touch to promote deep relaxation, stress relief, and natural healing. This non-invasive treatment works on physical, emotional, and spiritual levels.",
    benefits: [
      "Deep stress relief and relaxation",
      "Improved sleep quality",
      "Enhanced emotional clarity",
      "Pain and tension reduction",
      "Boosted immune system",
      "Spiritual alignment",
    ],
    whatToExpect:
      "You'll lie fully clothed on a comfortable treatment table while I place my hands gently on or above different areas of your body. Most clients experience warmth, tingling, or deep peace during the session.",
    duration: "60 minutes",
    price: "9000",
    icon: Heart,
    image: "/reiki-healing-hands.jpg",
    preparation: [
      "Wear comfortable, loose clothing",
      "Avoid heavy meals 2 hours before",
      "Come with an open mind and heart",
    ],
  },
  {
    id: "meditation",
    title: "Meditation Guidance",
    shortDesc: "Personalized mindfulness and breathing techniques.",
    fullDesc:
      "Learn personalized meditation techniques tailored to your lifestyle and goals. Whether you're a beginner or looking to deepen your practice, I'll guide you through various mindfulness approaches including breathwork, body scanning, and loving-kindness meditation.",
    benefits: [
      "Reduced anxiety and stress",
      "Improved focus and concentration",
      "Better emotional regulation",
      "Enhanced self-awareness",
      "Greater sense of inner peace",
      "Improved relationships",
    ],
    whatToExpect:
      "We'll start with a brief discussion of your goals, then practice 2-3 different meditation techniques. You'll receive personalized guidance and take-home practices to continue your journey.",
    duration: "45 minutes",
    price: "7000",
    icon: Brain,
    image: "/meditation-peaceful-space.jpg",
    preparation: [
      "Bring a journal if you like to write",
      "Wear comfortable clothing",
      "Come as you are - no experience needed",
    ],
  },
  {
    id: "counseling",
    title: "Spiritual Counseling",
    shortDesc: "Compassionate, reflective conversation to support life transitions.",
    fullDesc:
      "Navigate life's challenges with compassionate spiritual guidance. This is a safe space to explore your purpose, work through transitions, and connect with your inner wisdom. Drawing from various spiritual traditions while honoring your unique path.",
    benefits: [
      "Clarity on life purpose and direction",
      "Tools for navigating change",
      "Emotional healing and resilience",
      "Deeper self-understanding",
      "Spiritual connection and growth",
      "Practical wisdom for daily life",
    ],
    whatToExpect:
      "Our conversation will be guided by your needs and questions. I provide a non-judgmental space for reflection, gentle guidance, and practical tools you can use in your daily life.",
    duration: "60 minutes",
    price: "10000",
    icon: Users,
    image: "/spiritual-counseling-space.jpg",
    preparation: [
      "Think about what you'd like to explore",
      "Bring any questions or concerns",
      "Come with openness to self-reflection",
    ],
  },
]

export default function ServicesPage() {
  const [expandedCards, setExpandedCards] = useState<string[]>([])

  const toggleCard = (serviceId: string) => {
    setExpandedCards((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

const cardHover = {
  scale: 1.02,
  boxShadow: "0px 10px 30px -5px rgba(54, 69, 79, 0.15)",
};

const cardTransition = {
  type: "spring",
  stiffness: 400,
  damping: 17,
};

  return (
    <SiteProvider>
      <SiteHeader />
      <main className="section">
        <div className="container-soft">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl text-charcoal mb-4">Healing Services</h1>
            <p className="text-charcoal/80 text-lg max-w-2xl mx-auto leading-relaxed">
              Each session is designed to meet you where you are on your healing journey. Choose the service that
              resonates with your current needs and intentions.
            </p>
          </div>

          <div className="grid gap-8 lg:gap-12">
            {SERVICES.map((service) => {
              const IconComponent = service.icon
              const isExpanded = expandedCards.includes(service.id)

              return (
                <motion.div key={service.id} whileHover={cardHover} className="h-fit">
                  <Card className="overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={`${service.title} healing service`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-charcoal/20" />
                      <div className="absolute top-4 right-4 p-2 rounded-full bg-cream/90">
                        <IconComponent className="w-6 h-6 text-brand" />
                      </div>
                    </div>

                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-brand/10">
                          <IconComponent className="w-6 h-6 text-brand" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="font-serif text-2xl text-charcoal mb-2">{service.title}</CardTitle>
                          <p className="text-charcoal/80 text-lg">{service.shortDesc}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-charcoal/60 text-sm mb-1">
                            <Clock className="w-4 h-4" />
                            {service.duration}
                          </div>
                          <div className="flex items-center text-brand font-semibold text-xl">
                            <span>₹</span>
                            {service.price}
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <Button
                        variant="outline"
                        onClick={() => toggleCard(service.id)}
                        className="w-full mb-4 border-brand text-brand hover:bg-brand/5"
                      >
                        {isExpanded ? (
                          <>
                            Show Less <ChevronUp className="w-4 h-4 ml-2" />
                          </>
                        ) : (
                          <>
                            Learn More <ChevronDown className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>

                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <div>
                            <h3 className="font-semibold text-charcoal mb-2">About This Session</h3>
                            <p className="text-charcoal/80 leading-relaxed">{service.fullDesc}</p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-charcoal mb-2">Benefits You May Experience</h3>
                            <div className="grid sm:grid-cols-2 gap-2">
                              {service.benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-2">
                                  <Sparkles className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-charcoal/80">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-charcoal mb-2">What to Expect</h3>
                            <p className="text-charcoal/80 text-sm leading-relaxed">{service.whatToExpect}</p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-charcoal mb-2">How to Prepare</h3>
                            <ul className="space-y-1">
                              {service.preparation.map((item, index) => (
                                <li key={index} className="text-sm text-charcoal/80 flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-brand rounded-full mt-2 flex-shrink-0"></span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-4 border-t border-beige">
                            <Link href="/appointments">
                              <Button className="bg-gold hover:bg-gold/90 text-cream w-full glowing-button cursor-pointer">
                                Book {service.title}
                              </Button>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-beige/30 border-brand/20">
              <CardContent className="py-8">
                <h2 className="font-serif text-2xl text-charcoal mb-4">Ready to Begin Your Healing Journey?</h2>
                <p className="text-charcoal/80 mb-6 max-w-lg mx-auto">
                  Not sure which service is right for you? I'm here to help you choose the perfect starting point for
                  your unique path to wellness.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/appointments">
                    <Button className="bg-gold hover:bg-gold/90 text-cream cursor-pointer">Book a Session</Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="border-brand text-brand hover:bg-brand/5 bg-transparent cursor-pointer"
                    >
                      Ask a Question
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </SiteProvider>
  )
}
