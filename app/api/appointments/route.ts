import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()
  if (!supabase) return NextResponse.json({ data: [], warning: "Supabase not configured" })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data, error } = await supabase
    .from("appointments")
    .select("id, service_id, date, time, created_at, services(title)")
    .eq("user_id", user.id)
    .order("date", { ascending: true })
    .order("time", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const mapped = (data || []).map((row: any) => ({
    id: row.id,
    service: row.services?.title ?? row.service_id,
    date: row.date,
    time: row.time,
    createdAt: row.created_at,
  }))
  return NextResponse.json({ data: mapped })
}

export async function POST(req: Request) {
  const supabase = await createClient()
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json().catch(() => null)
  const { serviceId, date, time, customerName, customerEmail } = body || {}
  if (!serviceId || !date || !time) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const { data: serviceData, error: serviceError } = await supabase
    .from("services")
    .select("title, duration_minutes, price_cents")
    .eq("id", serviceId)
    .single()

  if (serviceError) {
    console.error("[v0] Service lookup failed:", serviceError)
  }

  const { data, error } = await supabase
    .from("appointments")
    .insert({ user_id: user.id, service_id: serviceId, date, time })
    .select("id, created_at")
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (serviceData && (customerName || customerEmail)) {
    try {
      const emailData = {
        customerName: customerName || user.email?.split("@")[0] || "Valued Client",
        customerEmail: customerEmail || user.email || "",
        serviceName: serviceData.title,
        date,
        time,
        duration: `${serviceData.duration_minutes || 60} minutes`,
        price: serviceData.price_cents ? `$${(serviceData.price_cents / 100).toFixed(0)}` : "TBD",
        appointmentId: data.id,
      }

      // Send confirmation email (non-blocking)
      fetch(
        `${process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "http://localhost:3000"}/api/send-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "confirmation",
            appointmentData: emailData,
          }),
        },
      ).catch((err) => {
        console.error("[v0] Email sending failed:", err)
      })
    } catch (emailError) {
      console.error("[v0] Email preparation failed:", emailError)
    }
  }

  return NextResponse.json({ id: data.id, createdAt: data.created_at })
}
