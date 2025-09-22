"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { type AuthChangeEvent, type Session } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

type User = { id: string; name: string; email: string; phone?: string }
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
  signInWithGoogle: () => Promise<void>
  updateProfile: (updates: { name: string; phone?: string }) => Promise<void>
  logout: () => Promise<void>
  updateUser: (updates: Partial<User>) => void
  appointments: Appointment[]
  addAppointment: (a: Omit<Appointment, "id" | "createdAt">) => void
  cancelAppointment: (id: string) => Promise<void>
  rescheduleAppointment: (id: string, newDate: string, newTime: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
  sendPasswordResetEmail: (email: string) => Promise<void>
  isSoundPlaying: boolean
  toggleSound: () => void
}

const C = createContext<Ctx | undefined>(undefined)
const USER_KEY = "sp_user"
const APPT_KEY = "sp_appts"
const SOUND_KEY = "isSoundPlaying"

// 🔑 Global audio instance (shared across all pages)
let globalAudio: HTMLAudioElement | null = null

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isSoundPlaying, setIsSoundPlaying] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const { toast } = useToast()

  // Initialize global audio once
  useEffect(() => {
    if (typeof window !== "undefined" && !globalAudio) {
      globalAudio = new Audio("/sounds/ambient-chimes.mp3")
      globalAudio.loop = true
      globalAudio.volume = 0.5
    }
  }, [])

  // Load persisted sound state on mount
  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = localStorage.getItem(SOUND_KEY)
    if (saved === "true") {
      setIsSoundPlaying(true)
      globalAudio?.play().catch((e) => console.error("Audio play failed:", e))
    }
  }, [])

  // Persist sound state whenever it changes
  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem(SOUND_KEY, String(isSoundPlaying))
  }, [isSoundPlaying])

  // Auth + appointments handling
  useEffect(() => {
    const u = localStorage.getItem(USER_KEY)
    const a = localStorage.getItem(APPT_KEY)
    if (u) setUser(JSON.parse(u))
    if (a) setAppointments(JSON.parse(a))
  }, [])

  useEffect(() => {
    if (!supabase) return
    let mounted = true
    ;(async () => {
      const { data } = await supabase.auth.getUser()
      if (!mounted) return
      const sUser = data.user
      if (sUser) {
        const name = (sUser.user_metadata?.full_name as string) || (sUser.email?.split("@")[0] ?? "User")
        const userPayload = { id: sUser.id, name, email: sUser.email ?? "" }
        setUser(userPayload)
        localStorage.setItem(USER_KEY, JSON.stringify(userPayload))
      }
    })()

    const { data: sub } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      if (!mounted) return
      if (session?.user) {
        const sUser = session.user
        const name = (sUser.user_metadata?.full_name as string) || (sUser.email?.split("@")[0] ?? "User")
        const userPayload = { id: sUser.id, name, email: sUser.email ?? "" }
        setUser(userPayload)
        localStorage.setItem(USER_KEY, JSON.stringify(userPayload))
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

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signUp = async (fullName: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })
    if (error) throw error
  }

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) throw error
  }

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
      const merged = { ...(prev || { id: "", name: "", email: "" }), ...updates }
      localStorage.setItem(USER_KEY, JSON.stringify(merged))
      return merged
    })
  }

  const updateProfile = async (updates: { name: string; phone?: string }) => {
    if (!user || !supabase) throw new Error("User not authenticated")
    const { data: { user: authUser } } = await supabase.auth.getUser()
    if (!authUser) throw new Error("User not found")
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: updates.name, phone: updates.phone })
      .eq("id", authUser.id)
    if (error) throw error
    updateUser({ name: updates.name, phone: updates.phone })
  }

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) throw error
  }

  const sendPasswordResetEmail = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    })
    if (error) throw error
  }

  const addAppointment = (a: Omit<Appointment, "id" | "createdAt">) => {
    const id = crypto.randomUUID()
    const createdAt = new Date().toISOString()
    setAppointments((prev) => [...prev, { ...a, id, createdAt }])
  }

  const cancelAppointment = async (id: string) => {
    if (!supabase) throw new Error("Supabase client not available")
    const { error } = await supabase.from("appointments").delete().eq("id", id)
    if (error) throw error
    setAppointments((prev) => prev.filter((x) => x.id !== id))
  }

  const rescheduleAppointment = async (id: string, newDate: string, newTime: string) => {
    if (!supabase) throw new Error("Supabase client not available")
    const { data, error } = await supabase
      .from("appointments")
      .update({ date: newDate, time: newTime })
      .eq("id", id)
      .select()
    if (error) throw error
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, date: newDate, time: newTime } : appt))
    )
  }

  // 🔊 Sound toggle uses global audio
  const toggleSound = useCallback(() => {
  if (!globalAudio) return
  setIsSoundPlaying((prev) => {
    const shouldPlay = !prev
    if (shouldPlay) {
      globalAudio!.play().catch((e) => console.error("Audio play failed:", e))
    } else {
      globalAudio!.pause()
    }
    return shouldPlay
  })
}, [])

  const value = useMemo(
    () => ({
      user,
      login,
      signUp,
      signInWithGoogle,
      logout,
      updateUser,
      updateProfile,
      updatePassword,
      sendPasswordResetEmail,
      appointments,
      addAppointment,
      cancelAppointment,
      rescheduleAppointment,
      isSoundPlaying,
      toggleSound,
    }),
    [user, appointments, isSoundPlaying, toggleSound]
  )

  return <C.Provider value={value}>{children}</C.Provider>
}

export function useAppContext() {
  const ctx = useContext(C)
  if (!ctx) throw new Error("useAppContext must be used within SiteProvider")
  return ctx
}
