// @ts-ignore - Required for nodejs_compat
import nodemailer from 'nodemailer';

export const onRequestPost: PagesFunction<{ 
  CONTACT_EMAIL: string, 
  SMTP_HOST: string, 
  SMTP_USER: string, 
  SMTP_PASS: string 
}> = async (context) => {
  try {
    const data = (await context.request.json()) as Record<string, string>;
    const { name, email, company, budget, message } = data;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Create the transporter using your Cloudflare Secrets
    const transporter = nodemailer.createTransport({
      host: context.env.SMTP_HOST, // smtp.gmail.com
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: context.env.SMTP_USER, // Your Gmail address
        pass: context.env.SMTP_PASS, // Your 16-digit App Password
      },
    });

    const mailOptions = {
      from: `"Web Form" <${context.env.SMTP_USER}>`, 
      to: context.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nBudget: ${budget || "N/A"}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Inquiry sent successfully" }), {
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