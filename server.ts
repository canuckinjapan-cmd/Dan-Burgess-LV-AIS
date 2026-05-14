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

  // Global request logging
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Origin: ${req.get('origin') || 'none'}`);
    next();
  });

  // Simplified CORS - allow everything for debugging NetworkErrors
  app.use(cors({
    origin: (origin, callback) => {
      // Echo the origin if it exists, otherwise allow
      callback(null, origin || true);
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

  app.use(express.json());

  // API routes
  app.get("/api/health", async (req, res) => {
    let smtpStatus = "Not Configured";
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_PORT === "465",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
        await transporter.verify();
        smtpStatus = "Connected";
      } catch (e: any) {
        smtpStatus = `Error: ${e.message}`;
      }
    }

    res.json({ 
      status: "ok", 
      time: new Date().toISOString(),
      smtpStatus
    });
  });

  app.post("/api/contact", async (req, res) => {
    const { name, email, message, company, budget, phone, type } = req.body;

    console.log("-----------------------------------------");
    console.log("New Contact Form Submission:", new Date().toISOString());
    console.log(`Origin: ${req.get('origin')}`);
    console.log(`Data:`, JSON.stringify(req.body));
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
          // Add timeout to prevent hanging
          connectionTimeout: 10000,
          greetingTimeout: 10000,
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

        console.log("Email sent successfully: %s", info.messageId);
        
        return res.status(200).json({ 
          success: true, 
          message: "Thank you for your message. Your inquiry has been sent successfully." 
        });
      } catch (error) {
        console.error("Error in contact form handler:", error);
        return res.status(500).json({ 
          success: false, 
          message: `Server Error: ${error.message}` 
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
