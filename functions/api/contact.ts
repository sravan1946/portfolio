export async function onRequestPost({ request, env }) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const resendApiKey = env.RESEND_API_KEY;
    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const emailHtml = `<!DOCTYPE html>
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
</html>`;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <contact@mail.p1ng.me>',
        to: ['sravan@p1ng.me'],
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: emailHtml,
        reply_to: email
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend error:', data);
      return new Response(JSON.stringify({ error: data.message || 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}