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

  // 1. Basic Middlewares
  app.use(cors());
  app.use(express.json());

  // Logging
  app.use((req, res, next) => {
    if (!req.url.includes("/api/health") && !req.url.includes("/@vite") && !req.url.includes("/node_modules")) {
      console.log(`>>> [SERVER] ${new Date().toISOString()} | ${req.method} ${req.url}`);
    }
    next();
  });

  // 2. API Routes
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      mode: process.env.NODE_ENV,
      version: "1.2.0",
      time: new Date().toISOString()
    });
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
    console.log(">>> [SERVER] MODE: Development (Using Vite)");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log(">>> [SERVER] MODE: Production (Serving Dist)");
    const distPath = path.resolve(process.cwd(), 'dist');
    
    // Serve static files from dist
    app.use(express.static(distPath, {
      index: false,
      maxAge: 0,
      setHeaders: (res, filePath) => {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        if (filePath.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
          res.setHeader('X-Content-Type-Options', 'nosniff');
        }
        if (filePath.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css');
        }
      }
    }));

    // Fallback to index.html for SPA
    app.get('*', (req, res) => {
      // If it looks like a file request that wasn't caught by static, it's 404
      if (req.url.includes('.') && !req.url.includes('?')) {
        console.log(`>>> [SERVER] File Not Found: ${req.url}`);
        return res.status(404).send('Not Found');
      }
      
      console.log(`>>> [SERVER] Serving index.html for: ${req.url}`);
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  // Final catch-all for errors
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(">>> [SERVER] FATAL ERROR:", err);
    res.status(500).send("Internal Server Error");
  });

  // 404 for non-SPA routes (missing assets/API)
  app.use((req, res) => {
    if (req.url.startsWith('/api')) {
      res.status(404).json({ error: "API Route Not Found" });
    } else {
      res.status(404).send("Not Found");
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`>>> [SERVER] Running on http://0.0.0.0:${PORT} (${process.env.NODE_ENV || 'development'})`);
  });
}

startServer();
