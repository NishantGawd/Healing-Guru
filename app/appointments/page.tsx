import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BookingWizard } from "@/components/booking-wizard"
import { AuthProvider } from "@/components/auth-context"

export default function AppointmentsPage() {
  return (
    <AuthProvider>
      <SiteHeader />
      <main className="section">
        <div className="container-soft">
          <h1 className="font-serif text-3xl text-charcoal mb-6">Book an Appointment</h1>
          <BookingWizard />
        </div>
      </main>
      <SiteFooter />
    </AuthProvider>
  )
}
