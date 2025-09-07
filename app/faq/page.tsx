import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthProvider } from "@/components/auth-context"

const faqs = [
  {
    q: "What should I expect in my first session?",
    a: "We’ll start with a brief conversation about your goals and concerns. Sessions are gentle, fully clothed, and focused on creating relaxation and balance.",
  },
  {
    q: "Do I need to prepare anything?",
    a: "No special preparation is needed. Wear comfortable clothing and consider arriving a few minutes early to settle in.",
  },
  {
    q: "How do rescheduling and cancellations work?",
    a: "You can manage upcoming appointments from your dashboard. Please cancel or reschedule at least 24 hours in advance.",
  },
  {
    q: "Can I book without creating an account?",
    a: "You’ll need to log in to confirm bookings so we can send confirmations and reminders.",
  },
]

export default function FAQPage() {
  return (
    <AuthProvider>
      <SiteHeader />
      <main className="section">
        <div className="container-soft grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-charcoal">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-charcoal/80 leading-relaxed">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
          <Card className="bg-beige/60">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-charcoal">Still have questions?</CardTitle>
            </CardHeader>
            <CardContent className="text-charcoal/80 leading-relaxed">
              Reach out via the contact page and we’ll be happy to help you choose the right service and time.
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </AuthProvider>
  )
}
