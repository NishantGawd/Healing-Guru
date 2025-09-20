"use client";
import { useState, useEffect } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc"; // ADDED: Icon for the button

export function SignupForm({ onSwitch }: { onSwitch: () => void }) {
  const { signUp, signInWithGoogle } = useAuth(); // ADDED: signInWithGoogle
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match.");
    } else {
      setPasswordMatchError(null);
    }
  }, [password, confirmPassword]);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setError("Please enter a valid email address."); return false; }
    if (password.length < 8) { setError("Password must be at least 8 characters long."); return false; }
    if (!/[A-Z]/.test(password)) { setError("Password must contain at least one uppercase letter."); return false; }
    if (!/[a-z]/.test(password)) { setError("Password must contain at least one lowercase letter."); return false; }
    if (!/[0-9]/.test(password)) { setError("Password must contain at least one number."); return false; }
    if (!/[^A-Za-z0-9]/.test(password)) { setError("Password must contain at least one special character."); return false; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return false; }
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateForm()) return;
    setLoading(true);
    try {
      await signUp(fullName, email, password);
      toast({ title: "Account created!", description: "Welcome! Please check your email to verify your account." });
      router.push("/");
    } catch (err: any) {
      setError(err?.message ?? "Sign up failed");
      toast({ title: "Sign up failed", description: err?.message ?? "This email might already be in use." });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSwitch = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
    setPasswordMatchError(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
    onSwitch();
  };

  return (
    <form onSubmit={onSubmit} className="w-full space-y-3 rounded-lg border bg-cream p-6">
      <h1 className="font-serif text-2xl text-center text-charcoal">Create Account</h1>
      <div>
        <Label htmlFor="signup-fullname">Full Name</Label>
        <Input id="signup-fullname" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Jane Doe" required />
      </div>
      <div>
        <Label htmlFor="signup-email">Email</Label>
        <Input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
      </div>
      <div>
        <Label htmlFor="signup-password">Password</Label>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="pr-10"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-charcoal/60 hover:text-charcoal">
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {passwordMatchError && (
        <p className="text-sm font-medium text-red-600 animate-in fade-in">
          {passwordMatchError}
        </p>
      )}
      <div>
        <Label htmlFor="signup-confirm-password">Confirm Password</Label>
        <div className="relative">
          <Input
            id="signup-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="pr-10"
          />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-charcoal/60 hover:text-charcoal">
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {error && (<div className="text-sm text-red-600 bg-red-100 p-2 rounded-md">{error}</div>)}
      <Button type="submit" className="w-full bg-gold text-cream" disabled={loading}>
        {loading ? "Creating account..." : "Sign Up"}
      </Button>

      {/* --- ADDED: Divider and Google Sign-In Button --- */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-cream px-2 text-muted-foreground">
            OR
          </span>
        </div>
      </div>
      <Button variant="outline" className="w-full" type="button" onClick={signInWithGoogle}>
        <FcGoogle className="mr-1 h-5 w-5" />
        Sign Up with Google
      </Button>
      {/* --- END ADDED SECTION --- */}

      <div className="text-center text-sm pt-2">
        <button type="button" onClick={handleSwitch} className="underline cursor-pointer">Already have an account? Log in</button>
      </div>
    </form>
  );
}