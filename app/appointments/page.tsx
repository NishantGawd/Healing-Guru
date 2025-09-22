"use client"; // Required for SiteProvider and client components

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookingWizard } from "@/components/booking-wizard";
import { SiteProvider } from "@/components/site-context";

export default function AppointmentsPage() {
  return (
    <SiteProvider>
        <div className="flex flex-col min-h-screen bg-cream">
            <SiteHeader />
            {/* --- FIX FOR MOBILE LAYOUT --- */}
            {/* Changed main section padding for better mobile view */}
            <main className="flex-grow py-8 px-4 md:py-12">
                {/* The container is now centered with a max-width, 
                  ensuring it doesn't stretch too wide on desktop 
                  but uses full width on mobile.
                */}
                <div className="container mx-auto max-w-3xl">
                    <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-8 text-center md:text-left">
                        Book an Appointment
                    </h1>
                    {/* The BookingWizard component will now live inside this responsive container */}
                    <BookingWizard />
                </div>
            </main>
            <SiteFooter />
        </div>
    </SiteProvider>
  );
}
