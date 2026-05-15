import express from "express";
import path from "path";
import cors from "cors";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Basic Middlewares
  app.use(cors());
  app.use(express.json());

  // Logging
  app.use((req, res, next) => {
    if (!req.url.includes("/api/health") && !req.url.includes("/@vite")) {
      console.log(`>>> [SERVER] ${req.method} ${req.url}`);
    }
    next();
  });

  // 2. API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", version: "1.4.0", mode: process.env.NODE_ENV });
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message, type } = req.body;
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
      }
      res.status(200).json({ success: true });
    } catch (err) {
      console.error(">>> [API] Error:", err);
      res.status(500).json({ success: false });
    }
  });

  // 3. Vite / Static
  if (process.env.NODE_ENV !== "production") {
    console.log(">>> [SERVER] MODE: Development");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log(">>> [SERVER] MODE: Production");
    const distPath = path.join(process.cwd(), 'dist');
    
    // Serve static files from dist
    // We don't set index: false here to allow default behavior if needed, 
    // but the fallback below handles SPA.
    app.use(express.static(distPath, {
      maxAge: 0, // Disable cache temporarily for hard debugging
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
      }
    }));

    // Fallback to index.html for SPA
    app.get('*', async (req, res) => {
      // Exclude files with dots (assets) from fallback
      if (req.url.includes('.')) {
        return res.status(404).send('Not Found');
      }

      try {
        const fs = await import('fs/promises');
        let html = await fs.readFile(path.join(distPath, 'index.html'), 'utf-8');
        
        // Inject dynamic time to bypass any HTML-level CDN caching
        const now = new Date().toISOString();
        html = html.replace('</head>', `<!-- SVR-TIME: ${now} --></head>`);
        
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.send(html);
      } catch (err) {
        console.error(">>> [SERVER] Error serving index.html:", err);
        res.status(500).send("Server Error");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`>>> [SERVER] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error(">>> [SERVER] Startup Error:", err);
});
