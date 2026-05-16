
export const onRequestPost: PagesFunction<{ CONTACT_EMAIL: string }> = async (context) => {
  try {
    const data = (await context.request.json()) as Record<string, string>;
    const { name, email, company, budget, message } = data;

    // Validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const contactEmail = context.env.CONTACT_EMAIL || "canuck.in.japan@gmail.com";

    // Format the email content
    const emailBody = `
Name: ${name}
Email: ${email}
Company: ${company || "N/A"}
Budget: ${budget || "N/A"}

Message:
${message}
    `;

    // Send using MailChannels (Cloudflare's integrated email service)
    // Note: MailChannels is free to use from Cloudflare Workers/Pages
    const mailRequest = new Request("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: contactEmail, name: "Dan Burgess" }],
          },
        ],
        from: {
          email: "noreply@danburgess.com",
          name: "Web Form",
        },
        reply_to: {
          email: email,
          name: name,
        },
        subject: "Inquiry from Dan Burgess Design contact form",
        content: [
          {
            type: "text/plain",
            value: emailBody,
          },
        ],
      }),
    });

    const response = await fetch(mailRequest);
    const responseText = await response.text();

    if (response.ok) {
      return new Response(JSON.stringify({ message: "Inquiry received successfully" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: responseText }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(
      JSON.stringify({ error: "Internal server error", details: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
