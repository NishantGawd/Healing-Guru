"use client";

import { useState } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "@/components/auth-context"; // Import AuthProvider
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { HealingLogo } from "@/components/healing-logo";
import { Eye, EyeOff, Loader2, User, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

// This is our main UI component. All the logic and JSX goes here.
function AuthPageInner() {
  const [isLoginView, setIsLoginView] = useState(true);
  
  const [fullName, setFullName] =useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Now this hook call is safe because AuthProvider is a parent
  const { login, signUp, signInWithGoogle } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const resetFormState = () => {
    setError(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const toggleView = () => {
    resetFormState();
    setIsLoginView(!isLoginView);
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      toast({ title: "Signed in", description: "Welcome back!" });
      setTimeout(() => router.push("/dashboard"), 500);
    } catch (err: any) {
      setError(err?.message ?? "Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
    }
    try {
      await signUp(fullName, email, password);
      toast({ title: "Account Created!", description: "Welcome! Please check your email to verify." });
       setTimeout(() => router.push("/dashboard"), 500);
    } catch (err: any) {
        setError(err?.message ?? "Failed to create account.");
        setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isLoginView) {
      await handleLogin();
    } else {
      await handleSignUp();
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <HealingLogo className="h-20 w-auto" />
        </div>

        <div className="rounded-xl border border-beige shadow-lg bg-cream/80 backdrop-blur-sm p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLoginView ? 'login' : 'signup'}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="text-center mb-8">
                <h1 className="font-serif text-3xl text-charcoal">
                  {isLoginView ? "Welcome Back" : "Create Your Account"}
                </h1>
                <p className="text-charcoal/70 mt-2">
                  {isLoginView ? "Sign in to continue your journey." : "Begin your healing journey with us."}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {error && (
             <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                <div className="bg-red-100 border border-red-300 text-red-800 text-sm rounded-lg p-3 text-center">
                    {error}
                </div>
            </motion.div>
          )}

          <div className="space-y-4">
            <Button variant="outline" className="w-full h-12 text-charcoal border-beige hover:bg-gold/10" onClick={signInWithGoogle} disabled={loading}>
              <FcGoogle className="mr-2 h-5 w-5" /> Continue with Google
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-beige" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-cream/80 px-2 text-charcoal/60">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence>
                {!isLoginView && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-1 mb-4">
                       <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/40" />
                            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Jane Doe" required className="pl-10"/>
                        </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                 <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/40" />
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="pl-10"/>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/40" />
                    <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="pl-10 pr-10"/>
                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal">
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
              </div>

              <AnimatePresence>
                {!isLoginView && (
                   <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-1">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                         <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/40" />
                            <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required className="pl-10 pr-10"/>
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal">
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                   </motion.div>
                )}
              </AnimatePresence>

              <Button type="submit" className="w-full bg-gold text-cream hover:bg-gold/90 h-12 font-semibold" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : (isLoginView ? "Sign In" : "Create Account")}
              </Button>
            </form>
            
            <p className="text-center text-sm text-charcoal/80 pt-4">
              {isLoginView ? "Don't have an account?" : "Already have an account?"}{' '}
              <button onClick={toggleView} className="font-semibold text-gold hover:underline">
                {isLoginView ? "Sign Up" : "Sign In"}
              </button>
            </p>

          </div>
        </div>
      </motion.div>
    </div>
  );
}


// This is the main component for the route. It wraps our UI in the AuthProvider.
export default function AuthPage() {
  return (
    <AuthProvider>
      <AuthPageInner />
    </AuthProvider>
  );
}

