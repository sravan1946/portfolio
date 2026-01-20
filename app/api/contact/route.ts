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
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; }
                        .card { background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                        .header { margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #e5e7eb; }
                        .h2 { color: #111827; font-size: 20px; font-weight: 600; margin: 0; }
                        .field { margin-bottom: 16px; }
                        .label { font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600; margin-bottom: 4px; display: block; }
                        .value { font-size: 16px; color: #111827; }
                        .message-box { background-color: #f3f4f6; padding: 16px; border-radius: 6px; margin-top: 24px; white-space: pre-wrap; }
                        .footer { margin-top: 24px; text-align: center; font-size: 12px; color: #9ca3af; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="card">
                            <div class="header">
                                <h2 class="h2">New Contact Submission</h2>
                            </div>
                            
                            <div class="field">
                                <span class="label">From</span>
                                <div class="value">${name}</div>
                            </div>
                            
                            <div class="field">
                                <span class="label">Email</span>
                                <div class="value"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></div>
                            </div>
                            
                            <div class="field">
                                <span class="label">Message</span>
                                <div class="value message-box">${message}</div>
                            </div>
                            
                            <div class="footer">
                                Sent from Portfolio Contact Form
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `,
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
