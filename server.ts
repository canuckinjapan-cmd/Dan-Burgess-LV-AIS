import express from "express";
import path from "path";
import cors from "cors";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(">>> [SERVER] Starting initialization...");

async function startServer() {
  console.log(">>> [SERVER] Initializing Express app...");
  const app = express();
  const PORT = 3000;

  // Global request logging
  app.use((req, res, next) => {
    if (req.url !== "/api/health") {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Origin: ${req.get('origin') || 'none'}`);
    }
    next();
  });

  app.use(cors({
    origin: true, // Allow all origins explicitly via reflected header
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
    optionsSuccessStatus: 204
  }));

  app.use(express.json());

  // API health check
  app.get("/api/health", async (req, res) => {
    const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
    const smtpStatus = (SMTP_HOST && SMTP_USER && SMTP_PASS) ? "Connected" : "Not Configured";
    
    res.json({ 
      status: "ok", 
      time: new Date().toISOString(),
      smtpStatus: smtpStatus,
      env: process.env.NODE_ENV || "development"
    });
  });

  app.post("/api/contact", async (req, res) => {
    console.log(">>> [API] Received /api/contact POST request");
    const { name, email, message, company, budget, phone, type } = req.body;

    console.log(">>> [API] Payload:", JSON.stringify({ name, email, type, company }));
    console.log(">>> [API] Origin:", req.get('origin') || 'none');

    const contactEmail = process.env.CONTACT_EMAIL || "dan@danburgess.com";
    const SMTP_HOST = process.env.SMTP_HOST || process.env.VITE_SMTP_HOST;
    const SMTP_USER = process.env.SMTP_USER || process.env.VITE_SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS || process.env.VITE_SMTP_PASS;
    const SMTP_PORT = process.env.SMTP_PORT || process.env.VITE_SMTP_PORT;

    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      console.log(">>> [API] Attempting to send email via SMTP:", SMTP_HOST);
      try {
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: parseInt(SMTP_PORT || "587"),
          secure: SMTP_PORT === "465", // Only 465 is secure by default (SSL), 587 uses STARTTLS
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
          connectionTimeout: 15000,
          greetingTimeout: 15000,
          // TLS configuration to handle different providers
          tls: {
            rejectUnauthorized: false
          }
        });

        console.log(">>> [API] Verifying SMTP connection...");
        await transporter.verify();
        console.log(">>> [API] SMTP Verified.");

        // Defensive 'from' address check
        const fromEmail = (SMTP_USER && SMTP_USER.includes("@")) ? SMTP_USER : contactEmail;
        console.log(">>> [API] Sending mail to:", contactEmail, "from:", fromEmail);
        
        const info = await transporter.sendMail({
          from: `"Dan Burgess Design" <${fromEmail}>`,
          to: contactEmail,
          replyTo: email,
          subject: `New Inquiry: ${type || "General"} - from ${name}`,
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
      } catch (error: any) {
        console.error(">>> [API] SMTP ERROR:", error);
        
        return res.status(500).json({ 
          success: false, 
          message: `Server Error: ${error.message || "Unknown SMTP Error"}. Please check your SMTP settings (Host, Port, User, Pass) in Secrets.` 
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
    console.log(">>> [SERVER] Initializing Vite middleware (Development)...");
    try {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
      console.log(">>> [SERVER] Vite middleware attached.");
    } catch (err) {
      console.error(">>> [SERVER] Failed to initialize Vite server:", err);
    }
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`>>> [SERVER] SUCCESS: Server running on http://0.0.0.0:${PORT}`);
    console.log(`>>> [SERVER] Mode: ${process.env.NODE_ENV || "development"}`);
  });
}

console.log(">>> [SERVER] Calling startServer()...");
startServer().catch((err) => {
  console.error(">>> [SERVER] CRITICAL FAILURE during startServer():", err);
});
