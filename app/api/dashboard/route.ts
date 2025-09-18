import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  try {
    // ✅ Fetch profile info (full_name + phone)
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("full_name, phone, email")
      .eq("id", user.id)
      .single();

    if (profileError) throw profileError;

    // Fetch all other data in parallel
    const [appointmentsRes, journalsRes, goalsRes] = await Promise.all([
      supabase
        .from("appointments")
        .select(`
          id,
          date,
          time,
          service:services(title),
          session_notes(note_text)
        `)
        .eq("user_id", user.id)
        .order("date", { ascending: false }),

      supabase
        .from("wellness_journals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5),

      supabase
        .from("client_goals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true }),
    ]);

    if (appointmentsRes.error) throw appointmentsRes.error;
    if (journalsRes.error) throw journalsRes.error;
    if (goalsRes.error) throw goalsRes.error;

    const data = {
      appointments: appointmentsRes.data,
      journals: journalsRes.data,
      goals: goalsRes.data,
      userName: profile?.full_name || user.email,
      profile, // pass full profile to frontend
    };

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("Dashboard API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
