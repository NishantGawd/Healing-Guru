"use client";

import { useState, useMemo, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";
import useSWR from "swr";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthProvider, useAuth } from "@/components/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Calendar, Clock, TrendingUp, BookOpen, Plus, CheckCircle, Edit } from "lucide-react";
import { AvailabilityCalendar } from "@/components/availability-calender";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FeedbackForm } from "@/components/feedback-form";

const fetcher = (url: string) => fetch(url, { cache: 'no-store' }).then((res) => res.json());

function DashboardInner() {
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [apptToCancel, setApptToCancel] = useState<any | null>(null);
    const { user, cancelAppointment, rescheduleAppointment } = useAuth();
    const { data: apiResponse, error, isLoading, mutate } = useSWR(user ? `/api/dashboard` : null, fetcher);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [journalEntry, setJournalEntry] = useState("");
    const [isJournalSaving, setIsJournalSaving] = useState(false);
    const { toast } = useToast();
    const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
    const [selectedAppt, setSelectedAppt] = useState<any | null>(null);
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");
    const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
    const [newGoalTitle, setNewGoalTitle] = useState("");
    const [isSavingGoal, setIsSavingGoal] = useState(false);
    const dashboardData = apiResponse?.data;

    const { stats, upcomingAppointments, pastAppointments } = useMemo(() => {
        if (!dashboardData) {
            return {
                stats: { totalSessions: 0, wellnessScore: 0, goalsProgress: "0/0" },
                upcomingAppointments: [],
                pastAppointments: []
            };
        }

        const now = new Date();
        const upcoming = dashboardData.appointments.filter((a: any) => new Date(a.date) >= now);
        const past = dashboardData.appointments.filter((a: any) => new Date(a.date) < now);

        // --- START OF FIX ---
        const totalGoals = dashboardData.goals.length;

        // Calculate the Wellness Score as the average of all goal progress percentages
        const sumOfProgress = dashboardData.goals.reduce((acc: number, goal: any) => acc + (goal.progress || 0), 0);
        const averageProgress = totalGoals > 0 ? Math.round(sumOfProgress / totalGoals) : 0;

        // The 'goalsProgress' stat can remain as the count of fully completed goals
        const completedGoals = dashboardData.goals.filter((g: any) => g.is_completed).length;
        // --- END OF FIX ---

        const stats = {
            totalSessions: dashboardData.appointments.length,
            wellnessScore: averageProgress, // Use the new average progress calculation
            goalsProgress: `${completedGoals}/${totalGoals}`,
        };

        return { stats, upcomingAppointments: upcoming, pastAppointments: past };
    }, [dashboardData]);

    const handleAddNewGoal = async () => {
        if (!newGoalTitle.trim()) {
            toast({ variant: "destructive", title: "Goal title cannot be empty." });
            return;
        }
        setIsSavingGoal(true);
        try {
            const res = await fetch('/api/goals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newGoalTitle }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to save goal.");
            }
            toast({ title: "Goal Added!", description: "Your new goal has been saved." });
            mutate(); // Re-fetch all dashboard data to show the new goal
            setIsAddGoalModalOpen(false);
            setNewGoalTitle("");
        } catch (err: any) {
            toast({ variant: "destructive", title: "Error", description: err.message });
        } finally {
            setIsSavingGoal(false);
        }
    };

    const handleJournalSave = async () => {
        if (!journalEntry.trim()) return;
        setIsJournalSaving(true);
        try {
            const res = await fetch('/api/journal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ entry_text: journalEntry }),
            });
            if (!res.ok) throw new Error("Failed to save entry.");

            toast({ title: "Journal Entry Saved", description: "Your wellness reflection has been recorded." });
            setJournalEntry("");
            mutate();
        } catch (err) {
            toast({ title: "Error", description: "Could not save your journal entry." });
        } finally {
            setIsJournalSaving(false);
        }
    };

    const openCancelModal = (appt: any) => {
        setApptToCancel(appt);
        setIsCancelModalOpen(true);
    };

    const openFeedbackModal = (appt: any) => {
        setSelectedAppt(appt);
        setIsFeedbackModalOpen(true);
    };

    const handleConfirmCancel = async () => {
        if (!apptToCancel) return;
        try {
            await cancelAppointment(apptToCancel.id);
            toast({ title: "Appointment Cancelled" });
            mutate();
        } catch (error: any) {
            toast({ title: "Error", description: error.message });
        } finally {
            setIsCancelModalOpen(false);
            setApptToCancel(null);
        }
    };

    const openRescheduleModal = (appt: any) => {
        setSelectedAppt(appt);
        setNewDate(appt.date);
        setNewTime(appt.time);
        setIsRescheduleModalOpen(true);
    };

    const handleReschedule = async () => {
        if (!selectedAppt || !newDate || !newTime) return;
        try {
            await rescheduleAppointment(selectedAppt.id, newDate, newTime);
            toast({ title: "Appointment Rescheduled!", description: `Your session is now on ${newDate} at ${newTime}.` });
            setIsRescheduleModalOpen(false);
            mutate();
        } catch (error: any) {
            toast({ title: "Error", description: error.message });
        }
    };

    if (isLoading) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }
    if (error || !dashboardData) {
        return (
            <div className="flex-grow flex items-center justify-center text-center">
                <div>
                    <h2 className="text-xl font-semibold text-charcoal/80">Could not load dashboard data.</h2>
                    <p className="text-charcoal/60">Please try refreshing the page.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <main className="section bg-cream flex-grow">
                <div className="container-soft">
                    <div className="mb-8">
                        <h1 className="text-3xl font-serif font-bold text-charcoal mb-2">
                            Welcome Back, {dashboardData.userName}
                        </h1>
                        <p className="text-charcoal/70">
                            This is your personal space to track your healing journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="bg-white border-beige"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-charcoal/60">Total Sessions</p><p className="text-2xl font-bold text-charcoal">{stats.totalSessions}</p></div><div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center"><Calendar className="w-6 h-6 text-brand" /></div></div></CardContent></Card>
                        <Card className="bg-white border-beige"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-charcoal/60">Wellness Score</p><p className="text-2xl font-bold text-charcoal">{stats.wellnessScore}%</p></div><div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center"><TrendingUp className="w-6 h-6 text-gold" /></div></div></CardContent></Card>
                        <Card className="bg-white border-beige"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-charcoal/60">Goals Progress</p><p className="text-2xl font-bold text-charcoal">{stats.goalsProgress}</p></div><div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center"><CheckCircle className="w-6 h-6 text-brand" /></div></div></CardContent></Card>
                    </div>

                    <Tabs defaultValue="appointments" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                            <TabsTrigger value="appointments">Appointments</TabsTrigger>
                            <TabsTrigger value="progress">Progress & Goals</TabsTrigger>
                            <TabsTrigger value="journal">Wellness Journal</TabsTrigger>
                            <TabsTrigger value="profile">My Profile</TabsTrigger>
                        </TabsList>

                        <TabsContent value="appointments" className="space-y-6">
                            <Card className="bg-white border-beige">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="font-serif">Upcoming Appointments</CardTitle>
                                    <Link href="/appointments"><Button className="bg-gold hover:bg-gold/90 text-cream"><Plus className="w-4 h-4 mr-2" />Book New Session</Button></Link>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {upcomingAppointments.length > 0 ? upcomingAppointments.map((appt: any) => (
                                            <div key={appt.id} className="p-4 border border-beige rounded-lg">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        {/* THE FIX: Display the service title */}
                                                        <h4 className="font-semibold text-charcoal">{appt.service.title}</h4>
                                                        <div className="flex items-center space-x-4 text-sm text-charcoal/60 mt-1">
                                                            <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" />{new Date(appt.date + 'T00:00:00').toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                            <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" />{appt.time}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" variant="outline" className="border-brand text-brand bg-cream" onClick={() => openRescheduleModal(appt)}>
                                                            <Edit className="w-4 h-4 mr-2" /> Reschedule
                                                        </Button>
                                                        {/* THE FIX: Pass the entire appt object to openCancelModal */}
                                                        <Button size="sm" variant="destructive" className="bg-charcoal text-cream" onClick={() => openCancelModal(appt)}>
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : <p className="text-charcoal/60 text-sm">You have no upcoming appointments.</p>}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-white border-beige">
                                <CardHeader><CardTitle className="font-serif">Session History</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {pastAppointments.length > 0 ? pastAppointments.map((appt: any) => (
                                            <div key={appt.id} className="p-4 border border-beige rounded-lg">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        {/* THE FIX: Display the service title for past appointments too */}
                                                        <h4 className="font-semibold text-charcoal">{appt.service.title}</h4>
                                                        <p className="text-sm text-charcoal/60">{new Date(appt.date + 'T00:00:00').toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                                    </div>
                                                    {!appt.feedback_submitted ? (
                                                        <Button size="sm" variant="outline" className="border-brand text-brand" onClick={() => openFeedbackModal(appt)}>
                                                            Leave Feedback
                                                        </Button>
                                                    ) : (
                                                        <Badge variant="secondary">Feedback Submitted</Badge>
                                                    )}
                                                </div>
                                                {appt.session_notes && appt.session_notes.length > 0 && (
                                                    <div className="text-sm text-charcoal/80 bg-cream/50 p-3 rounded-md border border-beige">
                                                        <p className="font-semibold mb-1">Notes from your practitioner:</p>
                                                        <p className="italic">"{appt.session_notes[0].note_text}"</p>
                                                    </div>
                                                )}
                                            </div>
                                        )) : <p className="text-charcoal/60 text-sm">You have no past appointments.</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="progress" className="space-y-6">
                            <Card className="bg-white border-beige">
                                <CardHeader><CardTitle className="font-serif">Your Healing Goals</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {dashboardData.goals.map((goal: any) => (
                                            <div key={goal.id} className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-semibold flex items-center">
                                                        {goal.is_completed && <CheckCircle className="w-4 h-4 text-brand mr-2" />}
                                                        {goal.title}
                                                    </h4>
                                                    <Badge variant={goal.is_completed ? "default" : "secondary"} className={goal.is_completed ? "bg-brand text-cream" : ""}>
                                                        {goal.progress}%
                                                    </Badge>
                                                </div>
                                                <Progress value={goal.progress} className="h-2 [&>div]:bg-brand" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 border-t border-beige pt-4">
                                        <Button onClick={() => setIsAddGoalModalOpen(true)} variant="outline" className="w-full border-brand text-brand hover:bg-brand/5">
                                            <Plus className="w-4 h-4 mr-2" />Add New Goal
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="journal" className="space-y-6">
                            <Card className="bg-white border-beige">
                                <CardHeader><CardTitle className="font-serif">Daily Wellness Reflection</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <Textarea
                                            placeholder="How are you feeling today? Reflect on your emotions, energy, and any insights..."
                                            value={journalEntry}
                                            onChange={(e) => setJournalEntry(e.target.value)}
                                            rows={6}
                                            className="resize-none"
                                        />
                                        <Button onClick={handleJournalSave} disabled={!journalEntry.trim() || isJournalSaving} className="bg-gold hover:bg-gold/90 text-cream">
                                            {isJournalSaving ? <LoadingSpinner size="sm" /> : <BookOpen className="w-4 h-4 mr-2" />} Save Entry
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-white border-beige">
                                <CardHeader><CardTitle className="font-serif">Recent Entries</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {dashboardData.journals.length > 0 ? dashboardData.journals.map((entry: any) => (
                                            <div key={entry.id} className="p-4 border border-beige rounded-lg">
                                                <p className="text-sm text-charcoal/60 mb-2">{new Date(entry.created_at).toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                                                <p className="text-sm text-charcoal/80 whitespace-pre-wrap">{entry.entry_text}</p>
                                            </div>
                                        )) : <p className="text-charcoal/60 text-sm">You have no journal entries yet.</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="profile">
                            <Card className="bg-white border-beige">
                                <CardHeader><CardTitle className="font-serif">Your Profile</CardTitle></CardHeader>
                                <CardContent>
                                    <ProfileTabContent />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            {isAddGoalModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md animate-in fade-in zoom-in-95">
                        <CardHeader>
                            <CardTitle className="font-serif text-xl">Add a New Goal</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label htmlFor="goal-title">Goal Title</Label>
                                <Input
                                    id="goal-title"
                                    placeholder="e.g., Practice mindfulness for 10 mins daily"
                                    value={newGoalTitle}
                                    onChange={(e) => setNewGoalTitle(e.target.value)}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 pt-4">
                            <Button variant="ghost" onClick={() => setIsAddGoalModalOpen(false)}>Cancel</Button>
                            <Button onClick={handleAddNewGoal} disabled={isSavingGoal} className="bg-gold hover:bg-gold/90 text-cream">
                                {isSavingGoal ? <LoadingSpinner size="sm" /> : "Save Goal"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}

            {/* THE FIX: Cancel Confirmation Modal with full-screen backdrop */}
            {isCancelModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                    <Card className="w-full max-w-md animate-in fade-in zoom-in-95">
                        <CardHeader>
                            <CardTitle className="font-serif text-xl">Confirm Cancellation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-charcoal/80">Are you sure you want to cancel your appointment?</p>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 pt-4">
                            <Button variant="ghost" onClick={() => setIsCancelModalOpen(false)}>Close</Button>
                            <Button variant={"destructive"} onClick={handleConfirmCancel}>
                                Cancel Appointment
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}

            {isRescheduleModalOpen && selectedAppt && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-2xl animate-in fade-in zoom-in-95 flex flex-col max-h-[90vh]">
                        <CardHeader>
                            <CardTitle>Reschedule Appointment</CardTitle>
                            <p className="text-sm text-charcoal/70">Select a new date and time for your "{selectedAppt.service.title}" session.</p>
                        </CardHeader>
                        <CardContent className="space-y-4 overflow-y-auto">
                            <AvailabilityCalendar
                                selectedDate={newDate}
                                selectedTime={newTime}
                                onDateTimeSelect={(date, time) => { setNewDate(date); setNewTime(time); }}
                                serviceId={(selectedAppt?.service?.title?.toLowerCase() || '').split(' ')[0]}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 pt-4 border-t">
                            <Button variant="ghost" onClick={() => setIsRescheduleModalOpen(false)}>Close</Button>
                            <Button onClick={handleReschedule} disabled={!newDate || !newTime}>Confirm Reschedule</Button>
                        </CardFooter>
                    </Card>
                </div>
            )}

            {isFeedbackModalOpen && selectedAppt && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                    <FeedbackForm
                        appointmentId={selectedAppt.id}
                        onClose={() => setIsFeedbackModalOpen(false)}
                        onSubmitSuccess={() => {
                            mutate(); // This re-fetches the dashboard data
                            setIsFeedbackModalOpen(false);
                        }}
                    />
                </div>
            )}
        </>
    );
}

function ProfileTabContent() {
    // CORRECTED: Initialize the browser client with your env variables
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { user, updatePassword } = useAuth();
    const { toast } = useToast();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [initialLoading, setInitialLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            // CORRECTED: Use the directly imported 'User' type
            const typedUser = user as unknown as User;
            if (!typedUser) {
                setInitialLoading(false);
                return;
            }

            setEmail(typedUser.email || "");
            const { data, error } = await supabase
                .from("profiles")
                .select("full_name, phone")
                .eq("id", typedUser.id)
                .single();

            if (data) {
                setName(data.full_name || "");
                setPhone(data.phone || "");
            } else if (typedUser.user_metadata?.full_name) {
                setName(typedUser.user_metadata.full_name as string);
            }

            if (error && error.code !== 'PGRST116') {
                console.error("Error fetching profile:", error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Could not load your profile details.",
                });
            }

            setInitialLoading(false);
        };

        if (user) {
            fetchProfile();
        }
    }, [user, supabase, toast]);

    // ... the rest of your handleSaveProfile, handleUpdatePassword, and return JSX functions
    // do not need to be changed. You can copy them from your existing file.
    const handleSaveProfile = async () => {
        const currentUserId = user?.id;
        if (!currentUserId) {
            toast({ title: "Error", description: "Your session has expired. Please log in again." });
            return;
        }

        setIsSaving(true);
        try {
            const { error } = await supabase
                .from("profiles")
                .upsert({
                    id: currentUserId,
                    full_name: name,
                    phone: phone,
                });

            if (error) throw error;

            toast({ title: "Success!", description: "Your profile has been updated." });
        } catch (error: any) {
            toast({ title: "Error", description: error.message || "Failed to update profile." });
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdatePassword = async () => {
        setPasswordError(null);
        if (newPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords do not match.");
            return;
        }
        setPasswordLoading(true);
        try {
            await updatePassword(newPassword);
            toast({ title: "Password Updated!", description: "Your password has been changed successfully." });
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            setPasswordError(error.message || "Failed to update password.");
        } finally {
            setPasswordLoading(false);
        }
    };



    if (initialLoading) {
        return <div className="flex justify-center items-center h-40"><LoadingSpinner /></div>;
    }

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h3 className="font-semibold text-lg text-charcoal">Personal Information</h3>
                <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} disabled />
                </div>
                <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone number" />
                </div>
                <Button onClick={handleSaveProfile} className="bg-gold text-cream" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Profile"}
                </Button>
            </div>
            <div className="space-y-4">
                <h3 className="font-semibold text-lg text-charcoal">Change Password</h3>
                <div>
                    <Label htmlFor="new">New Password</Label>
                    <Input id="new" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="confirm">Confirm New Password</Label>
                    <Input id="confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
                <Button onClick={handleUpdatePassword} className="bg-gold text-cream" disabled={passwordLoading}>
                    {passwordLoading ? "Updating..." : "Update Password"}
                </Button>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <AuthProvider>
                <SiteHeader />
                <DashboardInner />
                <SiteFooter />
            </AuthProvider>
        </div>
    );
}

