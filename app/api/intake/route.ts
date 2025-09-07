import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function POST(req: Request) {
  // THE FIX: The cookies() function is asynchronous and MUST be awaited.
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: CookieOptions) => {
          try { cookieStore.set({ name, value, ...options }); } catch (error) {}
        },
        remove: (name: string, options: CookieOptions) => {
          try { cookieStore.set({ name, value: '', ...options }); } catch (error) {}
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { appointment_id, health_conditions, medications, session_goals } = body;

    const { data: intakeData, error: intakeError } = await supabase
      .from("intake_forms")
      .upsert({
        appointment_id,
        user_id: user.id,
        health_conditions,
        medications,
        session_goals,
      }, { onConflict: 'appointment_id' })
      .select()
      .single();

    if (intakeError) throw intakeError;

    const { error: appointmentError } = await supabase
      .from("appointments")
      .update({ intake_form_completed: true })
      .eq("id", appointment_id);

    if (appointmentError) {
      // Log this error but don't block the user, as the main submission was successful.
      console.error("Failed to update appointment status:", appointmentError);
    }

    return NextResponse.json({ success: true, data: intakeData });
  } catch (error: any) {
    console.error("Intake API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

