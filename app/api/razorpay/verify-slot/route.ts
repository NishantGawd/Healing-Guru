import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { date, time } = await request.json();

  if (!date || !time) {
    return NextResponse.json({ error: "Date and time are required." }, { status: 400 });
  }

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

  try {
    const { data, error } = await supabase.rpc('is_slot_available', {
      p_date: date,
      p_time: time
    });

    if (error) {
        console.error("Error calling is_slot_available function:", error);
        throw new Error("Could not verify slot availability.");
    }
    
    if (data === false) {
        return NextResponse.json({ isAvailable: false, error: "This time slot has just been booked. Please select another." }, { status: 409 }); // 409 Conflict
    }

    return NextResponse.json({ isAvailable: true });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
