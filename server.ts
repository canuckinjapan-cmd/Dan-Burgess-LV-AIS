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

  // Initial Middleware
  app.use(cors());
  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message, type } = req.body;
      console.log(`[API] Inquiry from ${name} (${email}) - ${type}`);
      
      const contactEmail = process.env.CONTACT_EMAIL || "dan@danburgess.com";
      const SMTP_HOST = process.env.SMTP_HOST || process.env.VITE_SMTP_HOST;
      const SMTP_USER = process.env.SMTP_USER || process.env.VITE_SMTP_USER;
      const SMTP_PASS = process.env.SMTP_PASS || process.env.VITE_SMTP_PASS;
      const SMTP_PORT = process.env.SMTP_PORT || process.env.VITE_SMTP_PORT;

      if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
        const port = parseInt(SMTP_PORT || "587");
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port,
          secure: port === 465,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
          tls: { rejectUnauthorized: false }
        });

        await transporter.sendMail({
          from: `"Portfolio" <${SMTP_USER}>`,
          to: contactEmail,
          replyTo: email,
          subject: `Contact: ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`
        });
      }
      
      res.status(200).json({ success: true, message: "Sent" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    console.log(">>> [SERVER] Mode: Development");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log(">>> [SERVER] Mode: Production");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
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
