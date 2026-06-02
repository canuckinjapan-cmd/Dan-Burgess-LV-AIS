import { motion } from "motion/react";
import { Instagram, Rss } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { KineticWordmark } from "@/components/KineticWordmark";
import { CaseStudies } from "@/components/CaseStudies";
import { ContactForm } from "@/components/ContactForm";
import { PortraitPlate } from "@/components/PortraitPlate";
import manga from "@/assets/danface_manga.svg";

import instagramLogo from "@/assets/Instagram-Logo.png";
import bloggerLogo from "@/assets/Blogger-Logo.png";
import { useLanguage } from "@/context/LanguageContext";

// Version 2.0.2 - Fixed responsive typography scaling and Polaroid layout proportions for landscape tablets

const Index = () => {
  const { t, lang } = useLanguage();
  const currentYear = new Date().getFullYear();

  const getSeasonDetails = () => {
    const today = new Date();
    const month = today.getMonth(); // 0-11 (Jan is 0, Dec is 11)
    const year = today.getFullYear();

    let seasonEn = "Spring";
    let seasonJp = "春号";
    let seasonIndex = 0; // 0 = Spring, 1 = Summer, 2 = Autumn, 3 = Winter
    let seasonYear = year;

    if (month >= 2 && month <= 4) {
      // Mar, Apr, May
      seasonEn = "Spring";
      seasonJp = "春号";
      seasonIndex = 0;
      seasonYear = year;
    } else if (month >= 5 && month <= 7) {
      // Jun, Jul, Aug
      seasonEn = "Summer";
      seasonJp = "夏号";
      seasonIndex = 1;
      seasonYear = year;
    } else if (month >= 8 && month <= 10) {
      // Sep, Oct, Nov
      seasonEn = "Autumn";
      seasonJp = "秋号";
      seasonIndex = 2;
      seasonYear = year;
    } else {
      // Dec, Jan, Feb
      seasonEn = "Winter";
      seasonJp = "冬号";
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
    { value: "30+", label: t("Years designing", "デザイン歴") },
    { value: "1992", label: t("Based in Japan", "来日年") },
    { value: "EN / JP", label: t("Native bilingual", "バイリンガル対応") },
    { value: "150+", label: t("Projects shipped", "完了プロジェクト") },
  ];

  const services = [
    {
      no: "S01",
      title: t("Bilingual Web Design", "バイリンガルWebデザイン"),
      body: t(
        "EN/JP websites that respect both audiences — typography, hierarchy and copy tuned for each language, not auto-translated afterthoughts.",
        "日本と海外、双方の視点を尊重したサイト制作。単なる自動翻訳ではなく、言語ごとのタイポグラフィ、情報階層、コピーライティングの最適化を徹底しています。"
      ),
      deliverables: t(
        ["Strategy & sitemap", "Design system", "EN + JP build"],
        ["戦略・サイトマップ", "デザインシステム", "日英サイト構築"]
      ),
    },
    {
      no: "S02",
      title: t("UI / Product Design", "UI / プロダクトデザイン"),
      body: t(
        "30 years of UI craft applied to apps, dashboards and SaaS — clear systems, confident states, accessible by default.",
        "30年の経験に裏打ちされたUI制作。アプリ、ダッシュボード、SaaSにおいて、明快なシステム、確固たるステート設計、アクセシビリティを標準としたプロダクトを提供します。"
      ),
      deliverables: t(
        ["UX audits", "Design systems", "Figma libraries"],
        ["UXオーディット", "デザインシステム", "Figmaライブラリ"]
      ),
    },
    {
      no: "S03",
      title: t("No-Code Development", "ノーコード開発"),
      body: t(
        "Webflow, Framer and modern stacks. Beautiful sites your team can actually update without filing a ticket.",
        "WebflowやFramerを活用した最新のスタック。エンジニアへの依頼なしで、チームが直感的に更新できる、美しく機能的なサイトを実現します。"
      ),
      deliverables: t(
        ["Webflow / Framer", "CMS modeling", "Editor handover"],
        ["Webflow / Framer実装", "CMS設計", "運用マニュアル"]
      ),
    },
    {
      no: "S04",
      title: t("Localization & Translation", "ローカライズ・翻訳"),
      body: t(
        "Born in Canada, working in Japan since 1992. I write and review the words too — so nothing reads like a machine translation.",
        "カナダ出身、1992年より日本で活動。自らコピーの執筆や監修を行うことで、機械翻訳とは一線を画す、文化に根ざした表現を追求しています。"
      ),
      deliverables: t(
        ["UI copy EN/JP", "Brand voice", "Cultural review"],
        ["日英UIコピー", "ブランドボイス設定", "文化的レビュー"]
      ),
    },
  ];

  const process = [
    { step: "01", title: t("Discover", "ヒアリング・調査"), body: t("Workshop, audit, audience and competitive read. We agree on the goal before pixels exist.", "ワークショップ、現状分析、ターゲット調査、競合比較。実制作の前に目標を明確に定めます。") },
    { step: "02", title: t("Design", "デザイン制作"), body: t("Editorial-grade visuals, design system, prototypes, and localization.", "高品質なビジュアル、デザインシステムの構築、プロトタイプ作成、そしてローカライズ対応を行います。") },
    { step: "03", title: t("Develop", "実装・開発"), body: t("Built in Webflow / Framer or modern stacks. Performance and SEO are a deliverable, not an afterthought.", "Webflow、Framer、または最新の技術スタックによる構築。パフォーマンスとSEOは標準の成果物です。") },
    { step: "04", title: t("Deploy & Support", "公開・運用保守"), body: t("Launch, analytics setup, training. Ongoing care plan available.", "サイト公開、分析ツールの設定、操作トレーニング、そして継続的なサポートを提供します。") },
  ];

  return (
    <div id="top" className="bg-paper text-ink min-h-dvh font-sans-body w-full overflow-x-hidden relative">
      <TopBar />

      <main id="main-content" className="w-full">
        {/* HERO ============================================================ */}
        <section id="hero" className="relative overflow-hidden w-full">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-12 md:landscape:pt-14 lg:pt-20 lg:landscape:pt-20 pb-16 md:landscape:pb-16 lg:pb-24 lg:landscape:pb-24">
          <div className="grid lg:grid-cols-12 md:landscape:grid-cols-12 lg:landscape:grid-cols-12 gap-10 lg:gap-12 lg:landscape:gap-12 md:landscape:gap-8 items-center">
            {/* Left column — masthead */}
            <motion.div 
              className="lg:col-span-8 md:landscape:col-span-8 lg:landscape:col-span-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted mb-8">
                <span className="size-1.5 rounded-full bg-accent-brand animate-pulse-dot" aria-hidden />
                <span>Issue №{seasonDetails.issueNo} · {t(`${seasonDetails.seasonEn} ${seasonDetails.seasonYear}`, `${seasonDetails.seasonYear}年 ${seasonDetails.seasonJp}`)}</span>
                <span className="h-px w-8 bg-ink/20" />
                <span>Fukuoka, JPN · UTC+9</span>
              </div>

              <h1 className="font-serif-display font-semibold tracking-[-0.02em] leading-[1.05] text-balance text-[3.25rem] sm:text-[4.5rem] md:landscape:text-[3.25rem] lg:landscape:text-[3.75rem] xl:text-[6.25rem] xl:landscape:text-[6.25rem] lg:text-[6.25rem]">
                {t(
                  <><span className="text-accent-brand font-medium">Bridging</span> Japanese<br />and Western digital<br />experiences.</>,
                  <span className="text-[0.8em] sm:text-[0.82em] leading-[1.1] block">
                    日本と欧米の<br className="hidden sm:inline" />デジタル体験の<br className="hidden sm:inline" /><span className="text-accent-brand font-medium">架け橋</span>となるデザインを。
                  </span>
                )}
              </h1>

              <p className="mt-8 md:landscape:mt-4 lg:mt-8 lg:landscape:mt-6 max-w-[58ch] text-lg md:landscape:text-base lg:landscape:text-lg xl:landscape:text-xl xl:text-xl lg:text-xl text-ink-muted leading-relaxed">
                {t(
                  <>I'm <span className="text-ink font-medium">Dan Burgess</span> — a Canadian designer living in Japan since 1992, and based in Fukuoka. For three decades I've helped founders and teams ship websites, UI and product experiences that read beautifully in both English and Japanese, and convert in either market.</>,
                  <>私は<span className="text-ink font-medium">ダン・バージェス</span>です。1992年から日本に住んでいるカナダ人デザイナーで、現在は福岡を拠点に活動しています。過去30年にわたり、私は起業家やチームが、英語と日本語の両方で美しく読みやすく、どちらの市場でもコンバージョンにつながるウェブサイト、UI、およびプロダクト体験をリリースできるよう支援してきました。</>
                )}
              </p>

              <div className="mt-10 md:landscape:mt-6 lg:mt-10 lg:landscape:mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 bg-ink text-surface px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.22em] hover:bg-accent-brand transition-colors"
                >
                  {t("Start a Project", "プロジェクトを開始する")}
                  <span className="text-[22px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center gap-3 px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink hover:text-accent-brand transition-all border-2 border-ink/40 hover:border-accent-brand hover:bg-white/40 shadow-sm"
                >
                  {t("See Selected Work", "制作事例を見る")}
                </a>
              </div>
            </motion.div>

            {/* Right column — manga portrait card & stats */}
            <motion.aside 
              className="lg:col-span-4 md:landscape:col-span-4 lg:landscape:col-span-4 lg:mt-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="flex flex-col sm:grid sm:grid-cols-2 md:landscape:flex md:landscape:flex-col lg:flex lg:flex-col gap-6 sm:gap-12 md:landscape:gap-0 lg:gap-0 items-center">
                
                {/* Stats (Hidden on lg and md:landscape, visible < lg) */}
                <dl className="order-2 sm:order-1 lg:hidden md:landscape:hidden grid grid-cols-4 sm:grid-cols-2 gap-x-2 sm:gap-x-12 gap-y-7 w-full">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <dt className="font-serif-display text-xl sm:text-4xl font-semibold tracking-tight leading-none text-ink">
                        {s.value}
                      </dt>
                      <dd className="mt-1.5 sm:mt-3 font-mono text-[6px] sm:text-[10px] uppercase tracking-[0.14em] text-ink-muted leading-tight">
                        {s.label}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Polaroid Card (Top on mobile, Right on sm+, Top on lg+) */}
                <motion.div 
                  whileHover={{ rotate: 2 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="order-1 sm:order-2 w-full md:landscape:max-w-[240px] lg:max-w-none lg:landscape:max-w-[280px] xl:landscape:max-w-none relative bg-surface-elevated border rule p-4 sm:p-6 md:landscape:p-4 lg:p-6 lg:landscape:p-4 xl:landscape:p-6 shadow-[0_30px_80px_-40px_hsl(var(--ink)/0.3)] cursor-pointer animate-fade-in"
                >
                  <div className="flex items-center justify-between font-mono text-[8px] md:landscape:text-[8px] lg:text-[10px] lg:landscape:text-[8px] xl:landscape:text-[10px] uppercase tracking-widest text-ink-muted mb-3 md:landscape:mb-2 lg:landscape:mb-3 xl:mb-4">
                    <span>Plate 01</span>
                    <span className="flex items-center gap-1.5 lg:gap-2">
                       <span className="size-1 rounded-full lg:size-1.5 bg-accent-brand animate-pulse-dot" />
                      {t("Accepting Q3", "Q3 プロジェクト受付中")}
                    </span>
                  </div>
                  <PortraitPlate />
                  <div className="mt-3 md:landscape:mt-2 lg:landscape:mt-3 xl:mt-5 flex items-baseline justify-between gap-2 pt-3 md:landscape:pt-2 lg:landscape:pt-3 xl:pt-4 border-t rule">
                    <div>
                      <p className="text-xl md:landscape:text-base lg:landscape:text-lg xl:text-2xl leading-none" style={{ fontFamily: '"Homemade Apple", cursive' }}>Dan Burgess</p>
                      <p className="font-mono text-[8px] md:landscape:text-[8px] lg:text-[10px] lg:landscape:text-[8px] xl:landscape:text-[10px] uppercase tracking-widest text-ink-muted mt-1">
                        {t("Designer · デザイナー", "デザイナー · Designer")}
                      </p>
                    </div>
                    <p className="font-mono text-[8px] md:landscape:text-[8px] lg:text-[10px] lg:landscape:text-[8px] xl:landscape:text-[10px] uppercase tracking-widest text-ink-muted text-right leading-relaxed shrink-0">
                      🍁 → 🇯🇵<br />
                      {t("Since '92", "92年から活動")}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.aside>
          </div>
        </div>

        {/* Stat strip - Hidden on mobile/tablet as they move up next to portrait */}
        <motion.div 
          className="border-y rule bg-surface-soft/40 hidden lg:block md:landscape:block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <dl className="max-w-[1320px] mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 md:landscape:grid-cols-4 lg:landscape:grid-cols-4 divide-x divide-y lg:divide-y-0 md:landscape:divide-y-0 lg:landscape:divide-y-0 rule">
            {stats.map((s, i) => (
              <div key={s.label} className={`px-6 py-7 md:landscape:py-5 lg:py-9 lg:landscape:py-9 ${i === 0 ? "border-l-0" : ""}`}>
                <dt className="font-serif-display text-4xl md:landscape:text-3xl lg:text-5xl lg:landscape:text-5xl font-semibold tracking-tight leading-none">
                  {s.value}
                </dt>
                <dd className="mt-3 md:landscape:mt-2 lg:landscape:mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Kinetic wordmark */}
        <KineticWordmark />
      </section>

      {/* WORK ============================================================ */}
      <section id="work" className="py-24 lg:py-32 w-full overflow-x-hidden relative">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <header className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-24">
            <div className="lg:col-span-3">
              <p className="font-mono font-bold text-[16px] uppercase tracking-[0.22em] text-accent-brand mb-3">
                §01 — {t("Selected Work", "制作事例")}
              </p>
            </div>
            <div className="lg:col-span-9">
              <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.05] text-balance">
                {t(
                  <>Three projects, three industries — one approach to <em className="italic text-accent-brand font-medium">bilingual</em> craft.</>,
                  <>3つのプロジェクト、3つの業界。一貫した<em className="italic text-accent-brand font-medium">バイリンガル</em>の造形美。</>
                )}
              </h2>
              <p className="mt-6 max-w-[60ch] text-ink-muted text-lg leading-relaxed">
                {t(
                  "Every engagement begins with the audience and ends with measurable outcomes. Here's a closer look at recent work.",
                  "すべてのプロジェクトはオーディエンスの理解から始まり、測定可能な成果へと繋がります。最近の活動の一部をご紹介します。"
                )}
              </p>
            </div>
          </header>

          <CaseStudies />
        </div>
      </section>

      {/* ABOUT =========================================================== */}
      <section id="about" className="py-24 lg:py-32 border-t rule bg-surface-soft/30 w-full overflow-x-hidden relative">
        <motion.div 
          className="max-w-[1320px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="lg:col-span-3">
            <p className="font-mono font-bold text-[16px] uppercase tracking-[0.22em] text-accent-brand mb-3">
              §02 — {t("About", "プロフィール")}
            </p>
            <h2 className="font-serif-display text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.05] mb-6">
              {t("A 30-year route from Victoria to Fukuoka.", "ビクトリアから福岡への30年の道のり。")}
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              {t("SINCE 1992 · JAPAN", "1992年より · 日本拠点")}
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-5">
            <p className="drop-cap text-lg leading-[1.7] text-ink/85 mb-6">
              {t(
                "Trained in Canada in print and multimedia, I crossed the Pacific in 1992 and never really went back. Three decades later, I'm still here — designing for Japanese teams who want to reach the world, and for global teams who need to land properly in Japan.",
                "カナダでデザインを学び、1992年に来日し、日本を拠点に活動を続けています。30年後の今も、世界を目指す日本のチームや、日本市場への展開を狙うグローバル企業のパートナーとしてデザインを提供しています。"
              )}
            </p>
            <p className="text-ink-muted leading-relaxed mb-6">
              {t(
                "The work has changed shape over the years — magazine layouts, sign design in Canada, Windows game localization in Nagano, documentation localization and UI production in Tokyo, and now bilingual websites and product design for founders and growing companies. The throughline is the same: design that respects both cultures it lives in.",
                "長年の間に仕事の形は進化してきました。カナダでの雑誌や看板のデザイン、長野でのWindowsゲームのローカライズ、東京でのドキュメントのローカライズやUI制作を経て、現在は起業家や成長企業向けのバイリンガルWebサイトやプロダクトデザインを手がけています。一貫しているのは、両方の文化を尊重するデザインです。"
              )}
            </p>
            <p className="text-ink-muted leading-relaxed">
              {t(
                "I work directly with clients, not through layers. You get a senior designer with three decades of taste, technical chops, and a healthy appetite for projects with stakes.",
                "私は代理店を介さず、クライアントと直接対話します。30年の経験が培った審美眼と技術力、そして難易度の高い課題に立ち向かう情熱を、あなたのプロジェクトに注ぎ込みます。"
              )}
            </p>

            <ol className="mt-12 space-y-6 border-l rule pl-6">
              {[
                { y: "1992", t: t("Moved to Japan", "来日"), b: t("Taught English and started translation in Nagano.", "長野にて英語講師を務めつつ翻訳を開始。") },
                { y: "1994", t: t("Localization & UI", "ローカライズ・UI制作"), b: t("Windows game and website localization.", "Windows向けゲームや初期のWebサイトのローカライズに従事。") },
                { y: "2004", t: t("Tokyo · Fortune 500 HQ", "都内のグローバル企業拠点"), b: t("Localization and UI production for global tech.", "大手精密機器メーカーの本社にてローカライズ・UI制作を担当。") },
                { y: "2010", t: t("Independent Studio", "スタジオ設立"), b: t("Bilingual websites, UI, no-code, for founders and teams.", "翻訳、日英サイト、UI、ノーコード開発を軸に独立。") },
              ].map((m) => (
                <li key={m.y} className="relative group transition-transform duration-500 ease-in-out hover:scale-[1.02] origin-left cursor-default">
                  <span className="absolute -left-[1.65rem] top-2 size-2 bg-accent-brand rounded-full transition-transform group-hover:scale-125" aria-hidden />
                  <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">{m.y}</p>
                  <p className="font-serif-display text-xl font-semibold mt-1 transition-colors group-hover:text-accent-brand">{m.t}</p>
                  <p className="text-ink-muted text-sm mt-1">{m.b}</p>
                </li>
              ))}
            </ol>
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
              <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.05] text-balance">
                {t(
                  <>What I do, when I'm not <em className="italic text-accent-brand font-medium">drawing manga selfies</em>.</>,
                  <>プロフェッショナルな提供サービス。<br /><em className="italic text-accent-brand font-medium">マンガ風の自画像</em>を描く以外のこと。</>
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
                <h3 className="font-serif-display text-2xl lg:text-3xl font-semibold tracking-tight mb-4">
                  {s.title}
                </h3>
                <p className="text-ink-muted leading-relaxed mb-6 max-w-[42ch]">{s.body}</p>
                <ul className="flex flex-wrap gap-2" aria-label={t("Deliverables", "成果物")}>
                  {s.deliverables.map((d) => (
                    <li
                      key={d}
                      className="font-mono text-[10px] uppercase tracking-widest border rule px-2.5 py-1 text-ink-muted"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PROCESS ========================================================= */}
      <section id="process" className="py-24 lg:py-32 border-t rule bg-surface-soft/30 w-full overflow-x-hidden relative">
        <motion.div 
          className="max-w-[1320px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="lg:col-span-3">
            <p className="font-mono font-bold text-[16px] uppercase tracking-[0.22em] text-accent-brand mb-3">
              §04 — {t("Process", "プロセス")}
            </p>
            <h2 className="font-serif-display text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.05]">
              {t("Calm, predictable, milestone-based.", "堅実で円滑な。マイルストーン重視の進行。")}
            </h2>
          </div>
          <ol className="lg:col-span-9 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border rule">
            {process.map((p) => (
              <li key={p.step} className="bg-surface p-6 lg:p-7 hover:bg-surface-elevated transition-colors group">
                <div className="flex justify-between items-start mb-3">
                  <p className="font-mono text-[22px] uppercase tracking-widest text-accent-brand">
                    {p.step}
                  </p>
                  <span className="font-mono text-[22px] uppercase tracking-widest text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
                <h3 className="font-serif-display text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{p.body}</p>
              </li>
            ))}
          </ol>
        </motion.div>
      </section>

      {/* CONTACT ========================================================= */}
      <section id="contact" className="py-24 lg:py-32 border-t rule w-full overflow-x-hidden relative">
        <motion.div 
          className="max-w-[1320px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="lg:col-span-5">
            <p className="font-mono font-bold text-[16px] uppercase tracking-[0.22em] text-accent-brand mb-4">
              §05 — {t("Contact", "お問い合わせ")}
            </p>
            <h2 className="font-serif-display text-4xl md:text-5xl lg:text-[3.75rem] font-semibold tracking-[-0.02em] leading-[1.02] text-balance">
              {t(
                <>Have a project that needs to land in <em className="italic text-accent-brand font-medium">two languages?</em></>,
                <>2つの言語で展開するプロジェクトを<br /><em className="italic text-accent-brand font-medium">お考えですか？</em></>
              )}
            </h2>
            <p className="mt-6 text-ink-muted text-lg leading-relaxed max-w-[44ch]">
              {t(
                "Send a short brief — goals, audience, timeline. I read every message personally and reply within 1–2 business days (JST).",
                "プロジェクトの概要（目標、ターゲット、希望納期）をご記入ください。すべてのメッセージに目を通し、1〜2営業日以内に返信いたします。"
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
                  {t("Accepting Q3 Projects", "Q3 プロジェクト受付中")}
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7 bg-surface-elevated border rule p-7 lg:p-10 shadow-[0_30px_80px_-40px_hsl(var(--ink)/0.25)]">
            <ContactForm />
          </div>
        </motion.div>
      </section>

      {/* FAQ SECTION (AEO/AIO Direct Answer Layout) ====================== */}
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
              §06 — {t("FAQ & Insights", "よくある質問と方針")}
            </p>
            <h2 className="font-serif-display text-4xl font-semibold tracking-[-0.02em] leading-[1.1]">
              {t("Direct answers for search engines and strategic minds.", "検索・AIエンジンのための、簡潔で明確な回答方針。")}
            </h2>
            <p className="mt-6 text-ink-muted text-sm leading-relaxed max-w-[32ch]">
              {t(
                "In the era of AI-driven search (GEO/AEO), transparency and highly concise answers optimize for featured snippets and LLM citations. Here is how I operate.",
                "AIによる要約検索 (GEO/AEO) 時代において、明確で簡潔な直接の回答はWeb上での引用を最適化します。私のアプローチと方針をまとめました。"
              )}
            </p>
          </div>

          <div className="lg:col-span-8 space-y-12">
            {[
              {
                q: t("How do you handle Japanese and English layout differences?", "日本語と英語のレイアウトの違いにはどのように対応しますか？"),
                a: t(
                  "I design bilingual websites with custom responsive font scales, adjusted tracking, and language-specific CSS to ensure the visual weight remains identical across markets. I do not rely on machine-translated templates; instead, every headline and line-height is hand-crafted to respect character density differences.",
                  "日本語と英語では文字の密度や長さが異なるため、カスタムフォントスケールやトラッキング、言語ごとのCSS調整を行い、どの言語でも均等な美しさを保ちます。安易な自動翻訳テンプレートに頼らず、文字の密度に合わせて行間や見出しを手動で微調整しています。"
                )
              },
              {
                q: t("What technologies do you leverage for bilingual web projects?", "多言語Webプロジェクトではどのような技術を使用しますか？"),
                a: t(
                  "I build with high-performance modern web stacks including Webflow, Framer, and custom React architectures coupled with headless CMS engines like Sanity. Every site features clean semantic HTML, lazy-loaded vector files, and strict Core Web Vitals optimizations for maximum performance.",
                  "WebflowやFramer、およびヘッドレスCMS（Sanityなど）を組み合わせた高性能なReact構成から、ご要望に応じたスタックを選定します。クリーンなセマンティックHTML、軽量化されたベクター(SVG)アセット、および厳格なCore Web Vitals対策を標準装備しています。"
                )
              },
              {
                q: t("How long does a typical bilingual web design project take?", "一般的なバイリンガルWebデザインプロジェクトの制作期間はどのくらいですか？"),
                a: t(
                  "A comprehensive bilingual design and development project typically takes 4 to 8 weeks to complete from the discovery workshop to deployment. This timeline depends on the content model complexity, bilingual copy-editing requirements, and search engine optimization configurations.",
                  "共通理解を深めるワークショップから最終公開まで、一般的なプロジェクトでは4〜8週間をいただいております。この期間はコンテンツの複雑さ、日欧の翻訳・コピー監修の範囲、およびSEO/AEOの構成レベルによって決定されます。"
                )
              },
              {
                q: t("Are your localized websites optimized for local and global search engines?", "ローカライズされたWebサイトは国内外の検索エンジンに最適化されていますか？"),
                a: t(
                  "Yes, every bilingual site is deployed with strict multi-lingual SEO parameters, canonical styling, high-accuracy JSON-LD schemas, and crawlable site structure. This ensures high search rankings on Google, Bing, and maximum accessibility for emerging generative AI agents like Perplexity and ChatGPT.",
                  "はい。多言語SEOの設定、カノニカルタグ、高精度なJSON-LD構造化データ、クローラブルな階層構造を徹底して構築します。GoogleやBingなどの一般検索に加え、PerplexityやChatGPTといった最新の対話型AIエンジンからの参照・引用も容易にします。"
                )
              }
            ].map((faq, idx) => (
              <article key={idx} className="border-b rule pb-8 last:border-b-0 last:pb-0">
                <h3 className="font-serif-display text-xl sm:text-2xl font-semibold tracking-tight text-ink mb-3">
                  {faq.q}
                </h3>
                <p className="text-ink-muted leading-relaxed text-base max-w-[65ch]">
                  {faq.a}
                </p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      </main>

      {/* FOOTER ========================================================== */}
      <footer className="border-t rule">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
          <div className="flex items-center gap-3">
            <img
              src={manga}
              alt=""
              className="w-7 h-7 rounded-full bg-white"
              style={{ imageRendering: "-webkit-optimize-contrast", transform: "translateZ(0)" }}
              loading="lazy"
            />
            <span>© {currentYear} Dan Burgess Design</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 -ml-2">
            <a href="#work" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("Work", "制作事例")}</a>
            <a href="#about" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("About", "プロフィール")}</a>
            <a href="#services" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("Services", "サービス")}</a>
            <a href="#process" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("Process", "プロセス")}</a>
            <a href="#contact" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("Contact", "お問い合わせ")}</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-ink-muted">{t("MY SOCIALS →", "自分のSNS→")}</span>
            
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
              
              {/* Tooltip Balloon */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+12px)] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-y-1 group-hover:translate-y-0">
                <div className="relative bg-ink text-surface text-[9px] font-mono uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-sm whitespace-nowrap shadow-2xl">
                  {t("SOME NATURE PHOTOS", "自作自然の写真")}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-ink rotate-45" />
                </div>
              </div>
            </div>

            {/* Blogspot */}
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
              
              {/* Tooltip Balloon */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+12px)] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-y-1 group-hover:translate-y-0">
                <div className="relative bg-ink text-surface text-[9px] font-mono uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-sm whitespace-nowrap shadow-2xl">
                  {t("3D CG MADE BY ME", "自作の3DCG作例")}
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
