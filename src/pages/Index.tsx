import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Instagram, Rss } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { CaseStudies } from "@/components/CaseStudies";
import { ContactForm } from "@/components/ContactForm";
import { PortraitPlate } from "@/components/PortraitPlate";
import manga from "@/assets/danface_manga.svg";
import japanBg from "@/assets/images/japan_sumie_panoramic_bg_1781882609398.jpg";
import aboutBg from "@/assets/images/photo-1570435229357-79dd1692b110-BC.jpg";

import instagramLogo from "@/assets/Instagram-Logo.png";
import bloggerLogo from "@/assets/Blogger-Logo.png";
import { useLanguage } from "@/context/LanguageContext";

// Version 2.2.4 - Re-aligned section layouts to fix font jitter bugs and match top edge redlines perfectly

const Index = () => {
  const { t, lang } = useLanguage();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  const aboutY = useTransform(aboutScrollProgress, [0, 1], [-80, 80]);

  const currentYear = new Date().getFullYear();

  const getSeasonDetails = () => {
    const today = new Date();
    const month = today.getMonth(); // 0-11 (Jan is 0, Dec is 11)
    const year = today.getFullYear();

    let seasonEn = "Spring";
    let seasonJp = "春";
    let seasonIndex = 0; // 0 = Spring, 1 = Summer, 2 = Autumn, 3 = Winter
    let seasonYear = year;

    if (month >= 2 && month <= 4) {
      // Mar, Apr, May
      seasonEn = "Spring";
      seasonJp = "春";
      seasonIndex = 0;
      seasonYear = year;
    } else if (month >= 5 && month <= 7) {
      // Jun, Jul, Aug
      seasonEn = "Summer";
      seasonJp = "夏";
      seasonIndex = 1;
      seasonYear = year;
    } else if (month >= 8 && month <= 10) {
      // Sep, Oct, Nov
      seasonEn = "Autumn";
      seasonJp = "秋";
      seasonIndex = 2;
      seasonYear = year;
    } else {
      // Dec, Jan, Feb
      seasonEn = "Winter";
      seasonJp = "冬";
      seasonIndex = 3;
      seasonYear = month === 11 ? year : year - 1;
    }

    const issueNo = 26 + (seasonYear - 2026) * 4 + seasonIndex;

    return {
      issueNo,
      seasonEn,
      seasonJp,
      seasonYear,
    };
  };

  const seasonDetails = getSeasonDetails();

  const stats = [
    { value: "30+", label: t("Years working between English & Japanese", "翻訳・デザイン経験") },
    { value: "1992", label: t("Based in Japan", "日本在住") },
    { value: "EN / JP", label: t("Professional bilingual", "英語・日本語対応") },
  ];

  const services = [
    {
      no: "01",
      title: t("Bilingual Web Design", "英語対応Webサイト制作"),
      body: t(
        "Websites designed for both English and Japanese audiences. Layouts, typography, and content are carefully adapted so each language feels natural.",
        "英語と日本語の両方に対応したWebサイトを設計・制作します。言語ごとの読みやすさやレイアウトにも配慮しています。"
      ),
      deliverables: t(
        ["Strategy & sitemap", "Design system", "EN + JP build"],
        ["戦略・サイトマップ", "デザインシステム", "日英サイト構築"]
      ),
    },
    {
      no: "02",
      title: t("UI / Product Design", "UI・UX設計"),
      body: t(
        "Clear, user-friendly interfaces for websites, apps, and software. Designed to be intuitive, accessible, and easy to use.",
        "Webサービスやアプリ向けに、分かりやすく使いやすい画面設計を行います。"
      ),
      deliverables: t(
        ["UX audits", "Design systems", "Figma libraries"],
        ["UXオーディット", "デザインシステム", "Figmaライブラリ"]
      ),
    },
    {
      no: "03",
      title: t("Visual Web Design", "Webデザイン・構築"),
      body: t(
        "Modern responsive websites built with tools such as Framer, Wordpress and AI-assisted workflows. Easy for your team to update without relying on a developer.",
        "Framer、Wordpressなどを活用し、更新しやすく運用しやすいWebサイトを制作します。"
      ),
      deliverables: t(
        ["Webflow / Framer", "CMS modeling", "Editor handover"],
        ["Webflow / Framer実装", "CMS設計", "運用マニュアル"]
      ),
    },
    {
      no: "04",
      title: t("Localization & Translation", "英語ローカライズ・翻訳"),
      body: t(
        "Translation and localization informed by more than 30 years living and working in Japan. Content is reviewed and adapted for real audiences, not machine translation.",
        "30年以上の日本在住経験を活かし、単なる翻訳ではなく、伝わる英語表現へ調整します。"
      ),
      deliverables: t(
        ["UI copy EN/JP", "Brand voice", "Cultural review"],
        ["日英UIコピー", "ブランドボイス設定", "文化的レビュー"]
      ),
    },
  ];

  const pricingCards = [
    {
      no: "01",
      title: t("Starter", "スターター"),
      body: t(
        "For consultants, local businesses, and small organizations.",
        "コンサルタント、個人事業主、小規模な組織に最適です。"
      ),
      features: [
        t("Up to 5 pages", "最大5ページ構成"),
        t("Mobile responsive", "モバイル端末対応"),
        t("Contact form", "お問い合わせフォーム"),
        t("Basic SEO setup", "検索最適化（基本SEO）"),
        t("English or Japanese", "英語または日本語制作"),
        t("Self-managed", "自力での更新・管理"),
      ],
      price: "¥180,000 – ¥250,000",
      isMostPopular: false,
    },
    {
      no: "02",
      title: t("Business", "ビジネス"),
      body: t(
        "For growing businesses that need a professional online presence.",
        "プロフェッショナルな発信力を必要とする、成長中の企業向けです。"
      ),
      features: [
        t("5–10 pages", "5〜10ページ構成"),
        t("Custom design", "カスタムデザイン"),
        t("Blog or news section", "ブログ・お知らせ機能"),
        t("Analytics setup", "アクセス解析設定"),
        t("Cloudflare setup", "Cloudflare導入・高速化"),
        t("English + Japanese", "英語・日本語バイリンガル対応"),
      ],
      price: "¥350,000 – ¥500,000",
      isMostPopular: true,
    },
    {
      no: "03",
      title: t("International", "インターナショナル"),
      body: t(
        "For companies targeting overseas customers or operating across multiple markets.",
        "海外顧客をターゲットにする企業や、マルチマーケットで展開する企業に最適です。"
      ),
      features: [
        t("Strategy workshop", "戦略ワークショップ"),
        t("UX planning", "UXデザイン・動線設計"),
        t("Localization review", "言語・文化的ローカライズ"),
        t("Advanced SEO", "高度なSEO・導線最適化"),
        t("English copy optimization", "英語コピーライティング調整"),
        t("Bilingual architecture", "バイリンガル特有の構造最適化"),
      ],
      price: "¥600,000+",
      isMostPopular: false,
    },
  ];

  const supportOptions = [
    {
      title: t("Self Managed", "自主運用"),
      price: t("¥0/month", "¥0 / 月"),
    },
    {
      title: t("Basic Care", "ベーシック保守"),
      price: t("¥5,000/month", "¥5,000 / 月"),
    },
    {
      title: t("Managed Support", "マネージドサポート"),
      price: t("¥15,000/month", "¥15,000 / 月"),
    },
  ];

  return (
    <div id="top" className="bg-paper text-ink min-h-dvh font-sans-body w-full overflow-x-hidden relative">
      <TopBar />

      <main id="main-content" className="w-full">
        {/* HERO ============================================================ */}
        <section id="hero" className="relative overflow-hidden w-full">
          {/* Faint, parallax-shifting Japan-inspired background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
            <motion.div 
              style={{ y }} 
              className="absolute inset-0 w-full h-[125%]"
            >
              <img
                src={japanBg}
                alt=""
                className="w-full h-full object-cover object-center opacity-[0.6] mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            {/* Vignette fade to blend seamlessly with the textured paper canvas */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-paper to-transparent" />
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-paper to-transparent" />
          </div>

          <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-8 md:landscape:pt-10 lg:pt-16 lg:landscape:pt-16 pb-12 md:landscape:pb-12 lg:pb-16 lg:landscape:pb-16 relative z-10">
            
            <motion.div 
              className="w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {/* Issue Ribbon */}
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/80 mb-8">
                <span className="size-1.5 rounded-full bg-accent-brand animate-pulse-dot" aria-hidden />
                <span>Issue №{seasonDetails.issueNo} · {t(`${seasonDetails.seasonEn} ${seasonDetails.seasonYear}`, `${seasonDetails.seasonJp} ${seasonDetails.seasonYear}`)}</span>
                <span className="h-px w-8 bg-ink/20" />
                <span>Fukuoka, JPN · UTC+9</span>
              </div>

              {/* Layout Engine */}
              <div className="grid grid-cols-1 landscape:grid-cols-12 lg:grid-cols-12 gap-8 landscape:gap-10 lg:gap-12 items-start">
                
                {/* Left Side: Large Title Typography */}
                <div className="landscape:col-span-7 lg:col-span-7 w-full">
                  <h1 className="font-serif-display font-extrabold tracking-[-0.02em] text-left">
                    {t(
                      <span className="block text-[2.5rem] sm:text-[3.5rem] landscape:text-[2.25rem] md:landscape:text-[2.85rem] lg:text-[3.25rem] lg:landscape:text-[3.0rem] xl:text-[4.0rem] xl:landscape:text-[4.0rem] leading-[1.05] landscape:leading-[1.2] lg:leading-[1.2]">
                        Helping businesses succeed across <span className="text-accent-brand">English</span> and <span className="text-accent-brand">Japanese</span> markets.
                      </span>,
                      <span className="block text-[2.6rem] sm:text-[3.73rem] landscape:text-[2.2rem] md:landscape:text-[3.25rem] lg:text-[3.73rem] lg:landscape:text-[3.73rem] xl:text-[4.59rem] xl:landscape:text-[4.59rem] leading-[1.1]">
                        海外に伝わる<br />Webサイトを、<br /><span className="text-accent-brand">日本から。</span>
                      </span>
                    )}
                  </h1>

                  {/* CTA Buttons for Mobile Landscape only */}
                  <div className="hidden landscape:flex lg:hidden flex-wrap items-center gap-4 landscape:gap-2.5 w-full mt-8">
                    <a
                      href="#contact"
                      className="group inline-flex items-center justify-center text-center gap-3 landscape:gap-1.5 bg-ink text-surface px-6 py-4 landscape:px-3.5 landscape:py-3 font-mono text-[11px] landscape:text-[9.5px] lg:landscape:text-[11px] lg:landscape:px-6 lg:landscape:py-4 font-bold uppercase tracking-[0.22em] landscape:tracking-[0.1em] lg:landscape:tracking-[0.22em] hover:bg-accent-brand transition-colors w-full sm:w-auto landscape:w-auto whitespace-nowrap"
                    >
                      {t("Start a Project", "プロジェクト相談")}
                      <span className="text-[22px] landscape:text-[18px] lg:landscape:text-[22px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                    </a>
                    <a
                      href="#work"
                      className="inline-flex items-center justify-center text-center gap-3 landscape:gap-1.5 px-6 py-4 landscape:px-3.5 landscape:py-3 font-mono text-[11px] landscape:text-[9.5px] lg:landscape:text-[11px] lg:landscape:px-6 lg:landscape:py-4 font-bold uppercase tracking-[0.22em] landscape:tracking-[0.1em] lg:landscape:tracking-[0.22em] text-ink hover:text-accent-brand transition-all border-2 border-ink/40 hover:border-accent-brand hover:bg-white/40 shadow-sm w-full sm:w-auto landscape:w-auto whitespace-nowrap"
                    >
                      {t("See Selected Work", "制作実績を見る")}
                    </a>
                  </div>
                </div>

                {/* Right Side: Paragraph Block and Action Buttons */}
                <div className="landscape:col-span-5 lg:col-span-5 w-full flex flex-col gap-8 landscape:pt-4 lg:pt-4">
                  <p className="max-w-[42ch] portrait:text-[15.3px] portrait:leading-[1.42] sm:portrait:text-lg sm:portrait:leading-relaxed text-lg md:landscape:text-base lg:landscape:text-base xl:landscape:text-lg xl:text-lg lg:text-lg text-ink/85 leading-relaxed">
                    {t(
                      <>Expanding into international markets requires more than translation.
I help Japanese businesses communicate effectively with English-speaking audiences through web design, UI design, and localization.<br />
Based in Japan since 1992, I bring over 30 years of experience working between English and Japanese in software, product development, and digital design.</>,
                      <>
                        日本企業の海外発信を支援するWebデザイナー。<br />
                        英語対応Webサイト、UIデザイン、ローカライズを一貫してサポートしています。<br />
                        カナダ出身。1992年より日本在住。<br />
                        30年以上にわたり、日本語と英語の両方に対応したWebサイトやデジタルプロダクトの制作に携わってきました。
                      </>
                    )}
                  </p>

                  <div className="flex landscape:hidden lg:flex flex-wrap landscape:flex-nowrap lg:flex-nowrap items-center gap-4 landscape:gap-2.5 lg:gap-4 w-full">
                    <a
                      href="#contact"
                      className="group inline-flex items-center justify-center text-center gap-3 landscape:gap-1.5 bg-ink text-surface px-6 py-4 landscape:px-3.5 landscape:py-3 font-mono text-[11px] landscape:text-[9.5px] lg:landscape:text-[11px] lg:landscape:px-6 lg:landscape:py-4 font-bold uppercase tracking-[0.22em] landscape:tracking-[0.1em] lg:landscape:tracking-[0.22em] hover:bg-accent-brand transition-colors w-full sm:w-auto landscape:w-auto whitespace-nowrap"
                    >
                      {t("Start a Project", "プロジェクト相談")}
                      <span className="text-[22px] landscape:text-[18px] lg:landscape:text-[22px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                    </a>
                    <a
                      href="#work"
                      className="inline-flex items-center justify-center text-center gap-3 landscape:gap-1.5 px-6 py-4 landscape:px-3.5 landscape:py-3 font-mono text-[11px] landscape:text-[9.5px] lg:landscape:text-[11px] lg:landscape:px-6 lg:landscape:py-4 font-bold uppercase tracking-[0.22em] landscape:tracking-[0.1em] lg:landscape:tracking-[0.22em] text-ink hover:text-accent-brand transition-all border-2 border-ink/40 hover:border-accent-brand hover:bg-white/40 shadow-sm w-full sm:w-auto landscape:w-auto whitespace-nowrap"
                    >
                      {t("See Selected Work", "制作実績を見る")}
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* Stat strip - Hidden on mobile/tablet */}
          <motion.div 
            className="border-y border-ink bg-surface-soft/40 hidden lg:block md:landscape:block relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <dl className="max-w-[1320px] mx-auto px-6 lg:px-10 grid grid-cols-3 divide-x divide-ink">
              {stats.map((s, i) => (
                <div key={s.label} className={`px-6 py-5 md:landscape:py-4 lg:py-7 lg:landscape:py-7 transition-[background-color] duration-300 hover:bg-surface-elevated cursor-pointer ${i === 0 ? "border-l-0" : ""}`}>
                  <dt className="font-serif-display text-4xl md:landscape:text-3xl lg:text-5xl lg:landscape:text-5xl font-bold tracking-tight leading-none text-ink/85">
                    {s.value}
                  </dt>
                  <dd className="mt-3 md:landscape:mt-2 lg:landscape:mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/80 font-semibold">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

        </section>

        {/* WORK ============================================================ */}
        <section id="work" className="py-24 lg:py-32 w-full overflow-x-hidden relative">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <header className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-24">
              <div className="lg:col-span-3">
                <p className="font-mono font-bold text-[16px] uppercase tracking-[0.22em] text-accent-brand mb-3">
                  §01 — {t("Selected Work", "制作実績")}
                </p>
              </div>
              <div className="lg:col-span-9">
                <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05] text-balance">
                  {t(
                    <>Three projects, three industries — one <em className="italic text-accent-brand font-medium">bilingual</em> design approach.</>,
                    <>業種は違っても、アプローチは同じです。</>
                  )}
                </h2>
                <p className="mt-6 max-w-[60ch] text-ink-muted text-lg leading-relaxed">
                  {t(
                    "Every project begins with understanding your audience and business goals. These concept case studies demonstrate my approach to bilingual design and user experience. Click any homepage to open a live demo in a new tab.",
                    "まずはターゲットユーザーとビジネス目標を理解することから始めます。\n以下は、バイリンガル対応とユーザー体験を重視したコンセプト事例です。ホームページ画像をクリックするとデモサイトが開きます。"
                  )}
                </p>
              </div>
            </header>

            <CaseStudies />
          </div>
        </section>

{/* ABOUT =========================================================== */}
<section ref={aboutRef} id="about" className="py-24 lg:py-32 border-t rule bg-surface-soft/30 w-full overflow-x-hidden relative">
  {/* Faint, Japan-inspired background fitting exactly the height and width of the section with parallax */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
    <motion.div 
      style={{ y: aboutY }} 
      className="absolute inset-0 w-full h-[120%] -top-[10%]"
    >
      <img
        src={aboutBg}
        alt=""
        className="w-full h-full object-cover object-center opacity-[0.25] mix-blend-multiply"
        referrerPolicy="no-referrer"
      />
    </motion.div>
    {/* Vignette fade to blend seamlessly with the textured paper canvas */}
    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-paper to-transparent" />
    <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-paper to-transparent" />
    <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-paper to-transparent" />
  </div>

  <motion.div 
    className="max-w-[1320px] mx-auto px-6 lg:px-10 grid grid-cols-1 landscape:grid-cols-12 md:landscape:grid-cols-12 lg:grid-cols-12 gap-10 lg:gap-12 items-start relative z-10"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {/* Left Column Container: Houses Title always at top, and Polaroid on Desktop/Landscape layout splits */}
    <div className="grid-cols-1 landscape:col-span-4 md:landscape:col-span-3 lg:col-span-3 flex flex-col gap-8">
      <div>
        <p className="font-mono font-bold text-[16px] uppercase tracking-[0.22em] landscape:tracking-[0.06em] lg:tracking-[0.22em] text-accent-brand mb-0">
          §02 — {t("About", "私について")}
        </p>
      </div>

      {/* Polaroid Frame: Visible on Desktop OR any Landscape viewport orientation */}
      <div className="hidden landscape:block lg:block">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          className="w-full max-w-[310px] relative bg-surface-elevated border rule p-4 shadow-[0_30px_80px_-40px_hsl(var(--ink)/0.3)] cursor-pointer"
        >
          <div className="flex items-center justify-between font-mono text-[8px] lg:text-[10px] uppercase tracking-widest text-ink-muted mb-3 lg:mb-4">
            <span>Plate 01</span>
            <span className="flex items-center gap-1.5 lg:gap-2">
              <span className="size-1 rounded-full lg:size-1.5 bg-accent-brand animate-pulse-dot" />
              {t("Accepting Q3", "ご相談受付中")}
            </span>
          </div>
          <PortraitPlate />
          
          <div className="mt-4 lg:mt-5 flex items-center justify-between gap-1 pt-3 lg:pt-3.5 border-t rule">
            <div className="min-w-0 flex-1">
              <p 
                className="text-lg lg:text-xl leading-none tracking-tight whitespace-nowrap overflow-visible" 
                style={{ fontFamily: '"Homemade Apple", cursive', backfaceVisibility: "hidden" }}
              >
                Dan Burgess
              </p>
              <p className="font-mono text-[8px] lg:text-[9px] uppercase tracking-widest text-ink-muted mt-1.5 whitespace-nowrap">
                {t("Designer · Translator", "デザイナー · 翻訳者")}
              </p>
            </div>
            <p className="font-mono text-sm uppercase tracking-normal text-ink-muted text-right leading-none shrink-0 select-none pl-1 flex items-center gap-0.5">
              <span>🍁</span><span className="text-[10px] text-ink-muted/60 font-sans">→</span><span>🇯🇵</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Right Column: Narrative Copy. Takes natural grid order in portrait stacks */}
    <div className="landscape:col-span-8 landscape:col-start-5 md:landscape:col-span-9 md:landscape:col-start-4 lg:col-span-7 lg:col-start-5 landscape:pt-[54px] lg:pt-[92px] landscape:max-w-[700px] lg:max-w-[700px]">
      <p className="drop-cap text-lg leading-[1.7] text-ink/85 mb-6">
        {t(
          "Originally trained in print and multimedia design in Canada, I moved to Japan in 1992 and have worked here ever since.",
          "カナダでデザインを学び、1992年に来日しました。"
        )}
      </p>
      <p className="text-ink-muted leading-relaxed mb-6">
        {t(
          "My background includes software localization, product documentation, UI design, and web design, including work for major Japanese companies and international projects.",
          "これまでソフトウェア翻訳、UI設計、技術文書制作、Webデザインなど、幅広い分野で日本語と英語を扱うプロジェクトに携わってきました。"
        )}
      </p>
      <p className="text-ink-muted leading-relaxed mb-6">
        {t(
          "Today, I help individuals, small businesses, and organizations bridge the gap between languages, cultures, and markets—creating digital experiences that feel natural in both English and Japanese.",
          "現在は、個人事業主や中小企業、各種団体の海外向け情報発信を支援し、日本語と英語の両方で自然に伝わるWebサイトやデジタル体験を制作しています。"
        )}
      </p>
      <p className="text-ink-muted leading-relaxed">
        {t(
          "You work directly with an experienced designer who understands both the technical and cultural challenges of communicating across English and Japanese. No agencies, account managers, or hand-offs—just clear communication and practical advice from start to finish.",
          "ご相談から納品まで私が直接対応します。代理店や営業担当を介さないため、スムーズなコミュニケーションと柔軟な対応が可能です。"
        )}
      </p>
    </div>

    {/* Portrait-Only Polaroid Container: Renders explicitly below the text on Mobile & Tablet Portrait viewports */}
    <div className="block landscape:hidden lg:hidden mt-4 w-full flex justify-center">
      <motion.div 
        style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        className="w-full max-w-[310px] relative bg-surface-elevated border rule p-4 shadow-[0_20px_50px_-30px_hsl(var(--ink)/0.25)]"
      >
        <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-widest text-ink-muted mb-3">
          <span>Plate 01</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1 rounded-full bg-accent-brand animate-pulse-dot" />
            {t("Accepting Q3", "ご相談受付中")}
          </span>
        </div>
        <PortraitPlate />
        
        <div className="mt-4 flex items-center justify-between gap-1 pt-3 border-t rule">
          <div className="min-w-0 flex-1">
            <p 
              className="text-lg leading-none tracking-tight whitespace-nowrap overflow-visible" 
              style={{ fontFamily: '"Homemade Apple", cursive', backfaceVisibility: "hidden" }}
            >
              Dan Burgess
            </p>
            <p className="font-mono text-[8px] uppercase tracking-widest text-ink-muted mt-1.5 whitespace-nowrap">
              {t("Designer · Translator", "デザイナー · 翻訳者")}
            </p>
          </div>
          <p className="font-mono text-sm uppercase tracking-normal text-ink-muted text-right leading-none shrink-0 select-none pl-1 flex items-center gap-0.5">
            <span>🍁</span><span className="text-[10px] text-ink-muted/60 font-sans">→</span><span>🇯🇵</span>
          </p>
        </div>
      </motion.div>
    </div>

  </motion.div>
</section>

        {/* SERVICES ======================================================== */}
        <section id="services" className="py-24 lg:py-32 border-t rule w-full overflow-x-hidden relative">
          <motion.div 
            className="max-w-[1320px] mx-auto px-6 lg:px-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <header className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-20">
              <div className="lg:col-span-3">
                <p className="font-mono font-bold text-[16px] uppercase tracking-[0.22em] text-accent-brand mb-3">
                  §03 — {t("Services", "サービス")}
                </p>
              </div>
              <div className="lg:col-span-9">
                <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05] text-balance">
                  {t(
                    <>Designing websites that work naturally in both <span className="text-accent-brand">English</span> and <span className="text-accent-brand">Japanese</span>.</>,
                    <>デザイン、ローカライズ、デジタル<span className="text-accent-brand">プロダクト支援</span></>
                  )}
                </h2>
              </div>
            </header>

            <div className="grid md:grid-cols-2 gap-px bg-ink/10 border rule" role="list">
              {services.map((s) => (
                <article key={s.no} className="group bg-surface p-8 lg:p-10 hover:bg-surface-elevated transition-colors" role="listitem">
                  <div className="flex items-center justify-between mb-6">
                    <header className="font-mono text-[22px] uppercase tracking-[0.22em] text-accent-brand">
                      {s.no}
                    </header>
                    <span className="font-mono text-[22px] uppercase tracking-widest text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                      →
                    </span>
                  </div>
                  <h3 className="font-serif-display text-2xl lg:text-3xl font-bold tracking-tight mb-4">
                    {s.title}
                  </h3>
                  <p className="text-ink-muted leading-relaxed max-w-[42ch]">{s.body}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PRICING ========================================================= */}
        <section id="pricing" className="py-24 lg:py-32 border-t rule bg-surface-soft/30 w-full overflow-x-hidden relative">
          <motion.div 
            className="max-w-[1320px] mx-auto px-6 lg:px-10 space-y-14 lg:space-y-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Top Row: Main Pricing */}
            <div className="grid lg:grid-cols-12 gap-10 items-stretch">
              <div className="lg:col-span-3 flex flex-col justify-between">
                <div>
                  <p className="font-mono font-bold text-[16px] uppercase tracking-[0.22em] text-accent-brand mb-3">
                    §04 — {t("Pricing", "制作費の目安")}
                  </p>
                  <h2 className="font-serif-display text-4xl lg:text-4xl font-bold tracking-[-0.02em] leading-[1.1] whitespace-pre-line mb-5">
                    {t(
                      "Clear pricing.\nNo surprises.",
                      <span className="text-[1.85rem] sm:text-3xl lg:text-[1.8rem] xl:text-[2rem] leading-tight block font-bold transition-all">
                        明朗な料金形態、{"\n"}追加費用はありません。
                      </span>
                    )}
                  </h2>
                  <p className="text-ink-muted text-sm leading-relaxed max-w-[28ch] whitespace-pre-line">
                    {t(
                      "Every project is different, but most websites fall into one of the following ranges.\n\nThe final quote depends on scope, content requirements, and bilingual needs.",
                      "プロジェクトごとに仕様は異なりますが、多くのウェブサイトは右記いずれかの価格帯に収まります。\n\n最終的なお見積もりは制作範囲、コンテンツ要件、日英対応の有無に基づき算出します。"
                    )}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-9 grid sm:grid-cols-3 gap-px bg-ink/10 border rule self-stretch">
                {pricingCards.map((c) => (
                  <div 
                    key={c.no} 
                    className="flex flex-col h-full bg-surface p-6 lg:p-7 hover:bg-surface-elevated transition-colors duration-300 group relative"
                  >
                    {c.isMostPopular && (
                      <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 z-10">
                        <span className="inline-block bg-ink text-surface text-[10px] font-mono uppercase tracking-[0.2em] px-4 py-1.5 rounded-full transition-colors duration-300 group-hover:bg-accent-brand whitespace-nowrap">
                          {t("MOST POPULAR", "一番人気")}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-4">
                      <p className="font-mono text-[22px] uppercase tracking-widest text-[#E66244]/80">
                        {c.no}
                      </p>
                    </div>
                    
                    <h3 className="font-serif-display text-2xl font-bold mb-4 text-ink">
                      {c.title}
                    </h3>
                    
                    <p className="text-ink-muted text-sm leading-relaxed mb-6 block min-h-[3.5rem] md:min-h-[4.5rem]">
                      {c.body}
                    </p>
                    
                    <ul className="space-y-2.5 mb-8 text-sm text-ink-muted">
                      {c.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-accent-brand font-bold text-xs mt-0.5" aria-hidden>✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="font-mono font-bold text-[15px] lg:text-[16px] text-ink mt-auto pt-6 border-t border-ink/5">
                      {c.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: Optional Support */}
            <div className="grid lg:grid-cols-12 gap-10 items-stretch pt-6 lg:pt-0">
              <div className="lg:col-span-3 flex lg:items-center">
                <h3 className="font-serif-display text-3xl lg:text-3xl font-bold tracking-tight text-ink text-balance leading-none">
                  {t("Optional support", "オプションサポート")}
                </h3>
              </div>

              <div className="lg:col-span-9 grid sm:grid-cols-3 gap-px bg-ink/10 border rule self-stretch">
                {supportOptions.map((opt) => (
                  <div key={opt.title} className="bg-surface p-6 lg:p-7 hover:bg-surface-elevated transition-colors duration-300">
                    <h4 className="font-serif-display text-xl font-bold text-ink mb-1.5">
                      {opt.title}
                    </h4>
                    <p className="font-mono text-xs text-ink-muted">
                      {opt.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* CONTACT ========================================================= */}
        <section id="contact" className="py-24 lg:py-32 border-t rule w-full overflow-x-hidden relative">
          <motion.div 
            className="max-w-[1320px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="lg:col-span-4">
              <p className="font-mono font-bold text-[16px] uppercase tracking-[0.22em] text-accent-brand mb-4">
                §05 — {t("Contact", "お問い合わせ")}
              </p>
              <h2 className="font-serif-display text-4xl md:text-5xl lg:text-[3.75rem] font-bold tracking-[-0.02em] leading-[1.02] text-balance">
                {t(
                  <>Let's discuss your <em className="italic text-accent-brand font-medium">project</em></>,
                  <>まずはお気軽にご相談ください</>
                )}
              </h2>
              <p className="mt-6 text-ink-muted text-lg leading-relaxed max-w-[44ch] whitespace-pre-line">
                {t(
                  "Whether you're a Japanese company expanding overseas or an international business entering Japan, I'd be happy to discuss your project.",
                  "プロジェクト概要、ご予算、スケジュールなどをお知らせください。\n内容を確認後、通常1〜2営業日以内にご返信いたします。"
                )}
              </p>

              <dl className="mt-10 space-y-5 font-mono text-[12px] uppercase tracking-[0.18em]">
                <div className="flex items-start gap-4">
                  <dt className="text-ink-muted w-20">Contact</dt>
                  <dd className="text-ink">
                    {t("USE CONTACT FORM", "フォームよりお問い合わせください")}
                  </dd>
                </div>
                <div className="flex items-start gap-4">
                  <dt className="text-ink-muted w-20">Studio</dt>
                  <dd className="text-ink">Fukuoka, JP · UTC+9</dd>
                </div>
                <div className="flex items-start gap-4">
                  <dt className="text-ink-muted w-20">Lang</dt>
                  <dd className="text-ink">English · 日本語</dd>
                </div>
                <div className="flex items-start gap-4">
                  <dt className="text-ink-muted w-20">Status</dt>
                  <dd className="text-ink flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-accent-brand animate-pulse-dot" />
                    {t("Accepting Q3 Projects", "ご相談受付中")}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-8 bg-surface-elevated p-7 lg:p-10 shadow-[0_30px_80px_-40px_hsl(var(--ink)/0.25)] lg:mt-[44px]">
              <ContactForm />
            </div>
          </motion.div>
        </section>

        {/* FAQ SECTION ===================================================== */}
        <section id="faq" className="py-24 lg:py-32 border-t rule w-full overflow-x-hidden relative bg-surface-soft/25">
          <motion.div 
            className="max-w-[1320px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="lg:col-span-4">
              <p className="font-mono font-bold text-[16px] uppercase tracking-[0.22em] text-accent-brand mb-3">
                §06 — {t("FAQ & Insights", "よくあるご質問")}
              </p>
              <h2 className="font-serif-display text-4xl font-bold tracking-[-0.02em] leading-[1.1]">
                {t("Clear answers about process, tools, and bilingual design.", "制作や英語対応についてよくいただくご質問")}
              </h2>
              <p className="mt-6 text-ink-muted text-sm leading-relaxed max-w-[32ch]">
                {t(
                  "Below are common questions about how I work and how bilingual websites are designed and built.",
                  "制作の進め方やバイリンガルサイトについて、よくいただくご質問をまとめました。"
                )}
              </p>
            </div>

            <div className="lg:col-span-8 space-y-12">
              {[
                {
                  q: t("How do you handle English and Japanese layout differences?", "英語と日本語でレイアウトは変わりますか？"),
                  a: t(
                    "English and Japanese have different text densities and visual balance. Typography and spacing are designed separately for each language to maintain a consistent visual experience.",
                    "はい。文字量や見え方が異なるため、それぞれに合わせて余白やタイポグラフィを調整しています。"
                  )
                },
                {
                  q: t("What tools and technologies do you use?", "どのようなツールを使用していますか？"),
                  a: t(
                    "I use modern design tools, responsive frameworks, and custom code where appropriate. All sites are built with performance, accessibility, and long-term maintenance in mind.",
                    "Webflow、Framer、カスタムコードなど、プロジェクトに応じて最適な手法を選択しています。"
                  )
                },
                {
                  q: t("How long does a typical project take?", "制作期間はどのくらいですか？"),
                  a: t(
                    "Most projects take 4 to 8 weeks from initial planning to launch. Timelines depend on content volume and bilingual requirements.",
                    "一般的には4〜8週間程度です。内容や規模によって変動します。"
                  )
                },
                {
                  q: t("Are bilingual websites optimized for search?", "SEOにも対応していますか？"),
                  a: t(
                    "Yes. Sites are built with clean structure, technical SEO best practices, and bilingual content considerations to help customers find you online.",
                    "はい。検索エンジンに配慮した構造と技術的なSEO対策を基本として制作しています。"
                  )
                }
              ].map((faq, idx) => (
                <div key={idx} className="border-b rule pb-8 last:border-0 last:pb-0">
                  <h3 className="font-serif-display text-xl font-bold text-ink mb-3">{faq.q}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      {/* FOOTER SECTION =================================================== */}
      <footer className="py-12 border-t rule bg-surface-soft/10 text-xs w-full">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-ink-muted">
            &copy; 2026 Dan Burgess Design
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 -ml-2">
            <a href="#work" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("Work", "制作実績")}</a>
            <a href="#about" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("About", "私について")}</a>
            <a href="#services" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("Services", "サービス")}</a>
            <a href="#pricing" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("Pricing", "制作費の目安")}</a>
            <a href="#contact" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("Contact", "お問い合わせ")}</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-ink-muted">{t("SNS →", "SNS →")}</span>
            
            {/* Instagram */}
            <div className="relative group">
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
              
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+12px)] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-y-1 group-hover:translate-y-0">
                <div className="relative bg-ink text-surface text-[9px] font-mono uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-sm whitespace-nowrap shadow-2xl">
                  {t("SOME NATURE PHOTOS", "風景写真など")}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-ink rotate-45" />
                </div>
              </div>
            </div>

            {/* Blogger */}
            <div className="relative group">
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
              
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+12px)] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-y-1 group-hover:translate-y-0">
                <div className="relative bg-ink text-surface text-[9px] font-mono uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-sm whitespace-nowrap shadow-2xl">
                  {t("3D CG MADE BY ME", "3DCG作品")}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-ink rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;