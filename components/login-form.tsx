"use client";
import { useState } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc"; // ADDED: Icon for the button

export function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const { login, sendPasswordResetEmail, signInWithGoogle } = useAuth(); // ADDED: signInWithGoogle
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      toast({ title: "Signed in", description: "Welcome back!" });
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (err: any) {
      setError(err?.message ?? "Login failed");
      toast({ title: "Login failed", description: err?.message ?? "Please check your credentials and try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast({ title: "Email required", description: "Please enter your email address to reset your password." });
      return;
    }
    try {
      await sendPasswordResetEmail(email);
      toast({ title: "Password reset link sent!", description: "Please check your email for instructions." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to send reset link." });
    }
  };

  const handleSwitch = () => {
    setEmail("");
    setPassword("");
    setError(null);
    setShowPassword(false);
    onSwitch();
  };

  return (
    <form onSubmit={onSubmit} className="w-full space-y-4 rounded-lg border bg-cream p-6">
      <h1 className="font-serif text-2xl text-center text-charcoal">Login</h1>
      <div>
        <Label htmlFor="login-email">Email</Label>
        <Input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
      </div>
      <div>
        <Label htmlFor="login-password">Password</Label>
        <div className="relative">
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-charcoal/60 hover:text-charcoal"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <Button type="submit" className="w-full bg-gold text-cream" disabled={loading}>
        {loading ? "Signing in..." : "Login"}
      </Button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {/* --- ADDED: Divider and Google Sign-In Button --- */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-cream px-2 text-muted-foreground">
            OR CONTINUE WITH
          </span>
        </div>
      </div>
      <Button variant="outline" className="w-full" type="button" onClick={signInWithGoogle}>
        <FcGoogle className="mr-1 h-5 w-5" />
        Continue with Google
      </Button>
      {/* --- END ADDED SECTION --- */}

      <div className="flex items-center justify-between text-sm">
        <button type="button" onClick={handleForgotPassword} className="underline cursor-pointer">Forgot Password?</button>
        <button type="button" onClick={handleSwitch} className="underline cursor-pointer">Don&apos;t have an account? Sign Up</button>
      </div>
    </form>
  );
}