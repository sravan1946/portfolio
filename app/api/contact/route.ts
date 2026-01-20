import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789'); // Valid format fallback for build


export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <contact@mail.p1ng.me>',
            to: ['sravan@p1ng.me'],
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            replyTo: email,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Internal server error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
