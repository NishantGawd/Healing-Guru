"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthProvider } from "@/components/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Lock, 
  Eye, 
  Users, 
  FileText, 
  Mail,
  AlertCircle,
  CheckCircle,
  Clock,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicyPage = () => {
  return (
    <AuthProvider>
      <SiteHeader />
    <div className="bg-cream text-charcoal py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* --- Header --- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-charcoal/70 mb-6">
            Your privacy and confidentiality are sacred to us.
          </p>
          <Badge variant="outline" className="border-brand/50 text-brand">
            Last Updated: September 11, 2025
          </Badge>
        </div>

        {/* --- Privacy Commitment --- */}
        <Card className="mb-8 border-l-4 border-l-brand bg-white">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-brand" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">
                  Our Sacred Commitment to Your Privacy
                </h2>
                <p className="text-charcoal/80 leading-relaxed mb-4">
                  At Healing Guru, we understand that your healing journey is deeply personal. We are committed to protecting your privacy with the same care and respect we bring to our healing work. This policy explains how we collect, use, and safeguard your information.
                </p>
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-brand" />
                  <span className="font-semibold text-brand">HIPAA-compliant data protection</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- Information We Collect --- */}
        <Card className="mb-8 bg-white">
          <CardHeader>
            <CardTitle className="font-serif flex items-center">
              <FileText className="w-6 h-6 mr-3 text-brand" />
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-semibold text-lg mb-3">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-brand">Contact Details</h4>
                    <ul className="space-y-1 text-sm text-charcoal/80 list-disc list-inside">
                      <li>Full name and preferred name</li>
                      <li>Email address and phone number</li>
                      <li>Mailing address</li>
                      <li>Emergency contact information</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-brand">Health Information (PHI)</h4>
                    <ul className="space-y-1 text-sm text-charcoal/80 list-disc list-inside">
                      <li>Health history and current conditions</li>
                      <li>Medications and allergies</li>
                      <li>Previous healing experiences</li>
                      <li>Session notes and progress</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-charcoal/5 p-6 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Eye className="w-5 h-5 text-gold mr-2" />
                  Automatically Collected Information
                </h4>
                <ul className="space-y-1 text-sm text-charcoal/80 list-disc list-inside">
                  <li>Website usage data and analytics</li>
                  <li>Device information and IP addresses</li>
                  <li>Appointment scheduling and attendance records</li>
                  <li>Payment and billing information</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* --- How We Use Information --- */}
        <Card className="mb-8 bg-white">
            <CardHeader>
            <CardTitle className="font-serif flex items-center">
                <CheckCircle className="w-6 h-6 mr-3 text-brand" />
                How We Use Your Information
            </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                <h3 className="font-semibold mb-3 text-brand">Primary Uses</h3>
                <ul className="space-y-2">
                    <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-charcoal/80">Provide personalized healing services</span>
                    </li>
                    <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-charcoal/80">Schedule and manage appointments</span>
                    </li>
                    <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-charcoal/80">Track your healing progress</span>
                    </li>
                    <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-brand mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-charcoal/80">Process payments and billing</span>
                    </li>
                </ul>
                </div>
                <div>
                <h3 className="font-semibold mb-3 text-gold">Secondary Uses</h3>
                <ul className="space-y-2">
                    <li className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-gold mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-charcoal/80">Improve our services and website</span>
                    </li>
                    <li className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-gold mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-charcoal/80">Send educational content (with consent)</span>
                    </li>
                    <li className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-gold mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-charcoal/80">Comply with legal requirements</span>
                    </li>
                </ul>
                </div>
            </div>
            </CardContent>
        </Card>

        {/* --- How We Protect Your Information --- */}
        <Card className="mb-8 bg-white">
            <CardHeader>
                <CardTitle className="font-serif flex items-center">
                    <Lock className="w-6 h-6 mr-3 text-brand" />
                    How We Protect Your Information
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 border rounded-lg bg-cream/50">
                        <Lock className="w-8 h-8 text-brand mx-auto mb-2" />
                        <h4 className="font-semibold mb-1">Encryption</h4>
                        <p className="text-xs text-charcoal/60">256-bit SSL encryption for all data transmission</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg bg-cream/50">
                        <Shield className="w-8 h-8 text-brand mx-auto mb-2" />
                        <h4 className="font-semibold mb-1">Secure Storage</h4>
                        <p className="text-xs text-charcoal/60">HIPAA-compliant cloud infrastructure</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg bg-cream/50">
                        <Users className="w-8 h-8 text-brand mx-auto mb-2" />
                        <h4 className="font-semibold mb-1">Access Control</h4>
                        <p className="text-xs text-charcoal/60">Limited access on a need-to-know basis</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* --- Your Privacy Rights --- */}
        <Card className="mb-8 bg-white">
            <CardHeader>
            <CardTitle className="font-serif flex items-center">
                <Users className="w-6 h-6 mr-3 text-brand" />
                Your Privacy Rights
            </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-semibold mb-3 text-brand">Access & Control</h3>
                    <ul className="space-y-2">
                        <li className="flex items-start"><Eye className="w-4 h-4 text-brand mr-2 mt-0.5 flex-shrink-0" /><span className="text-sm text-charcoal/80">Request access to your personal information</span></li>
                        <li className="flex items-start"><FileText className="w-4 h-4 text-brand mr-2 mt-0.5 flex-shrink-0" /><span className="text-sm text-charcoal/80">Request corrections or updates</span></li>
                        <li className="flex items-start"><Lock className="w-4 h-4 text-brand mr-2 mt-0.5 flex-shrink-0" /><span className="text-sm text-charcoal/80">Request deletion of your data</span></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-3 text-gold">Additional Rights</h3>
                    <ul className="space-y-2">
                        <li className="flex items-start"><Users className="w-4 h-4 text-gold mr-2 mt-0.5 flex-shrink-0" /><span className="text-sm text-charcoal/80">Opt-out of marketing communications</span></li>
                        <li className="flex items-start"><AlertCircle className="w-4 h-4 text-gold mr-2 mt-0.5 flex-shrink-0" /><span className="text-sm text-charcoal/80">Lodge privacy complaints</span></li>
                        <li className="flex items-start"><Shield className="w-4 h-4 text-gold mr-2 mt-0.5 flex-shrink-0" /><span className="text-sm text-charcoal/80">Withdraw consent at any time</span></li>
                    </ul>
                </div>
            </div>
            <div className="mt-6 p-4 bg-charcoal/5 rounded-lg text-sm text-charcoal/80">
                <strong>Response Time:</strong> We will respond to privacy requests within 30 days. For urgent requests, please call us directly.
            </div>
            </CardContent>
        </Card>

        {/* --- Contact CTA --- */}
        <div className="bg-charcoal/5 rounded-lg text-center p-8">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">Privacy Questions or Concerns?</h2>
            <p className="mb-6 text-charcoal/80">
                We are committed to transparency. If you have any questions about this policy, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+911234567890">
                    <Button className="bg-cream text-charcoal hover:bg-cream/90 w-full">
                        <Phone className="w-5 h-5 mr-2" />
                        Call Our Privacy Line
                    </Button>
                </a>
                <a href="mailto:privacy@healingguru.com">
                    <Button className="bg-gold text-cream hover:bg-gold/90 w-full">
                        <Mail className="w-5 h-5 mr-2" />
                        Email The Privacy Officer
                    </Button>
                </a>
            </div>
        </div>
      </div>
    </div>
    <SiteFooter />
    </AuthProvider>
  );
};

export default PrivacyPolicyPage;