import { FeedbackForm } from "@/components/feedback-form";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthProvider } from "@/components/auth-context";

export const dynamic = "force-dynamic";

export default function FeedbackFormPage({ params }: { params: { appointmentId: string } }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <SiteHeader />
        <main className="section flex-grow">
          <div className="container-soft">
            <FeedbackForm appointmentId={params.appointmentId} />
          </div>
        </main>
        <SiteFooter />
      </AuthProvider>
    </div>
  );
}
