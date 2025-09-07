import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioWhatsAppNumber = 'whatsapp:+14155238886'; 

const client = twilio(accountSid, authToken);

// --- HELPER FUNCTION TO FORMAT THE PHONE NUMBER ---
function formatPhoneNumber(phoneNumber: string): string {
  // Remove any non-digit characters
  let digitsOnly = phoneNumber.replace(/\D/g, '');

  // If the number starts with '91' and is 12 digits, it's likely a valid Indian number with country code.
  if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    return `+${digitsOnly}`;
  }
  
  // If the number is 10 digits long (a typical Indian mobile number), add the '+91' prefix.
  if (digitsOnly.length === 10) {
    return `+91${digitsOnly}`;
  }

  // If the number already starts with a '+', assume it's correctly formatted.
  if (phoneNumber.startsWith('+')) {
    return phoneNumber;
  }
  
  // As a fallback for other cases, prepend '+91'. Adjust if you expect other countries.
  return `+91${digitsOnly}`;
}


export async function POST(request: Request) {
  try {
    const { to, serviceName, date, time } = await request.json();

    if (!to || !serviceName || !date || !time) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // --- USE THE FORMATTING FUNCTION ---
    const formattedPhoneNumber = formatPhoneNumber(to);
    const recipientWhatsAppNumber = `whatsapp:${formattedPhoneNumber}`;

    const messageBody = 
`*Booking Confirmation - Healing Guru* 🌸

Hello! Your appointment is confirmed.

*Service:* ${serviceName}
*Date:* ${date}
*Time:* ${time}

Thank you for booking with us. If you need to reschedule, please visit our website.`;

    await client.messages.create({
      body: messageBody,
      from: twilioWhatsAppNumber,
      to: recipientWhatsAppNumber,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Twilio API Error:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}