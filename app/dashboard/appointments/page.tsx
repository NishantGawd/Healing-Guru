"use client"
import useSWR from "swr"
import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth, AuthProvider } from "@/components/auth-context"
import { useToast } from "@/hooks/use-toast"
import { AvailabilityCalendar } from "@/components/availability-calender"

interface Appointment {
  id: string;
  service: string;
  date: string;
  time: string;
  feedback_submitted: boolean; 
}

const fetcher = (url: string) => fetch(url, { cache: 'no-store' }).then((r) => r.json())

function AppointmentsInner() {
  const { user, cancelAppointment, rescheduleAppointment } = useAuth()
  const { toast } = useToast()
  const { data, mutate } = useSWR(user ? `/api/appointments?email=${user.email}` : null, fetcher)
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null)
  const [newDate, setNewDate] = useState("")
  const [newTime, setNewTime] = useState("")

  const myAppts: Appointment[] = data?.data || []
  const now = new Date()
  const parse = (a: { date: string; time: string }) => {
    const [timePart, ampm] = a.time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    if (ampm === 'PM' && hours !== 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    const date = new Date(a.date);
    date.setUTCHours(hours, minutes, 0, 0); 
    return date;
  }
  const upcoming = myAppts.filter((a) => parse(a) >= now)
  const past = myAppts.filter((a) => parse(a) < now)

  const handleCancel = async (id: string) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      await cancelAppointment(id);
      toast({ title: "Appointment Cancelled" });
      mutate();
    } catch (error: any) {
      toast({ title: "Error", description: error.message });
    }
  }

  const openRescheduleModal = (appt: Appointment) => {
    setSelectedAppt(appt);
    setNewDate(appt.date);
    setNewTime(appt.time);
    setIsModalOpen(true);
  }

  const handleReschedule = async () => {
    if (!selectedAppt || !newDate || !newTime) return;
    try {
      await rescheduleAppointment(selectedAppt.id, newDate, newTime);
      toast({ title: "Appointment Rescheduled!", description: `Your session is now on ${newDate} at ${newTime}.` });
      setIsModalOpen(false);
      mutate();
    } catch (error: any) {
      toast({ title: "Error", description: error.message });
    }
  }

  return (
    <>
      <main className="section flex-grow">
        <div className="container-soft space-y-8">
          <h1 className="font-serif text-3xl text-charcoal">My Appointments</h1>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl">Upcoming Appointments</h2>
            {upcoming.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {upcoming.map((a) => (
                  <Card key={a.id}>
                    <CardHeader>
                      <CardTitle className="text-xl">{a.service}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm text-charcoal/80">
                        <div><strong>Date:</strong> {new Date(a.date + 'T00:00:00').toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                        <div><strong>Time:</strong> {a.time}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="outline" className="border-brand text-brand bg-cream cursor-pointer" onClick={() => openRescheduleModal(a)}>
                          Reschedule
                        </Button>
                        <Button onClick={() => handleCancel(a.id)} variant="destructive" className="bg-charcoal text-cream cursor-pointer">
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (<p className="text-charcoal/70">No upcoming appointments.</p>)}
          </section>
          
          <section className="space-y-4">
            <h2 className="font-serif text-2xl">Past Appointments</h2>
            {past.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {past.map((a) => (
                  <Card key={a.id}>
                    <CardHeader><CardTitle className="text-xl">{a.service}</CardTitle></CardHeader>
                    <CardContent>
                      <div className="text-sm text-charcoal/80">
                        <div><strong>Date:</strong> {new Date(a.date + 'T00:00:00').toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                        <div><strong>Time:</strong> {a.time}</div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {!a.feedback_submitted ? (
                        <Link href={`/dashboard/appointments/${a.id}/feedback`} passHref>
                          <Button variant="outline">Leave Feedback</Button>
                        </Link>
                      ) : (
                        <Badge variant="secondary">Feedback Submitted</Badge>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (<p className="text-charcoal/70">No past appointments.</p>)}
          </section>
        </div>
      </main>

      {isModalOpen && selectedAppt && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
           <Card className="w-full max-w-2xl animate-in fade-in zoom-in-95 flex flex-col max-h-[90vh]">
            <CardHeader>
              <CardTitle>Reschedule Appointment</CardTitle>
              <p className="text-sm text-charcoal/70">Select a new date and time for your "{selectedAppt.service}" session.</p>
            </CardHeader>
            <CardContent className="space-y-4 overflow-y-auto">
              <AvailabilityCalendar
                selectedDate={newDate}
                selectedTime={newTime}
                onDateTimeSelect={(date, time) => { setNewDate(date); setNewTime(time); }}
                serviceId={(selectedAppt?.service?.toLowerCase() || '').split(' ')[0]}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Close</Button>
              <Button onClick={handleReschedule} disabled={!newDate || !newTime}>Confirm Reschedule</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}

export default function MyAppointmentsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <SiteHeader />
        <AppointmentsInner />
        <SiteFooter />
      </AuthProvider>
    </div>
  )
}

