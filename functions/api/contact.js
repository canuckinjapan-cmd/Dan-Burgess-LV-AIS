import { SMTPClient } from 'smtp-client';

export const onRequestPost = async (context) => {
  console.log("Contact API: Request received");

  try {
    const data = await context.request.json();
    const { name, email, message } = data;

    // Validate environment variables from Cloudflare dashboard
    if (!context.env.SMTP_PASS || !context.env.SMTP_USER) {
      throw new Error("Missing SMTP credentials in Cloudflare environment.");
    }

    const client = new SMTPClient({
      host: context.env.SMTP_HOST || 'smtp.gmail.com',
      port: 465,
      secure: true,
    });

    await client.connect();
    await client.greet();
    
    await client.authLogin({
      user: context.env.SMTP_USER,
      pass: context.env.SMTP_PASS, // Ensure this is the 16-character App Password
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

    return new Response(JSON.stringify({ message: "Success" }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Contact API Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};