"use client";

import { useState } from "react";
import { AuthProvider } from "@/components/auth-context";
import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

function AuthPageInner() {
  const [isLoginView, setIsLoginView] = useState(true);
  const toggleView = () => setIsLoginView((prev) => !prev);

  return (
    // THIS IS THE KEY FIX:
    // The `flex-grow` class tells this element to expand vertically.
    // `justify-center` is added to center the form container within it.
    <main className="flex flex-grow items-center justify-center p-4">
      <div className="relative w-full max-w-md h-[450px] overflow-hidden">
        {/* Login Form Container */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500 ease-in-out",
            isLoginView
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-full"
          )}
        >
          <LoginForm onSwitch={toggleView} />
        </div>

        {/* Signup Form Container */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500 ease-in-out",
            isLoginView
              ? "opacity-0 translate-x-full"
              : "opacity-100 translate-x-0"
          )}
        >
          <SignupForm onSwitch={toggleView} />
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <AuthPageInner />
        <SiteFooter />
      </div>
    </AuthProvider>
  );
}