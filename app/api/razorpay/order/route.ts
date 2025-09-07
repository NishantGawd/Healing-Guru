import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = "INR", receipt, notes } = body || {};

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Razorpay keys not configured" }, { status: 500 });
    }
    if (!amount || amount < 100) {
      return NextResponse.json({ error: "Amount must be >= 100 paise" }, { status: 400 });
    }

    const auth = Buffer.from(
      `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
    ).toString("base64");

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
        notes: notes || {},
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data?.error || data }, { status: 400 });
    }
    return NextResponse.json({ order: data });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Order error" }, { status: 500 });
  }
}
