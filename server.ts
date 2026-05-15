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
      console.log(`>>> [SERVER] ${req.method} ${req.url}`);
    }
    next();
  });

  // 2. API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV });
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
    console.log(">>> [SERVER] Initializing Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const BUILD_TIME = new Date().toISOString();
    console.log(`>>> [SERVER] Production Mode: Serving dist/ (Build Time: ${BUILD_TIME})`);
    const distPath = path.resolve(process.cwd(), 'dist');
    
    // Global header to check if we are using the new server version
    app.use((req, res, next) => {
      res.setHeader('X-Server-Time', BUILD_TIME);
      next();
    });

    // Explicitly handle JS file requests to ensure MIME type
    app.use('/assets', (req, res, next) => {
      console.log(`>>> [SERVER] Asset request: ${req.url}`);
      next();
    });

    app.use(express.static(distPath, {
      index: false,
      maxAge: '1y', // Assets are hashed, long cache is fine
      immutable: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
        if (filePath.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css');
        }
      }
    }));

    app.get('*', async (req, res, next) => {
      // Don't fallback for API or static files (anything with a dot)
      if (req.url.startsWith('/api') || req.url.includes('.')) {
        console.log(`>>> [SERVER] Fallback skipped (likely missing asset): ${req.url}`);
        return next();
      }
      
      console.log(`>>> [SERVER] Serving SPA index.html for: ${req.url}`);
      try {
        const fs = await import('fs/promises');
        let html = await fs.readFile(path.resolve(distPath, 'index.html'), 'utf-8');
        
        // Inject a dynamic comment to break any possible CDN cache of the HTML itself
        html = html.replace('</head>', `<!-- Server Build: ${BUILD_TIME} --></head>`);
        
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
      } catch (err) {
        console.error(">>> [SERVER] Error reading index.html:", err);
        res.status(500).send("Server Error");
      }
    });
  }

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
