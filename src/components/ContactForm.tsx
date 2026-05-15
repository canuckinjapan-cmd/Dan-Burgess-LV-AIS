import { useState, FormEvent } from "react";
import { toast } from "@/hooks/use-toast";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const ContactForm = () => {
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ 
        title: t("Missing details", "入力漏れがあります"), 
        description: t("Please add your name, email, and a short brief.", "お名前、メールアドレス、プロジェクトの概要をご入力ください。") 
      });
      return;
    }
    
    setSubmitting(true);
    
    // Determine the API base URL. 
    // Manual override > Automatic discovery via VITE_APP_URL > Relative path
    const envBase = import.meta.env.VITE_API_BASE_URL;
    const appUrl = import.meta.env.VITE_APP_URL;
    const windowBase = (window as any).API_BASE_URL;
    
    let apiBase = (envBase || windowBase || "").trim().replace(/\/+$/, "");
    
    // If we're on a static host (like GitHub Pages) and no manual base is set,
    // use the baked-in VITE_APP_URL from the AIS environment.
    if (!apiBase && appUrl && !window.location.hostname.includes("run.app") && window.location.hostname !== "localhost") {
      apiBase = appUrl.trim().replace(/\/+$/, "");
    }
    
    const targetUrl = apiBase ? `${apiBase}/api/contact` : "/api/contact";
    console.log("Contact form: Starting submission to", targetUrl);
    
    try {
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Server error: " + response.status);
      }

      setSubmitting(false);
      toast({ 
        title: t("Message sent", "メッセージを送信しました"), 
        description: t("Thanks — Dan will reply within 1–2 business days (JST).", "ありがとうございます。1〜2営業日以内に返信いたします。") 
      });
      setForm({ name: "", email: "", company: "", budget: "", message: "" });
    } catch (error) {
      const err = error as Error;
      console.error("Contact form error:", err);
      setSubmitting(false);
      
      toast({
        variant: "destructive",
        title: t("Error", "エラー"),
        description: err.message || t("Something went wrong. Please try again later.", "送信中にエラーが発生しました。時間をおいて再度お試しください。"),
      });
    }
  };

  const field =
    "w-full bg-white/40 border rule px-4 py-3 font-sans-body text-base placeholder:text-ink-subtle focus:outline-none focus:border-accent-brand transition-all";
  const label = "block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-1";

  return (
    <form onSubmit={onSubmit} className="space-y-7" noValidate>
      <div className="grid sm:grid-cols-2 gap-7">
        <div>
          <label className={label} htmlFor="name">{t("Name *", "お名前 *")}</label>
          <input
            id="name"
            className={field}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={t("Your full name", "姓名")}
            required
          />
        </div>
        <div>
          <label className={label} htmlFor="email">{t("Email *", "メールアドレス *")}</label>
          <input
            id="email"
            type="email"
            className={field}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            required
          />
        </div>
        <div>
          <label className={label} htmlFor="company">{t("Company / Org", "企業・団体名")}</label>
          <input
            id="company"
            className={field}
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder={t("Optional", "任意")}
          />
        </div>
        <div>
          <label className={label} htmlFor="budget">{t("Budget Range", "ご予算")}</label>
          <div className="relative">
            <select
              id="budget"
              className={`${field} appearance-none cursor-pointer pr-10`}
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
            >
              <option value="">{t("Select a range", "選択してください")}</option>
              <option>{t("Under ¥500k", "50万円未満")}</option>
              <option>¥500k – ¥1.5M</option>
              <option>¥1.5M – ¥4M</option>
              <option>¥4M+</option>
              <option>{t("Not sure yet", "未定")}</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      <div>
        <label className={label} htmlFor="message">{t("Project Brief *", "プロジェクト概要 *")}</label>
        <textarea
          id="message"
          rows={5}
          className={`${field} resize-none`}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={t("Tell me about your business, goals, timeline, and the audience you're designing for…", "事業内容、目標、納期、ターゲットなど、プロジェクトの概要を自由にご記入ください。")}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          {t("Replies within 1–2 business days · JST", "1〜2営業日以内に返信いたします")}
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-3 bg-ink text-surface px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-accent-brand transition-colors disabled:opacity-60"
        >
          {submitting ? t("Sending…", "送信中…") : t("Send Brief", "概要を送信する")}
          <span className="text-[22px]" aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
};
