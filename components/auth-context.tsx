"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { type AuthChangeEvent, type Session } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

type User = { name: string; email: string; phone?: string }
type Appointment = {
  id: string
  userEmail: string
  service: string
  date: string
  time: string
  createdAt: string
}

type Ctx = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signUp: (fullName: string, email: string, password: string) => Promise<void>
  updateProfile: (updates: { name: string; phone?: string }) => Promise<void>;
  logout: () => Promise<void>
  updateUser: (updates: Partial<User>) => void
  appointments: Appointment[]
  addAppointment: (a: Omit<Appointment, "id" | "createdAt">) => void
  cancelAppointment: (id: string) => Promise<void>
  rescheduleAppointment: (id: string, newDate: string, newTime: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
  sendPasswordResetEmail: (email: string) => Promise<void>
}

const C = createContext<Ctx | undefined>(undefined)
const USER_KEY = "sp_user"
const APPT_KEY = "sp_appts"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const supabase = createClient()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const u = localStorage.getItem(USER_KEY)
    const a = localStorage.getItem(APPT_KEY)
    if (u) setUser(JSON.parse(u))
    if (a) setAppointments(JSON.parse(a))
  }, [])

  useEffect(() => {
    if (!supabase) return
    let mounted = true
      ; (async () => {
        const { data } = await supabase.auth.getUser()
        if (!mounted) return
        const sUser = data.user
        if (sUser) {
          const name = (sUser.user_metadata?.full_name as string) || (sUser.email?.split("@")[0] ?? "User")
          setUser({ name, email: sUser.email ?? "" })
          localStorage.setItem(USER_KEY, JSON.stringify({ name, email: sUser.email ?? "" }))
        }
      })()

    // FIX 2: APPLY TYPES TO THE CALLBACK PARAMETERS
    const { data: sub } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      if (!mounted) return
      if (session?.user) {
        const sUser = session.user
        const name = (sUser.user_metadata?.full_name as string) || (sUser.email?.split("@")[0] ?? "User")
        setUser({ name, email: sUser.email ?? "" })
        localStorage.setItem(USER_KEY, JSON.stringify({ name, email: sUser.email ?? "" }))
      } else {
        setUser(null)
        localStorage.removeItem(USER_KEY)
      }
    })
    return () => {
      mounted = false
      sub?.subscription.unsubscribe()
    }
  }, [supabase])

  useEffect(() => localStorage.setItem(APPT_KEY, JSON.stringify(appointments)), [appointments])

  // REFACTOR 1: SIMPLIFY THE LOGIN FUNCTION (IT ONLY LOGS IN NOW)
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error; // Throw error to be caught by the form
  }

  // REFACTOR 2: IMPLEMENT THE DEDICATED SIGNUP FUNCTION
  const signUp = async (fullName: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // This is how you pass the full_name to Supabase
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    if (error) throw error; // Throw error to be caught by the form
  };

  const logout = async () => {
    if (supabase) await supabase.auth.signOut()
    setUser(null)
    localStorage.removeItem(USER_KEY)
    toast({ title: "Logged out successfully!" })
    router.push("/")
    router.refresh()
  }

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      const merged = { ...(prev || { name: "", email: "" }), ...updates }
      localStorage.setItem(USER_KEY, JSON.stringify(merged))
      return merged
    })
  }

  const updateProfile = async (updates: { name: string; phone?: string }) => {
    if (!user || !supabase) throw new Error("User not authenticated");

    // 1. Get the current Supabase user
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) throw new Error("User not found");

    // 2. Update the public.profiles table
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: updates.name, phone: updates.phone })
      .eq("id", authUser.id);

    if (error) throw error;

    // 3. Update the local state to reflect the changes immediately
    updateUser({ name: updates.name, phone: updates.phone });
  }

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password: password });
    if (error) throw error;
  }

  const sendPasswordResetEmail = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    if (error) throw error;
  }

  const addAppointment = (a: Omit<Appointment, "id" | "createdAt">) => {
    const id = crypto.randomUUID()
    const createdAt = new Date().toISOString()
    setAppointments((prev) => [...prev, { ...a, id, createdAt }])
  }

  const cancelAppointment = async (id: string) => {
    if (!supabase) throw new Error("Supabase client not available");

    // Remove from the database
    const { error } = await supabase.from("appointments").delete().eq("id", id);
    if (error) throw error;

    // Remove from local state to update UI instantly
    setAppointments((prev) => prev.filter((x) => x.id !== id));
  };

  const rescheduleAppointment = async (id: string, newDate: string, newTime: string) => {
    if (!supabase) throw new Error("Supabase client not available");

    // Update the record in the database
    const { data, error } = await supabase
      .from("appointments")
      .update({ date: newDate, time: newTime })
      .eq("id", id)
      .select();

    if (error) throw error;

    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, date: newDate, time: newTime } : appt))
    );
  };

  // FIX 3: ADD `signUp` TO THE CONTEXT VALUE
  const value = useMemo(
    () => ({ user, login, signUp, logout, updateUser, updateProfile, updatePassword, sendPasswordResetEmail, appointments, addAppointment, cancelAppointment, rescheduleAppointment }),
    [user, appointments],
  )
  return <C.Provider value={value}>{children}</C.Provider>
}

export function useAuth() {
  const ctx = useContext(C)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}