import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthProvider } from "@/components/auth-context"

export default function TermsOfServicePage() {
  return (
    <AuthProvider>
      <SiteHeader />
      <main className="section">
        <div className="container-soft max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-3xl text-charcoal">Terms of Service</CardTitle>
              <p className="text-charcoal/60 text-sm">Last updated: January 2025</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="font-serif text-xl text-charcoal mb-3">Acceptance of Terms</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  By accessing and using Healing Guru's services, you accept and agree to be bound by the terms and
                  provision of this agreement. If you do not agree to abide by the above, please do not use this
                  service.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-charcoal mb-3">Services Description</h2>
                <p className="text-charcoal/80 leading-relaxed mb-3">
                  Healing Guru provides holistic healing services including energy work, meditation guidance, and
                  wellness consultations. Our services are complementary and not intended to replace medical treatment.
                </p>
                <p className="text-charcoal/80 leading-relaxed">
                  All services are provided for wellness and relaxation purposes. We recommend consulting with
                  healthcare professionals for medical concerns.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-charcoal mb-3">Appointment Policy</h2>
                <ul className="text-charcoal/80 leading-relaxed space-y-2 list-disc list-inside">
                  <li>Appointments must be cancelled or rescheduled at least 24 hours in advance</li>
                  <li>Late cancellations may result in a cancellation fee</li>
                  <li>No-shows will be charged the full session fee</li>
                  <li>We reserve the right to reschedule appointments due to unforeseen circumstances</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-xl text-charcoal mb-3">Payment Terms</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  Payment is due at the time of booking unless other arrangements have been made. We accept major credit
                  cards and digital payments. Refunds are provided according to our cancellation policy.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-charcoal mb-3">Limitation of Liability</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  Healing Guru's services are provided "as is" without warranty of any kind. We shall not be liable for
                  any indirect, incidental, special, consequential, or punitive damages resulting from your use of our
                  services.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-charcoal mb-3">Privacy and Confidentiality</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  We maintain strict confidentiality regarding all client information and sessions. Please refer to our
                  Privacy Policy for detailed information about how we collect, use, and protect your personal data.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-charcoal mb-3">Modifications</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be posted on this page with an
                  updated revision date. Continued use of our services constitutes acceptance of modified terms.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-charcoal mb-3">Contact Information</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  For questions about these Terms of Service, please contact us at hello@healingguru.com or visit our
                  contact page.
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
