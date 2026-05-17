import { EventEmitter } from 'node:events';
import { Readable, Writable, Transform, PassThrough } from 'node:stream';
import { SMTPClient } from 'smtp-client';

export const onRequestPost = async (context) => {
  // 1. Log entry for Cloudflare Real-time Logs
  console.log("Contact API: Request received");

  try {
    const data = await context.request.json();
    const { name, email, message } = data;

    // 2. Validate environment variables are present
    if (!context.env.SMTP_PASS || !context.env.SMTP_USER) {
      throw new Error("Missing SMTP credentials in Cloudflare environment.");
    }

    // 3. Setup SMTP Client for Port 465 (SSL)
    const client = new SMTPClient({
      host: context.env.SMTP_HOST || 'smtp.gmail.com',
      port: 465,
      secure: true, // Explicitly enable SSL for port 465
    });

    console.log("Contact API: Connecting to SMTP...");
    await client.connect();
    await client.greet();
    
    // 4. Authenticate using Login (often more compatible with App Passwords)
    await client.authLogin({
      user: context.env.SMTP_USER,
      pass: context.env.SMTP_PASS,
    });

    await client.mail({ from: context.env.SMTP_USER });
    await client.to(context.env.CONTACT_EMAIL);
    
    const emailData = [
      `Subject: New Inquiry from ${name}`,
      `Reply-To: ${email}`,
      `From: ${context.env.SMTP_USER}`,
      `To: ${context.env.CONTACT_EMAIL}`,
      'Content-Type: text/plain; charset=utf-8',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      `Message:`,
      `${message}`
    ].join('\r\n');

    await client.data(emailData);
    await client.quit();

    console.log("Contact API: Email sent successfully");
    return new Response(JSON.stringify({ message: "Success" }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    // 5. Log the actual error to the Cloudflare Functions log stream
    console.error("Contact API Error:", error.message);
    
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};