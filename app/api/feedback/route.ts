import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function POST(req: Request) {
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
          try { cookieStore.set({ name, value: "", ...options }); } catch (error) {}
        },
      },
    }
  );

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const { appointment_id, rating, comments } = body;

    // THE FIX: Use `upsert` to prevent "duplicate key" errors.
    // This will update existing feedback or insert a new one.
    const { data: feedbackData, error: feedbackError } = await supabase
      .from("feedback")
      .upsert({
        appointment_id,
        user_id: user.id,
        rating,
        comments,
      }, { onConflict: 'appointment_id' }) // Check for conflicts on the appointment_id
      .select()
      .single();

    if (feedbackError) throw feedbackError;

    // Update the appointment to mark that feedback has been submitted.
    const { error: appointmentError } = await supabase
      .from("appointments")
      .update({ feedback_submitted: true })
      .eq("id", appointment_id);

    if (appointmentError) {
      // Log this error but don't fail the request, as the feedback was saved.
      console.error("Failed to update appointment after feedback:", appointmentError);
    }

    return NextResponse.json({ success: true, data: feedbackData });
  } catch (error: any) {
    console.error("Feedback API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

