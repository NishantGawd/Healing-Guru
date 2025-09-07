import { NextResponse } from "next/server"

export async function GET() {
  const keyId = process.env.RAZORPAY_KEY_ID || ""
  if (!keyId) {
    return NextResponse.json(
      { error: "Razorpay key not configured" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    )
  }
  return NextResponse.json({ keyId }, { headers: { "Cache-Control": "no-store" } })
}
