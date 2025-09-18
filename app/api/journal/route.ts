import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  try {
    const { entry_text } = await req.json();
    if (!entry_text) {
      return NextResponse.json({ error: "Journal entry text is required." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("wellness_journals")
      .insert({ user_id: user.id, entry_text })
      .select()
      .single();
      
    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Journal API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
