import { IntakeForm } from "@/components/intake-form";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthProvider } from "@/components/auth-context";

// THE FIX: This line tells Next.js to always render this page dynamically
// on the server when a user visits it. This is required for pages that use
// dynamic URL parameters like [appointmentId].
export const dynamic = "force-dynamic";

export default function IntakeFormPage({ params }: { params: { appointmentId: string } }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <SiteHeader />
        <main className="section flex-grow">
          <div className="container-soft">
            <IntakeForm appointmentId={params.appointmentId} />
          </div>
        </main>
        <SiteFooter />
      </AuthProvider>
    </div>
  );
}

