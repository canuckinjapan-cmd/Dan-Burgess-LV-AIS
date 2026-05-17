import { EventEmitter } from 'node:events';
import { Readable, Writable, Transform, PassThrough } from 'node:stream';
import { SMTPClient } from 'smtp-client';

export const onRequestPost: PagesFunction<{ 
  CONTACT_EMAIL: string, 
  SMTP_HOST: string, 
  SMTP_USER: string, 
  SMTP_PASS: string 
}> = async (context) => {
  try {
    const data = (await context.request.json()) as Record<string, string>;
    const { name, email, message } = data;

    // Setup SMTP Client for Gmail SSL (Port 465)
    const client = new SMTPClient({
      host: context.env.SMTP_HOST || 'smtp.gmail.com',
      port: 465,
    });

    await client.connect();
    await client.greet();
    await client.authPlain({
      user: context.env.SMTP_USER,
      pass: context.env.SMTP_PASS,
    });

    await client.mail({ from: context.env.SMTP_USER });
    await client.to(context.env.CONTACT_EMAIL);
    
    const emailData = [
      `Subject: Inquiry: ${name}`,
      `Reply-To: ${email}`,
      `From: ${context.env.SMTP_USER}`,
      `To: ${context.env.CONTACT_EMAIL}`,
      '',
      `Message from ${name}:`,
      `${message}`
    ].join('\r\n');

    await client.data(emailData);
    await client.quit();

    return new Response(JSON.stringify({ message: "Success" }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};