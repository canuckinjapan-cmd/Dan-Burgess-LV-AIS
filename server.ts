import express from "express";
import path from "path";
import cors from "cors";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // CORS configuration
  app.use(cors({
    origin: ["https://danburgess.com", "https://www.danburgess.com", /^https:\/\/ais-.*\.run\.app$/],
    credentials: true
  }));

  app.use(express.json());

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, message, company, budget, phone, type } = req.body;

    console.log("-----------------------------------------");
    console.log("New Contact Form Submission:");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone || "N/A"}`);
    console.log(`Type: ${type || "N/A"}`);
    console.log(`Company: ${company || "N/A"}`);
    console.log(`Budget: ${budget || "N/A"}`);
    console.log(`Message: ${message}`);
    console.log("-----------------------------------------");

    const contactEmail = process.env.CONTACT_EMAIL || "dan@danburgess.com";
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(smtpPort || "587"),
          secure: smtpPort === "465",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const info = await transporter.sendMail({
          from: `"Web Form" <${smtpUser}>`,
          to: contactEmail,
          replyTo: email,
          subject: `Inquiry from Dan Burgess Design (${type || "General"})`,
          text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Type: ${type || "N/A"}
Company: ${company || "N/A"}
Budget: ${budget || "N/A"}

Message:
${message}
          `,
        });

        console.log("Email sent: %s", info.messageId);
        
        return res.status(200).json({ 
          success: true, 
          message: "Thank you for your message. Your inquiry has been sent successfully." 
        });
      } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ 
          success: false, 
          message: "Failed to send email. Please try again later or contact us directly." 
        });
      }
    } else {
      console.warn("SMTP credentials not configured. Email NOT sent.");
      // Return a 200 with a warning message in development, or just mock success
      return res.status(200).json({ 
        success: true, 
        message: "Submission logged (Mock Success). Configure SMTP credentials to receive real emails." 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
