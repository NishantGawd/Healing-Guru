import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  // THE FIX: Correctly `await` the cookieStore
  const cookieStore = cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => {
          return cookieStore.get(name)?.value;
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
    const { appointment_id, rating, comments } = body;

    // 1. Insert feedback data
    const { data: feedbackData, error: feedbackError } = await supabase
      .from("feedback")
      .insert({
        appointment_id,
        user_id: user.id,
        rating,
        comments,
      })
      .select()
      .single();

    if (feedbackError) throw feedbackError;

    // 2. Update the appointment to mark feedback as submitted
    const { error: appointmentError } = await supabase
      .from("appointments")
      .update({ feedback_submitted: true })
      .eq("id", appointment_id);

    if (appointmentError) throw appointmentError;

    return NextResponse.json({ success: true, data: feedbackData });
  } catch (error: any) {
    console.error("Feedback API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

