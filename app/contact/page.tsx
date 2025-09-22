"use client"
import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SiteProvider } from "@/components/site-context"

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const businessEmail = "hello@jaipur-gems.com";

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = `
Message:
${message}
  `;

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${businessEmail}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(gmailLink, "_blank");
  };

  return (
    <SiteProvider>
      <SiteHeader />
      <main className="section">
        <div className="container-soft grid gap-8 md:grid-cols-2">
          <form
            className="space-y-4"
            aria-label="Contact form"
            onSubmit={handleSendMessage}
          >
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="How can we help?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Send Message</Button>
          </form>

          <div className="space-y-4">
            <div>
              <h2 className="font-serif text-2xl text-charcoal">Get in Touch</h2>
              <p className="mt-2 text-charcoal/80">
                Address, Phone, Email and business hours below.
              </p>
            </div>
            <ul className="space-y-1 text-sm text-charcoal/90">
              <li>
                <strong>Address:</strong> 123 Johari Bazar, Pink City, Jaipur,
                Rajasthan 302003
              </li>
              <li>
                <strong>Phone:</strong> (+91) 987-654-3210
              </li>
              <li>
                <strong>Email:</strong> {businessEmail}
              </li>
              <li>
                <strong>Hours:</strong> Mon–Fri 10am–6pm
              </li>
            </ul>
            <div className="aspect-video w-full overflow-hidden rounded border">
              <iframe
                title="PU Location"
                src="https://maps.google.com/maps?q=Johari%20Bazar%20Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </SiteProvider>
  )
}
