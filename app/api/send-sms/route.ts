import { NextResponse } from "next/server";
import { CourierClient } from "@trycourier/courier";

const courier = new CourierClient({
    authorizationToken: process.env.COURIER_AUTH_TOKEN,
});

export async function POST(req: Request) {
    if (!process.env.COURIER_AUTH_TOKEN) {
        return NextResponse.json({ error: "Courier Auth Token not configured." }, { status: 500 });
    }

    try {
        const { to, templateId, data } = await req.json();

        if (!to || !templateId || !data) {
            return NextResponse.json({ error: "Missing 'to', 'templateId', or 'data' in request." }, { status: 400 });
        }

        const { requestId } = await courier.send({
            message: {
                to: {
                    phone_number: to,
                },
                template: templateId,
                data: data, // This is where you pass variables like { serviceName: "Reiki Healing" }
            },
        });

        return NextResponse.json({ success: true, requestId });
    } catch (error: any) {
        console.error("Courier API Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

