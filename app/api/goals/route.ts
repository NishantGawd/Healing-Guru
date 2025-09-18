import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request: Request) {
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

  // Check for authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  // Get the goal title from the request body
  const { title } = await request.json();

  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "Goal title is required." }, { status: 400 });
  }

  try {
    // Insert the new goal into the database
    const { data, error } = await supabase
      .from("client_goals")
      .insert({
        user_id: user.id,
        title: title,
        progress: 0,       // Default progress to 0
        is_completed: false // Default to not completed
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data });

  } catch (error: any) {
    console.error("Add Goal API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}