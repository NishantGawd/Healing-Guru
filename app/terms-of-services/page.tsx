"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteProvider } from "@/components/site-context";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText,
  Sparkles,
  Calendar,
  Shield,
  AlertCircle,
  Mail,
  Phone
} from "lucide-react";

const TermsOfServicePage = () => {
  return (
    <SiteProvider>
      <SiteHeader />
    <div className="bg-cream text-charcoal py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* --- Header --- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-charcoal/70 mb-6">
            Please read these terms carefully before using our services.
          </p>
          <Badge variant="outline" className="border-brand/50 text-brand">
            Last Updated: September 11, 2025
          </Badge>
        </div>
        
        {/* --- Legal Disclaimer --- */}
        <Card className="bg-gold/10 border-gold/50 text-charcoal/90 p-6 mb-8">
            <p className="font-bold">Disclaimer:</p>
            <p className="text-sm">This is a general template and not a substitute for professional legal advice. Consult a lawyer to tailor these terms to your specific business needs.</p>
        </Card>

        <div className="space-y-8">
          {/* --- Section 1: Acceptance of Terms --- */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="font-serif flex items-center">
                <FileText className="w-6 h-6 mr-3 text-brand" />
                1. Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-charcoal/80 leading-relaxed">
                By accessing and using Healing Guru's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          {/* --- Section 2: Services Description --- */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="font-serif flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-brand" />
                2. Services Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-charcoal/80 leading-relaxed">
                Healing Guru provides holistic healing services including energy work, meditation guidance, and wellness consultations. Our services are complementary and not intended to replace medical treatment.
              </p>
              <p className="text-charcoal/80 leading-relaxed">
                All services are provided for wellness and relaxation purposes. We recommend consulting with healthcare professionals for medical concerns.
              </p>
            </CardContent>
          </Card>

          {/* --- Section 3: Appointments & Payments --- */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="font-serif flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-brand" />
                3. Appointments & Payments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <p className="text-charcoal/80 leading-relaxed font-semibold">Payment is due at the time of booking. We accept major credit cards and digital payments. Refunds are provided according to our cancellation policy.</p>
               <ul className="text-charcoal/80 leading-relaxed space-y-2 list-disc list-inside">
                  <li>Appointments must be cancelled or rescheduled at least 24 hours in advance.</li>
                  <li>Late cancellations may result in a fee as per our <Link href="/cancellation-policy" className="text-brand font-semibold hover:underline">Cancellation Policy</Link>.</li>
                  <li>No-shows will be charged the full session fee.</li>
                </ul>
            </CardContent>
          </Card>

          {/* --- Section 4: Liability & Confidentiality --- */}
           <Card className="bg-white">
            <CardHeader>
              <CardTitle className="font-serif flex items-center">
                <Shield className="w-6 h-6 mr-3 text-brand" />
                4. Liability & Confidentiality
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-charcoal/80 leading-relaxed">
                Healing Guru's services are provided "as is" without warranty of any kind. We shall not be liable for any damages resulting from your use of our services.
              </p>
               <p className="text-charcoal/80 leading-relaxed">
                  We maintain strict confidentiality regarding all client information. Please refer to our <Link href="/privacy-policy" className="text-brand font-semibold hover:underline">Privacy Policy</Link> for detailed information.
                </p>
            </CardContent>
          </Card>

          {/* --- Section 5: Modifications --- */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="font-serif flex items-center">
                <AlertCircle className="w-6 h-6 mr-3 text-gold" />
                5. Modifications to Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-charcoal/80 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Continued use of our services constitutes acceptance of modified terms.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* --- Contact CTA --- */}
        <div className="bg-charcoal/5 rounded-lg text-center p-8 mt-12">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">Questions About Our Terms?</h2>
            <p className="mb-6 text-charcoal/80">
                For questions about these Terms of Service, please contact us.
            </p>
            <div className="flex items-center justify-center space-x-6">
              <a href="mailto:hello@healingguru.com" className="flex items-center space-x-2 text-charcoal font-semibold hover:text-brand transition-colors">
                <Mail className="w-5 h-5" />
                <span>hello@healingguru.com</span>
              </a>
              <a href="tel:+911234567890" className="flex items-center space-x-2 text-charcoal font-semibold hover:text-brand transition-colors">
                <Phone className="w-5 h-5" />
                <span>+91 123-456-7890</span>
              </a>
            </div>
        </div>
      </div>
    </div>
    <SiteFooter />
    </SiteProvider>
  );
};

export default TermsOfServicePage;