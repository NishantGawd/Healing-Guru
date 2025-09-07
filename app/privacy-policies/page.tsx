import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthProvider } from "@/components/auth-context"

export default function PrivacyPolicyPage() {
  return (
    <AuthProvider>
      <SiteHeader />
      <main className="section">
        <div className="container-soft max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-3xl text-charcoal">Privacy Policy</CardTitle>
              <p className="text-charcoal/60 text-sm">Last updated: January 2025</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="font-serif text-xl text-charcoal mb-3">Information We Collect</h2>
                <p className="text-charcoal/80 leading-relaxed mb-3">
                  We collect information you provide directly to us, such as when you create an account, book
                  appointments, or contact us. This may include your name, email address, phone number, and appointment
                  preferences.
                </p>
                <p className="text-charcoal/80 leading-relaxed">
                  We also collect information about your use of our services, including appointment history and
                  communication preferences to provide better service.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-charcoal mb-3">How We Use Your Information</h2>
                <ul className="text-charcoal/80 leading-relaxed space-y-2 list-disc list-inside">
                  <li>To provide, maintain, and improve our healing services</li>
                  <li>To process appointments and send confirmations</li>
                  <li>To communicate with you about your appointments and our services</li>
                  <li>To comply with legal obligations and protect our rights</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-xl text-charcoal mb-3">Information Sharing</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your
                  consent, except as described in this policy. We may share information with trusted service providers
                  who assist us in operating our website and conducting our business.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-charcoal mb-3">Data Security</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no method of transmission over the internet
                  is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-charcoal mb-3">Your Rights</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  You have the right to access, update, or delete your personal information. You may also opt out of
                  certain communications from us. To exercise these rights, please contact us using the information
                  provided on our contact page.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-charcoal mb-3">Contact Us</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at hello@healingguru.com or
                  through our contact page.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </AuthProvider>
  )
}
