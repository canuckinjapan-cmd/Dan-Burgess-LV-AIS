import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import manga from "@/assets/danface_manga-2025-84.png";
import instagramLogo from "@/assets/Instagram-Logo.png";
import bloggerLogo from "@/assets/Blogger-Logo.png";

const navItems = [
  { label: "Work", jpLabel: "制作事例", href: "#work" },
  { label: "About", jpLabel: "プロフィール", href: "#about" },
  { label: "Services", jpLabel: "サービス", href: "#services" },
  { label: "Process", jpLabel: "プロセス", href: "#process" },
  { label: "Contact", jpLabel: "お問い合わせ", href: "#contact" },
];

export const TopBar = () => {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const LangSwitcher = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest border rule rounded-sm px-1 py-0.5 ${className}`}>
      <button
        onClick={() => setLang("EN")}
        className={`px-1.5 py-0.5 transition-colors ${lang === "EN" ? "bg-accent-brand text-surface" : "text-ink-muted"}`}
        aria-pressed={lang === "EN"}
      >
        EN
      </button>
      <button
        onClick={() => setLang("JP")}
        className={`px-1.5 py-0.5 transition-colors ${lang === "JP" ? "bg-accent-brand text-surface" : "text-ink-muted"}`}
        aria-pressed={lang === "JP"}
      >
        JP
      </button>
    </div>
  );

  return (
    <div className="h-16 w-full relative">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isMenuOpen
            ? "bg-surface border-b rule"
            : scrolled
            ? "bg-surface/95 backdrop-blur-md border-b rule"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1320px] mx-auto pl-6 pr-8 lg:px-10 h-16 flex items-center justify-between gap-6">
        {/* Logo Left: Face only on sm+, Text always */}
        <a href="#top" className="flex items-center gap-3 group shrink-0 relative" aria-label="Dan Burgess Design home">
          <span className="relative hidden sm:inline-block">
            <span className="absolute -inset-1 rounded-full border border-ink/20 animate-spin-slow" aria-hidden />
            <img
              src={manga}
              alt=""
              className="relative w-9 h-9 rounded-full bg-white object-cover"
              style={{ imageRendering: "-webkit-optimize-contrast", transform: "translateZ(0)" }}
              loading="eager"
            />
          </span>
          <span className="font-serif-display font-semibold tracking-tight text-xl">
            <span className="text-black">DAN</span>
            <span className="text-accent-brand">BURGESS</span>
            <span className="text-black">DESIGN</span>
          </span>

          {/* Tooltip Balloon */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-y-1 group-hover:translate-y-0">
            <div className="relative bg-ink text-surface text-[9px] font-mono uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-sm whitespace-nowrap shadow-2xl">
              {t("Return to top", "トップへ戻る")}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-ink rotate-45" />
            </div>
          </div>
        </a>

        {/* Desktop Center: Nav */}
        <nav className="hidden lg:flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em] absolute left-1/2 -translate-x-1/2">
          {navItems.map((n) => (
            <a key={n.label} href={n.href} className="px-2 py-1 text-ink-muted hover:text-white hover:bg-accent-brand rounded-sm transition-all">
              {t(n.label, n.jpLabel)}
            </a>
          ))}
        </nav>

        {/* Right Side Tools */}
        <div className="flex items-center gap-1.5">
          {/* Lang Switcher - Visible right for mobile/tablet, and within desktop tools */}
          <LangSwitcher className="flex" />
          
          {/* Desktop Only Tools */}
          <div className="hidden lg:flex items-center ml-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-ink text-surface px-4 py-2 font-mono text-[11px] uppercase tracking-widest hover:bg-accent-brand transition-colors"
            >
              {t("Start a Project", "プロジェクトを開始する")} <span aria-hidden>→</span>
            </a>
          </div>

          {/* Mobile Right: Hamburger (Visible on lg:hidden) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-ink hover:text-accent-brand transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 top-16 z-40 bg-surface lg:hidden border-t rule shadow-2xl"
          >
            <div className="bg-paper absolute inset-0 -z-10" /> {/* Solid texture background */}
            <nav className="flex flex-col p-8 gap-8">
              {navItems.map((n, i) => (
                <motion.a
                  key={n.label}
                  href={n.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  className="font-serif-display text-4xl font-semibold tracking-tight text-ink hover:text-accent-brand transition-colors"
                >
                  {t(n.label, n.jpLabel)}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 pt-8 border-t rule"
              >
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center justify-between w-full bg-ink text-surface px-6 py-5 font-mono text-[12px] uppercase tracking-[0.25em] hover:bg-accent-brand transition-colors"
                >
                  {t("Start a Project", "プロジェクトを開始する")} <span>→</span>
                </a>
              </motion.div>
            </nav>
            <div className="absolute bottom-10 left-8 right-8 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.instagram.com/canuckinjapan/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center size-8 transition-transform hover:scale-110"
                >
                  <img 
                    src={instagramLogo} 
                    alt="Instagram" 
                    className="w-full h-full object-contain" 
                    style={{ imageRendering: "-webkit-optimize-contrast" }}
                  />
                </a>
                <a 
                  href="https://djb-archviz.blogspot.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center size-8 transition-transform hover:scale-110"
                >
                  <img 
                    src={bloggerLogo} 
                    alt="Blogger" 
                    className="w-full h-full object-contain" 
                    style={{ imageRendering: "-webkit-optimize-contrast" }}
                  />
                </a>
              </div>
              <span>© {new Date().getFullYear()} Burgess</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  </div>
  );
};
