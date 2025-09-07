"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-context"
import { AvailabilityCalendar } from "@/components/availability-calender"
import { LoadingSpinner } from "@/components/loading-spinner"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react"
import { IntakeForm } from "./intake-form"

// --- RAZORPAY LOGIC ---
declare global {
  interface Window {
    Razorpay: any
  }
}

async function loadRazorpayScript() {
  if (typeof window === "undefined") return false
  if ((window as any).razorpayLoaded) return true
  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => {
      ; (window as any).razorpayLoaded = true
      resolve(true)
    }
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

const AMOUNT_PAISE: Record<string, number> = {
  reiki: 900000,
  meditation: 700000,
  counseling: 1000000,
}
// --- END OF RAZORPAY LOGIC ---

// 1. THE FIX: Added `duration` and `price` back to the SERVICES array.
const SERVICES = [
  { id: "reiki", title: "Reiki Healing", duration: "60 min", price: "₹9000" },
  { id: "meditation", title: "Meditation Guidance", duration: "45 min", price: "₹7000" },
  { id: "counseling", title: "Spiritual Counseling", duration: "60 min", price: "₹10000" },
]

export function BookingWizard() {
  const { user, addAppointment } = useAuth()
  const [step, setStep] = useState(1)
  const [serviceId, setServiceId] = useState(SERVICES[0].id)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const [isIntakeModalOpen, setIsIntakeModalOpen] = useState(false)
  const [isIntakeFormSubmitted, setIsIntakeFormSubmitted] = useState(false)
  const [intakeFormData, setIntakeFormData] = useState(null)
  const selectedService = useMemo(() => SERVICES.find((s) => s.id === serviceId)!, [serviceId])
  const canNextFrom1 = Boolean(serviceId)
  const canNextFrom2 = Boolean(date && time)
  const canConfirm = Boolean(name && email && time && date && serviceId && isIntakeFormSubmitted)
  const handleDateTimeSelect = (selectedDate: string, selectedTime: string) => {
    setDate(selectedDate)
    setTime(selectedTime)
    setError(null)
  }

  const handleIntakeSubmitSuccess = (formData: any) => {
    setIntakeFormData(formData) // Store the data
    setIsIntakeFormSubmitted(true)
    setIsIntakeModalOpen(false) // Close the modal
    toast({ title: "Intake Form Submitted!", description: "You can now proceed with payment." })
  }

  const handleConfirm = async () => {
    setError(null)
    setSubmitting(true)
    try {
      if (!user) {
        const msg = "Please log in to confirm your booking."
        setError(msg)
        toast({ title: "Login required", description: msg })
        return
      }

      const amount = AMOUNT_PAISE[serviceId]
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "INR", notes: { serviceId } }),
      });
      const orderJson = await orderRes.json();
      if (!orderRes.ok || !orderJson?.order?.id) {
        throw new Error(orderJson?.error || "Unable to create payment order");
      }

      const loaded = await loadRazorpayScript()
      if (!loaded || !window.Razorpay) {
        throw new Error("Payment script failed to load")
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "Healing Guru",
        description: `${selectedService.title} on ${date} at ${time}`,
        order_id: orderJson.order.id,
        prefill: { name, email, contact: phone },
        notes: {
          "Service": selectedService.title,
          "Date": date,
          "Time": time,
        },
        theme: { color: "#c2a25f" },
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              booking: {
                serviceId,
                serviceName: selectedService.title,
                date,
                time,
                user_email: user.email,
                user_name: user.name,
              },
              intakeData: intakeFormData,
            }),
          });
          const verifyJson = await verifyRes.json();
          if (!verifyRes.ok || !verifyJson?.ok) {
            throw new Error(verifyJson?.error || "Payment verification failed");
          }

          // 2. THE FIX: Add the email sending logic here
          try {
            const emailData = {
              customerName: name,
              customerEmail: email,
              serviceName: selectedService.title,
              date: date,
              time: time,
              duration: selectedService.duration, // Now available
              price: selectedService.price,       // Now available
            };

            await fetch("/api/send-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ type: "confirmation", appointmentData: emailData }),
            });

            // Show both success toasts
            toast({ title: "Appointment confirmed!", description: `${selectedService.title} on ${date} at ${time}` });
            toast({ title: "Email Sent!", description: "A confirmation has been sent to your email address." });

          } catch (emailError) {
            console.error("Failed to send confirmation email:", emailError);
            toast({ title: "Appointment confirmed!", description: "There was an issue sending the confirmation email, but your booking is secure." });
          }

          if (phone) { // Only send if a phone number was provided
            try {
              await fetch('/api/send-whatsapp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  to: phone, // The user's phone number from the form
                  serviceName: selectedService.title,
                  date: date,
                  time: time,
                }),
              });
              toast({ title: "WhatsApp Sent!", description: "A confirmation has also been sent via WhatsApp." });
            } catch (whatsappError) {
              console.error("Failed to send WhatsApp message:", whatsappError);
              // Don't block the user, just log the error
            }
          }

          setStep(4);
        },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
            toast({ title: "Payment cancelled" });
          },
        },
      };

      const rp = new window.Razorpay(options)
      rp.open()
    } catch (err: any) {
      addAppointment({ userEmail: email, service: selectedService.title, date, time })
      toast({
        title: "Saved locally",
        description: err?.message?.toString() || "Payment failed, but booking saved locally.",
        variant: "destructive"
      })
      setStep(4)
    } finally {
      // Intentionally left blank as Razorpay's ondismiss handles this
    }
  }

  const goToStep = (targetStep: number) => {
    if (targetStep === 2 && !canNextFrom1) return
    if (targetStep === 3 && !canNextFrom2) return
    setError(null)
    setStep(targetStep)
  }

  // ... (The rest of your JSX remains exactly the same)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-beige/30 rounded-lg p-4">
        {[
          { num: 1, label: "Service", completed: step > 1 },
          { num: 2, label: "Date & Time", completed: step > 2 },
          { num: 3, label: "Details", completed: step > 3 },
          { num: 4, label: "Confirmation", completed: step >= 4 },
        ].map((item, index) => (
          <div key={item.num} className="flex items-center">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${item.completed ? "bg-brand text-cream" : step === item.num ? "bg-gold text-cream" : "bg-charcoal/20 text-charcoal/60"}`}
              >
                {item.completed ? <CheckCircle className="w-4 h-4" /> : item.num}
              </div>
              <span className={`ml-2 text-sm ${step === item.num ? "text-charcoal font-medium" : "text-charcoal/60"}`}>
                {item.label}
              </span>
            </div>
            {index < 3 && <div className={`w-8 h-0.5 mx-4 ${item.completed ? "bg-brand" : "bg-charcoal/20"}`} />}
          </div>
        ))}
      </div>

      <div className="animate-in fade-in duration-300">
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select a Service</CardTitle>
              <p className="text-sm text-charcoal/70">Choose the healing service that resonates with you</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label htmlFor="service">Service</Label>
              <select
                id="service"
                className="w-full rounded-md border bg-cream p-3 text-charcoal focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} • {s.duration} • {s.price}
                  </option>
                ))}
              </select>
              <div className="flex justify-end">
                <Button
                  className="bg-gold hover:bg-gold/90 text-cream transition-colors"
                  onClick={() => goToStep(2)}
                  disabled={!canNextFrom1}
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <AvailabilityCalendar
              selectedDate={date}
              selectedTime={time}
              onDateTimeSelect={handleDateTimeSelect}
              serviceId={serviceId}
            />
            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={() => goToStep(1)}
                className="text-charcoal hover:bg-beige transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button
                className="bg-gold hover:bg-gold/90 text-cream transition-colors"
                onClick={() => goToStep(3)}
                disabled={!canNextFrom2}
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Details</CardTitle>
              <p className="text-sm text-charcoal/70">Please provide your contact information</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {!user && (
                <div className="rounded-md border border-brand/40 bg-beige/50 p-3 text-sm text-charcoal">
                  Please{" "}
                  <Link href="/login" className="underline text-brand hover:text-brand/80 transition-colors">
                    log in
                  </Link>{" "}
                  to confirm your booking.
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-beige/30 rounded-md border border-brand/20">
                <h4 className="font-semibold text-charcoal mb-2">Booking Summary</h4>
                <div className="space-y-1 text-sm text-charcoal/80">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">{selectedService.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">
                      {date ? new Date(date + "T00:00:00").toLocaleDateString("en-US", {
                        weekday: "long", year: "numeric", month: "long", day: "numeric",
                      }) : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{time || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between border-t border-brand/20 pt-1 mt-2">
                    <span>Cost:</span>
                    <span className="font-semibold text-brand">{selectedService.price}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  onClick={() => goToStep(2)}
                  className="text-charcoal hover:bg-beige transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <div className="flex items-center gap-4">
                  {/* --- THE FIX: New "Fill Intake Form" Button --- */}
                  <Button variant="outline" onClick={() => setIsIntakeModalOpen(true)}>
                    {isIntakeFormSubmitted ? "Intake Form Complete" : "Fill Intake Form"}
                  </Button>
                  <Button
                    className="bg-gold hover:bg-gold/90 text-cream transition-colors min-w-[180px]"
                    onClick={handleConfirm}
                    disabled={!canConfirm || submitting}
                  >
                    {submitting ? (<><LoadingSpinner size="sm" /><span className="ml-2">Processing Payment...</span></>) : ("Pay & Confirm Booking")}
                  </Button>
                </div>
              </div>
              {error && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200"
                >
                  {error}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-brand" />
              </div>
              <CardTitle className="text-2xl text-brand">Booking Confirmed!</CardTitle>
              <p className="text-charcoal/70">Your healing journey begins soon</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-charcoal/90">
                Thank you, {name}! Your healing session is confirmed.
              </p>
              <div className="bg-beige/30 rounded-md p-4 text-left">
                <h4 className="font-semibold text-charcoal mb-3">Session Details</h4>
                <div className="space-y-2 text-sm text-charcoal/80">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">{selectedService.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">
                      {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
                        weekday: "long", year: "numeric", month: "long", day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{time}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Link href="/dashboard/appointments">
                  <Button
                    variant="outline"
                    className="border-brand text-brand hover:bg-brand/5 transition-colors bg-transparent"
                  >
                    View My Appointments
                  </Button>
                </Link>
                <Link href="/">
                  <Button className="bg-gold hover:bg-gold/90 text-cream transition-colors">Return Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      {isIntakeModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <IntakeForm
            onClose={() => setIsIntakeModalOpen(false)}
            onSubmitSuccess={handleIntakeSubmitSuccess}
          />
        </div>
      )}
    </div>
  )
}
