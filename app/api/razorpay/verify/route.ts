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
    } = await req.json();

    if (
      !process.env.RAZORPAY_KEY_SECRET ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Signature mismatch" }, { status: 400 });
    }

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
            } catch {}
          },
          remove: (name: string, options: CookieOptions) => {
            try {
              cookieStore.set({ name, value: "", ...options });
            } catch {}
          },
        },
      }
    );

    const correctedDate = format(parseISO(booking.date), "yyyy-MM-dd");

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const payload = {
      user_id: user.id,
      service_id: booking?.serviceId ?? null,
      date: correctedDate,
      time: booking?.time ?? null,
      payment_id: razorpay_payment_id,
      payment_status: "paid",
      user_email: booking.user_email,
      user_name: booking.user_name,
    };

    const { error: insertError } = await supabase.from("appointments").insert(payload);
    if (insertError) {
      console.error("Supabase Insert Error:", insertError.message);
      return NextResponse.json(
        { ok: true, warning: "Payment verified, but failed to store appointment.", details: insertError.message },
        { status: 200 }
      );
    }

    return NextResponse.json({ ok: true, message: "Appointment booked successfully!" });
  } catch (e: any) {
    console.error("Verify Endpoint Error:", e.message);
    return NextResponse.json({ error: e?.message || "Unexpected error" }, { status: 500 });
  }
}
