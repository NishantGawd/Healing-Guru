// Email service utility - can be extended with real email providers like Resend, SendGrid, etc.
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailTemplate {
  to: string
  subject: string
  html: string
  text: string
}

export interface AppointmentEmailData {
  customerName: string
  customerEmail: string
  serviceName: string
  date: string
  time: string
  duration: string
  price: string
  appointmentId?: string
}

export function createConfirmationEmail(data: AppointmentEmailData): EmailTemplate {
  const { customerName, serviceName, date, time, duration, price } = data

  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const subject = `Appointment Confirmed - ${serviceName} on ${formattedDate}`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Confirmation</title>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #4a4a4a; margin: 0; padding: 0; background-color: #faf8f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #8fbc8f; padding: 30px 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; }
        .content { padding: 30px 20px; }
        .appointment-card { background-color: #faf8f5; border: 1px solid #e5e1d8; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #e5e1d8; }
        .detail-label { font-weight: 600; color: #4a4a4a; }
        .detail-value { color: #6b6b6b; }
        .highlight { color: #c2a25f; font-weight: 600; }
        .footer { background-color: #4a5568; color: #ffffff; padding: 20px; text-align: center; font-size: 14px; }
        .preparation { background-color: #f0f9f0; border-left: 4px solid #8fbc8f; padding: 15px; margin: 20px 0; }
        .button { display: inline-block; background-color: #c2a25f; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌸 Healing Guru</h1>
          <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">Your appointment is confirmed</p>
        </div>
        
        <div class="content">
          <h2 style="color: #4a4a4a; margin-bottom: 20px;">Hello ${customerName},</h2>
          
          <p>Thank you for booking your healing session with me. I'm looking forward to supporting you on your wellness journey.</p>
          
          <div class="appointment-card">
            <h3 style="color: #8fbc8f; margin-top: 0;">Appointment Details</h3>
            <div class="detail-row">
              <span class="detail-label">Service:</span>
              <span class="detail-value highlight">${serviceName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${formattedDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time:</span>
              <span class="detail-value">${time}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Duration:</span>
              <span class="detail-value">${duration}</span>
            </div>
            <div class="detail-row" style="border-bottom: none;">
              <span class="detail-label">Investment:</span>
              <span class="detail-value highlight">${price}</span>
            </div>
          </div>
          
          <div class="preparation">
            <h4 style="color: #8fbc8f; margin-top: 0;">How to Prepare</h4>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Wear comfortable, loose-fitting clothing</li>
              <li>Avoid heavy meals 2 hours before your session</li>
              <li>Arrive 5-10 minutes early to settle in</li>
              <li>Come with an open heart and mind</li>
              <li>Bring any questions or intentions you'd like to share</li>
            </ul>
          </div>
          
          <p>If you need to reschedule or have any questions, please don't hesitate to reach out. I'm here to support you.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto: hello@jaipur-gems.com" style="display: inline-block; background-color: #c2a25f; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-family: 'Inter', Arial, sans-serif;">Contact Me</a>
          </div>
          
          <p style="color: #6b6b6b; font-size: 14px; margin-top: 30px;">
            <strong>Location:</strong> 123 Johari Bazar, Pink City, Jaipur, Rajasthan 302003<br>
            <strong>Phone:</strong> (+91) 987-654-3210<br>
            <strong>Email:</strong>  hello@jaipur-gems.com
          </p>
        </div>
        
        <div class="footer">
          <p style="margin: 0;">Healing Guru - Guiding you toward balance, clarity, and inner peace</p>
          <p style="margin: 5px 0 0 0; opacity: 0.8;">This email was sent because you booked an appointment with us.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
Appointment Confirmation - Healing Guru

Hello ${customerName},

Thank you for booking your healing session with me. I'm looking forward to supporting you on your wellness journey.

APPOINTMENT DETAILS:
Service: ${serviceName}
Date: ${formattedDate}
Time: ${time}
Duration: ${duration}
Investment: ${price}

HOW TO PREPARE:
- Wear comfortable, loose-fitting clothing
- Avoid heavy meals 2 hours before your session
- Arrive 5-10 minutes early to settle in
- Come with an open heart and mind
- Bring any questions or intentions you'd like to share

If you need to reschedule or have any questions, please don't hesitate to reach out.

Contact Information:
Location: 123 Serenity Lane, Wellness District
Phone: (555) 123-HEAL
Email: hello@healingguru.com

Healing Guru - Guiding you toward balance, clarity, and inner peace
  `

  return {
    to: data.customerEmail,
    subject,
    html,
    text,
  }
}

export function createReminderEmail(data: AppointmentEmailData): EmailTemplate {
  const { customerName, serviceName, date, time } = data

  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const subject = `Reminder: Your ${serviceName} session tomorrow at ${time}`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Reminder</title>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #4a4a4a; margin: 0; padding: 0; background-color: #faf8f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #8fbc8f; padding: 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
        .content { padding: 30px 20px; }
        .reminder-card { background-color: #f0f9f0; border: 1px solid #8fbc8f; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
        .highlight { color: #c2a25f; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌸 Healing Guru</h1>
          <p style="color: #ffffff; margin: 10px 0 0 0;">Appointment Reminder</p>
        </div>
        
        <div class="content">
          <h2>Hello ${customerName},</h2>
          
          <div class="reminder-card">
            <h3 style="color: #8fbc8f; margin-top: 0;">Your session is tomorrow!</h3>
            <p><strong>${serviceName}</strong></p>
            <p class="highlight">${formattedDate} at ${time}</p>
          </div>
          
          <p>I'm looking forward to our session together. Remember to wear comfortable clothing and arrive with an open heart.</p>
          
          <p>If you need to reschedule, please let me know as soon as possible.</p>
          
          <p>See you soon!</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
Appointment Reminder - Healing Guru

Hello ${customerName},

Your ${serviceName} session is tomorrow!

Date: ${formattedDate}
Time: ${time}

I'm looking forward to our session together. Remember to wear comfortable clothing and arrive with an open heart.

If you need to reschedule, please let me know as soon as possible.

See you soon!

Healing Guru
  `



  return {
    to: data.customerEmail,
    subject,
    html,
    text,
  }
}


export async function sendEmail(template: EmailTemplate): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Healing Guru <onboarding@resend.dev>',
      to: [template.to],
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: error.message };
    }

    console.log("Email sent successfully:", data);
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}