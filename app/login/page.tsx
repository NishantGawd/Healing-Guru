"use client";

import { useState } from "react";
import { AuthProvider } from "@/components/auth-context";
import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { cn } from "@/lib/utils";
import { HealingLogo } from "@/components/healing-logo";

function AuthPageInner() {
  const [isLoginView, setIsLoginView] = useState(true);
  const toggleView = () => setIsLoginView((prev) => !prev);

  return (
    <main className="flex flex-grow items-center justify-center p-4">
      {/* Container for the sliding forms. Increased height to fit the logo + taller form. */}
      <div className="relative w-full max-w-md h-[800px] overflow-hidden">
        
        {/* --- Login View (Logo + Form) --- */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500 ease-in-out flex items-center justify-center",
            isLoginView
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-full pointer-events-none"
          )}
        >
          {/* A new container to stack the logo and form vertically */}
          <div className="flex flex-col items-center w-full">
            <HealingLogo className="h-20 w-auto mb-6" />
            <LoginForm onSwitch={toggleView} />
          </div>
        </div>

        {/* --- Signup View (Logo + Form) --- */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500 ease-in-out flex items-center justify-center",
            isLoginView
              ? "opacity-0 translate-x-full pointer-events-none"
              : "opacity-100 translate-x-0"
          )}
        >
          {/* A new container to stack the logo and form vertically */}
          <div className="flex flex-col items-center w-full">
            <HealingLogo className="h-20 w-auto mb-6" />
            <SignupForm onSwitch={toggleView} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <AuthPageInner />
      </div>
    </AuthProvider>
  );
}