import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, createConfirmationEmail, createReminderEmail, type AppointmentEmailData } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, appointmentData } = body

    if (!type || !appointmentData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let emailTemplate
    switch (type) {
      case "confirmation":
        emailTemplate = createConfirmationEmail(appointmentData as AppointmentEmailData)
        break
      case "reminder":
        emailTemplate = createReminderEmail(appointmentData as AppointmentEmailData)
        break
      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 })
    }

    const result = await sendEmail(emailTemplate)

    if (result.success) {
      return NextResponse.json({ success: true, message: "Email sent successfully" })
    } else {
      return NextResponse.json({ error: result.error || "Failed to send email" }, { status: 500 })
    }
  } catch (error) {
    console.error("[v0] Send email API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
