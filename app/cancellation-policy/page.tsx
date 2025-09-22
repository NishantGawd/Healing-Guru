"use client";

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SiteProvider } from "@/components/site-context"
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Clock,
    AlertCircle,
    CheckCircle,
    Calendar,
    Phone,
    Mail,
    Shield
} from "lucide-react";

const CancellationPolicyPage = () => {
    return (
        <SiteProvider>
            <SiteHeader />
            <div className="bg-cream py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* --- Header --- */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
                            Cancellation Policy
                        </h1>
                        <p className="text-lg text-charcoal/70">
                            Clear, fair policies designed with your wellbeing in mind.
                        </p>
                    </div>

                    {/* --- Policy Overview --- */}
                    <Card className="mb-8 border-l-4 border-l-brand bg-white">
                        <CardContent className="p-8">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-6 h-6 text-brand" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">
                                        Our Commitment to Flexibility
                                    </h2>
                                    <p className="text-charcoal/80 leading-relaxed mb-4">
                                        We understand that life can be unpredictable. Our policy is designed to be fair to both our clients and practitioners while ensuring we can maintain the high quality of care you deserve.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* --- Time-Based Policy Structure --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-brand bg-white">
                            <CardHeader className="text-center">
                                <CheckCircle className="w-12 h-12 text-brand mx-auto mb-2" />
                                <CardTitle className="font-serif text-lg">24+ Hours Notice</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-charcoal/80 text-sm">Full refund or free rescheduling with no penalties.</p>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-gold bg-white">
                            <CardHeader className="text-center">
                                <AlertCircle className="w-12 h-12 text-gold mx-auto mb-2" />
                                <CardTitle className="font-serif text-lg">12-24 Hours Notice</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-charcoal/80 text-sm">A 50% session fee applies, or you can reschedule for free.</p>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-destructive bg-white">
                            <CardHeader className="text-center">
                                <Clock className="w-12 h-12 text-destructive mx-auto mb-2" />
                                <CardTitle className="font-serif text-lg">Under 12 Hours</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-charcoal/80 text-sm">The full session fee is charged to honor the practitioner's reserved time.</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* --- START OF NEW SECTION: How to Cancel --- */}
                    <Card className="bg-white mb-12">
                        <CardHeader>
                            <CardTitle className="font-serif text-2xl">How to Cancel or Reschedule</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-semibold text-charcoal mb-4">Easy Cancellation Options</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                {/* Call Option */}
                                <div className="text-center p-4 border rounded-lg bg-cream/50">
                                    <Phone className="w-8 h-8 text-brand mx-auto mb-2" />
                                    <h4 className="font-semibold mb-1">Call</h4>
                                    <p className="text-sm text-charcoal/80">+91 123-456-7890</p>
                                    <p className="text-xs text-charcoal/60">Available 24/7</p>
                                </div>
                                {/* Email Option */}
                                <div className="text-center p-4 border rounded-lg bg-cream/50">
                                    <Mail className="w-8 h-8 text-brand mx-auto mb-2" />
                                    <h4 className="font-semibold mb-1">Email</h4>
                                    <p className="text-sm text-charcoal/80">schedule@healingguru.com</p>
                                    <p className="text-xs text-charcoal/60">Response within 2 hours</p>
                                </div>
                                {/* Online Option */}
                                <div className="text-center p-4 border rounded-lg bg-cream/50">
                                    <Calendar className="w-8 h-8 text-brand mx-auto mb-2" />
                                    <h4 className="font-semibold mb-1">Online</h4>
                                    <Link href="/dashboard" className="text-sm text-brand hover:underline">Client Dashboard</Link>
                                    <p className="text-xs text-charcoal/60">Instant confirmation</p>
                                </div>
                            </div>

                            <div className="bg-brand/5 p-6 rounded-lg">
                                <h4 className="font-semibold mb-2 flex items-center text-charcoal">
                                    <CheckCircle className="w-5 h-5 text-brand mr-2" />
                                    What You'll Need to Provide
                                </h4>
                                <ul className="space-y-1 text-sm text-charcoal/80 list-disc list-inside">
                                    <li>Your full name and contact information</li>
                                    <li>Appointment date and time</li>
                                    <li>Reason for cancellation (optional, but helps us improve)</li>
                                    <li>Preferred reschedule options (if applicable)</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                    {/* --- END OF NEW SECTION --- */}

                    {/* --- START OF NEW SECTION: Questions --- */}
                    <div className="bg-charcoal/5 rounded-lg text-center p-8">
                        <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">Questions About Our Policy?</h2>
                        <p className="mb-6 text-charcoal/80">
                            We're here to help! If you have questions or need to discuss special circumstances, please don't hesitate to reach out.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {/* Functional "Call Us" Button */}
                            <a href="tel:+911234567890">
                                <Button className="bg-cream text-charcoal hover:bg-cream/90 w-full">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Call Us Now
                                </Button>
                            </a>
                            {/* Functional "Send Email" Button */}
                            <a href="mailto:hello@healingguru.com">
                                <Button className="bg-gold text-cream hover:bg-gold/90 w-full">
                                    <Mail className="w-5 h-5 mr-2" />
                                    Send Email
                                </Button>
                            </a>
                        </div>
                    </div>
                    {/* --- END OF NEW SECTION --- */}

                </div>
            </div>
            <SiteFooter />
        </SiteProvider>
    );
};

export default CancellationPolicyPage;