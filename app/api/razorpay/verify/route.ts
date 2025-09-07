import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { format, parseISO } from "date-fns";

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      booking,
      intakeData,
    } = await req.json();

    if (!process.env.RAZORPAY_KEY_SECRET) throw new Error("Razorpay secret not configured");
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
    if (expectedSignature !== razorpay_signature) return NextResponse.json({ error: "Signature mismatch" }, { status: 400 });

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name: string) => cookieStore.get(name)?.value,
          set: (name: string, value: string, options: CookieOptions) => {
            try {
              cookieStore.set({ name, value, ...options });
            } catch { }
          },
          remove: (name: string, options: CookieOptions) => {
            try {
              cookieStore.set({ name, value: "", ...options });
            } catch { }
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "User not authenticated" }, { status: 401 });

    const correctedDate = format(parseISO(booking.date), "yyyy-MM-dd");

    const { data: appointmentData, error: appointmentError } = await supabase
      .from("appointments")
      .insert({
        user_id: user.id,
        service_id: booking.serviceId,
        date: correctedDate,
        time: booking.time,
        payment_id: razorpay_payment_id,
        payment_status: "paid",
        user_email: booking.user_email,
        user_name: booking.user_name,
      })
      .select('id')
      .single();

    if (appointmentError) throw appointmentError;
    if (!appointmentData) throw new Error("Failed to create appointment and retrieve its ID.");

    if (intakeData) {
      const { error: intakeError } = await supabase.from("intake_forms").insert({
        appointment_id: appointmentData.id,
        user_id: user.id,
        health_conditions: intakeData.health_conditions,
        medications: intakeData.medications,
        session_goals: intakeData.session_goals,
      });
      if (intakeError) {
        console.error("Critical Error: Payment was successful but intake form failed to save.", intakeError);
      }
    }

    return NextResponse.json({ ok: true, message: "Appointment booked successfully!" });
  } catch (error: any) {
    console.error("Verify Endpoint Error:", error.message);
    return NextResponse.json({ error: "Verification failed.", details: error.message }, { status: 500 });
  }
}

