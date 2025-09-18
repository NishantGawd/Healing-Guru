import { NextResponse } from "next/server";
// 1. Import the admin client from Supabase
import { createClient } from '@supabase/supabase-js';
import { startOfMonth, endOfMonth, format } from 'date-fns';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get('month');

  if (!month) {
    return NextResponse.json({ error: "Month parameter is required." }, { status: 400 });
  }

  // 2. Create the secure admin client using the new environment variables
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const targetDate = new Date(`${month}-01T00:00:00`);
    const startDate = format(startOfMonth(targetDate), 'yyyy-MM-dd');
    const endDate = format(endOfMonth(targetDate), 'yyyy-MM-dd');

    // 3. Fetch data using the admin client. This is more reliable on the server.
    const { data: appointments, error } = await supabaseAdmin
      .from("appointments")
      .select("date, time")
      .gte("date", startDate)
      .lte("date", endDate);

    if (error) throw error;

    // The rest of the logic remains the same
    const bookingsByDate: { [key: string]: number } = {};
    const bookingsByTimeSlot: { [key: string]: boolean } = {};

    appointments.forEach(appt => {
        bookingsByDate[appt.date] = (bookingsByDate[appt.date] || 0) + 1;
        const timeSlotKey = `${appt.date}_${appt.time}`;
        bookingsByTimeSlot[timeSlotKey] = true;
    });

    return NextResponse.json({ bookingsByDate, bookingsByTimeSlot });

  } catch (error: any) {
    console.error("Availability API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

