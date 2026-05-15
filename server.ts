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
  const app = express();
  const PORT = 3000;

  // 1. Health check BEFORE any other middleware
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // 2. Logging and basic middleware
  app.use(cors());
  app.use(express.json());
  
  app.use((req, res, next) => {
    if (!req.url.includes("/api/health") && !req.url.includes("/@vite")) {
      console.log(`>>> [SERVER] ${req.method} ${req.url} - Origin: ${req.get('Origin') || 'none'}`);
    }
    next();
  });

  // 3. API routes
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message, type } = req.body;
      console.log(`>>> [API] Contact request from ${email}`);
      
      const contactEmail = process.env.CONTACT_EMAIL || "dan@danburgess.com";
      const host = process.env.SMTP_HOST || process.env.VITE_SMTP_HOST;
      const user = process.env.SMTP_USER || process.env.VITE_SMTP_USER;
      const pass = process.env.SMTP_PASS || process.env.VITE_SMTP_PASS;
      const port = parseInt(process.env.SMTP_PORT || process.env.VITE_SMTP_PORT || "587");

      if (host && user && pass) {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
          tls: { rejectUnauthorized: false }
        });

        await transporter.sendMail({
          from: `"Portfolio" <${user}>`,
          to: contactEmail,
          replyTo: email,
          subject: `${type || 'Inquiry'}: ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`
        });
        console.log(`>>> [API] Email sent successfully`);
      }
      
      res.status(200).json({ success: true, message: "Sent" });
    } catch (err) {
      console.error(">>> [API] Contact Error:", err);
      res.status(500).json({ success: false, message: "Error" });
    }
  });

  // 4. Vite/Static handling
  const isProd = process.env.NODE_ENV === "production";
  
  if (!isProd) {
    console.log(">>> [SERVER] MODE: Development (Using Vite)");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log(">>> [SERVER] MODE: Production (Serving Dist)");
    const distPath = path.join(process.cwd(), 'dist');
    
    app.use(express.static(distPath, { index: false }));

    app.get('*', (req, res, next) => {
      // Don't fallback for missing assets or api
      if (req.url.startsWith('/api/') || req.url.includes('.') || req.url.startsWith('/assets/')) {
        return next();
      }
      
      // Serve index.html with no-cache to ensure latest bundle is loaded
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.sendFile(path.join(distPath, 'index.html'));
    });

    app.use((req, res) => {
      res.status(404).send('Not Found');
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
