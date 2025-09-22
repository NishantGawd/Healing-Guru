// app/update-password/page.tsx

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteProvider } from "@/components/site-context";

function UpdatePasswordInner() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { toast } = useToast();
    const supabase = createClient();

    const validatePassword = () => {
        // ... (you can copy the strong password validation from signup-form.tsx here)
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return false;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }
        return true;
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!validatePassword()) return;

        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;
            toast({
                title: "Password Updated!",
                description: "You can now log in with your new password.",
            });
            router.push("/login");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="section flex-grow flex items-center justify-center">
            <form onSubmit={handleUpdatePassword} className="w-full max-w-md space-y-4 rounded-lg border bg-cream p-6">
                <h1 className="font-serif text-2xl text-center text-charcoal">Set New Password</h1>
                <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <Button type="submit" className="w-full bg-gold text-cream" disabled={loading}>
                    {loading ? "Updating..." : "Update Password"}
                </Button>
            </form>
        </main>
    );
}

export default function UpdatePasswordPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteProvider>
                <SiteHeader />
                <UpdatePasswordInner />
                <SiteFooter />
            </SiteProvider>
        </div>
    );
}