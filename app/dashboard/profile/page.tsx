// This is your profile page file (e.g., app/dashboard/profile/page.tsx)

"use client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-context"
import { AuthProvider } from "@/components/auth-context"
// 1. IMPORT REQUIRED HOOKS AND CLIENTS
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

function ProfileInner() {
  // Auth and Supabase hooks
  const { user, updateProfile, updatePassword } = useAuth();
  const { toast } = useToast();
  const supabase = createClient();

  // State for My Profile section
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  
  // State for Change Password section
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Effect to fetch full profile data on load
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }

    const fetchFullProfile = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;

      const { data } = await supabase
        .from("profiles")
        .select("full_name, phone")
        .eq("id", authUser.id)
        .single();
      
      if (data) {
        setName(data.full_name || user?.name || "");
        setPhone(data.phone || "");
      }
    };
    fetchFullProfile();
  }, [user, supabase]);

  // Handler for saving profile details
  const handleSaveProfile = async () => {
    setProfileLoading(true);
    try {
      await updateProfile({ name, phone });
      toast({ title: "Success!", description: "Your profile has been updated." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to update profile." });
    } finally {
      setProfileLoading(false);
    }
  };
  
  // Handler for updating the password
  const handleUpdatePassword = async () => {
    setPasswordError(null);
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    // Add other password validation checks here if needed

    setPasswordLoading(true);
    try {
      await updatePassword(newPassword);
      toast({ title: "Password Updated!", description: "Your password has been changed successfully." });
      // Clear fields after success
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setPasswordError(error.message || "Failed to update password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <main className="section flex-grow">
      <div className="container-soft grid gap-8 md:grid-cols-2">
        {/* === MY PROFILE SECTION (RESTORED) === */}
        <section className="space-y-4">
          <h1 className="font-serif text-3xl text-charcoal">My Profile</h1>
          <div className="rounded-lg border bg-cream p-6 space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} disabled />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone number" />
            </div>
            <Button onClick={handleSaveProfile} className="bg-gold text-cream cursor-pointer" disabled={profileLoading}>
              {profileLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </section>

        {/* === CHANGE PASSWORD SECTION === */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-charcoal">Change Password</h2>
          <div className="rounded-lg border bg-cream p-6 space-y-4">
            <div>
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="confirm">Confirm New Password</Label>
              <Input id="confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
            <Button onClick={handleUpdatePassword} className="bg-gold text-cream cursor-pointer" disabled={passwordLoading}>
              {passwordLoading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <SiteHeader />
        <ProfileInner />
        <SiteFooter />
      </AuthProvider>
    </div>
  )
}