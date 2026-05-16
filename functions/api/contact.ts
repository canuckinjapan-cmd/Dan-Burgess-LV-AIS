import { SMTPClient } from 'smtp-client';

export const onRequestPost: PagesFunction<{ 
  CONTACT_EMAIL: string, 
  SMTP_HOST: string, 
  SMTP_USER: string, 
  SMTP_PASS: string 
}> = async (context) => {
  try {
    const data = (await context.request.json()) as Record<string, string>;
    const { name, email, company, budget, message } = data;

    // 1. Validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // 2. Setup SMTP Client (Gmail uses 465 for SSL)
    const client = new SMTPClient({
      host: context.env.SMTP_HOST || 'smtp.gmail.com',
      port: 465,
    });

    await client.connect();
    await client.greet();
    
    // 3. Authenticate with App Password
    await client.authPlain({
      user: context.env.SMTP_USER,
      pass: context.env.SMTP_PASS,
    });

    // 4. Send Mail
    await client.mail({ from: context.env.SMTP_USER });
    await client.to(context.env.CONTACT_EMAIL);
    
    const emailData = [
      `Subject: Inquiry: ${name}`,
      `Reply-To: ${email}`,
      `From: ${context.env.SMTP_USER}`,
      `To: ${context.env.CONTACT_EMAIL}`,
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || 'N/A'}`,
      `Budget: ${budget || 'N/A'}`,
      '',
      `Message:`,
      `${message}`
    ].join('\r\n');

    await client.data(emailData);
    await client.quit();

    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "SMTP Error", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};