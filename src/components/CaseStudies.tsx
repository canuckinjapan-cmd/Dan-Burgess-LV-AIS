import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface CaseStudy {
  id: string;
  index: string;
  year: string;
  client: string;
  clientJp: string;
  title: string;
  titleJp: string;
  sector: string;
  sectorJp: string;
  summary: string;
  summaryJp: string;
  role: string[];
  roleJp: string[];
  stack: string[];
  outcomes: { value: string; label: string; jpLabel: string }[];
  image: string;
  jpImage?: string;
  mobileImage?: string;
  jpMobileImage?: string;
  tabletImage?: string;
  jpTabletImage?: string;
  accent?: boolean;
  link?: string;
  jpLink?: string;
}

const cases: CaseStudy[] = [
  {
    id: "taka",
    index: "01",
    year: "2025",
    client: "Takasaki Fitness",
    clientJp: "高崎フィットネス",
    title: "A local gym website designed to increase class bookings and memberships.",
    titleJp: "入会予約を増やすための地域密着型ジムサイト",
    sector: "Fitness · Local Booking - Sample HP",
    sectorJp: "フィットネス・予約システム - サンプルHP",
    summary:
      "Helping a neighborhood gym build a stronger online presence with a welcoming bilingual website and a simple class booking system.",
    summaryJp: "地域のジムがオンラインで新規会員を獲得できるよう、親しみやすいデザインとシンプルな予約システムを備えたWebサイトを制作。",
    role: ["Strategy", "UX/UI", "Front-end", "Bilingual Copy"],
    roleJp: ["戦略策定", "UX/UIデザイン", "フロントエンド実装", "コピーライティング"],
    stack: ["Webflow", "GSAP", "Calendar API", "i18n"],
    outcomes: [
      { value: "+184%*", label: "Est. booking increase", jpLabel: "体験予約数（想定）" },
      { value: "2.3s*", label: "Est. mobile load time", jpLabel: "モバイル読込速度（想定）" },
      { value: "EN/JP", label: "Bilingual support", jpLabel: "多言語翻訳対応" },
    ],
    image: new URL("../assets/Taka-PCbig-E.jpg", import.meta.url).href,
    jpImage: new URL("../assets/Taka-PCbig-J.jpg", import.meta.url).href,
    mobileImage: new URL("../assets/Taka-phone-E.jpeg", import.meta.url).href,
    jpMobileImage: new URL("../assets/Taka-phone-J.jpeg", import.meta.url).href,
    tabletImage: new URL("../assets/Taka-tablet-E.jpeg", import.meta.url).href,
    jpTabletImage: new URL("../assets/Taka-tablet-J.jpeg", import.meta.url).href,
    accent: true,
    link: `${import.meta.env.BASE_URL}samples/gym01/index.html?lang=en`.replace(/\/+/g, '/'),
    jpLink: `${import.meta.env.BASE_URL}samples/gym01/index.html?lang=ja`.replace(/\/+/g, '/'),
  },
  {
    id: "lumina",
    index: "02",
    year: "2024",
    client: "Rural Japan Living",
    clientJp: "不動産",
    title: "Premium property listings designed for overseas buyers.",
    titleJp: "海外購入者向けに設計した不動産検索サイト",
    sector: "Real Estate · Property DB - Sample HP",
    sectorJp: "不動産・物件データベース - サンプルHP",
    summary:
      "Turning complex property data into a clean, easy-to-use website that helps both Japanese and international buyers find homes with confidence.",
    summaryJp: "複雑な不動産情報を整理し、日本国内外の利用者が物件を探しやすい構成にまとめました。",
    role: ["IA", "UX/UI", "Search UX", "Localization"],
    roleJp: ["情報設計", "UX/UIデザイン", "検索体験設計", "ローカライズ"],
    stack: ["Next.js", "Algolia", "Sanity", "Tailwind"],
    outcomes: [
      { value: "+62%*", label: "Est. inquiry increase", jpLabel: "問い合わせ率（想定）" },
      { value: "8k+", label: "Sample listings", jpLabel: "サンプル掲載物件数" },
      { value: "0*", label: "Est. error rate", jpLabel: "エラー発生率（想定）" },
    ],
    image: new URL("../assets/Real01-PCbig-E.jpg", import.meta.url).href,
    jpImage: new URL("../assets/Real01-PCbig-J.jpg", import.meta.url).href,
    mobileImage: new URL("../assets/Real01-phone-E.jpg", import.meta.url).href,
    jpMobileImage: new URL("../assets/Real01-phone-J.jpg", import.meta.url).href,
    tabletImage: new URL("../assets/Real01-tablet-E.jpeg", import.meta.url).href,
    jpTabletImage: new URL("../assets/Real01-tablet-J.jpeg", import.meta.url).href,
    link: `${import.meta.env.BASE_URL}samples/real-estate01/index.html?lang=en`.replace(/\/+/g, '/'),
    jpLink: `${import.meta.env.BASE_URL}samples/real-estate01/index.html?lang=ja`.replace(/\/+/g, '/'),
  },
  {
    id: "apex",
    index: "03",
    year: "2026",
    client: "JDM RETRO RIDES",
    clientJp: "自動車の輸出",
    title: "Making Japanese vehicle auctions accessible to global buyers.",
    titleJp: "日本の中古車オークションを海外ユーザーにもっと身近に",
    sector: "Automotive · E-commerce - Sample HP",
    sectorJp: "自動車・ECサイト - サンプルHP",
    summary:
      "A streamlined online shop that simplifies bidding, paperwork, and shipping for customers buying vehicles from Japan.",
    summaryJp: "入札から輸出手続きまでを分かりやすく整理し、海外からでも安心して利用できる購入体験を実現。",
    role: ["Product Strategy", "UI System", "Checkout UX"],
    roleJp: ["プロダクト戦略", "UIシステム設計", "チェックアウト体験"],
    stack: ["Framer", "Custom Liquid", "i18n"],
    outcomes: [
      { value: "4 mkts", label: "Sample markets", jpLabel: "サンプル対象市場" },
      { value: "+38%*", label: "Est. repeat buyers", jpLabel: "リピート率（想定）" },
      { value: "🇬🇧 🇦🇺 🇺🇸", label: "Supported currencies", jpLabel: "対応通貨" },
    ],
    image: new URL("../assets/MacBook-Pro-indexbig.jpg", import.meta.url).href,
    mobileImage: new URL("../assets/iPhone-16-index.jpg", import.meta.url).href,
    tabletImage: new URL("../assets/iPad-index.jpg", import.meta.url).href,
    link: "https://www.danburgess.com/samples/jdm/",
  },
];

export const CaseStudies = () => {
  const { t, lang } = useLanguage();
  const [showInstaOverlay, setShowInstaOverlay] = useState(false);
  const takaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = takaRef.current;
    if (!element) return;

    let timeoutId: any;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowInstaOverlay(true);
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              setShowInstaOverlay(false);
            }, 1500);
          } else {
            setShowInstaOverlay(false);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="space-y-24 lg:space-y-32">
      {cases.map((c, i) => {
        const reverse = i % 2 === 1;
        const currentLink = lang === 'JP' && c.jpLink ? c.jpLink : c.link;
        const currentImage = lang === 'JP' && c.jpImage ? c.jpImage : c.image;
        const currentMobileImage = lang === 'JP' && c.jpMobileImage ? c.jpMobileImage : c.mobileImage;
        const currentTabletImage = lang === 'JP' && c.jpTabletImage ? c.jpTabletImage : c.tabletImage;

        return (
          <article
            key={c.id}
            ref={c.id === 'taka' ? takaRef : undefined}
            className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center"
          >
            {/* Image */}
            <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
              {currentLink ? (
                <a 
                  href={currentLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block relative group cursor-pointer"
                >
                  <div className="absolute -inset-px bg-gradient-to-br from-accent-brand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
                  <div className="relative bg-white p-2 sm:p-3 border rule shadow-[0_30px_60px_-30px_hsl(var(--ink)/0.25)]">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink-muted px-2 py-1.5">
                      <span>{c.index} / {t(c.client, c.clientJp)}</span>
                      <span>{c.year}</span>
                    </div>
                    <div className={`${(c.id === 'taka' || c.id === 'lumina' || c.id === 'apex') ? 'aspect-auto' : 'aspect-[16/10]'} relative overflow-hidden bg-surface-soft`}>
                      <picture>
                        {currentMobileImage && (
                          <source
                            media="(max-width: 639px) and (orientation: portrait)"
                            srcSet={currentMobileImage}
                          />
                        )}
                        {currentTabletImage && (
                          <source
                            media="(min-width: 640px) and (max-width: 1023px) and (orientation: portrait)"
                            srcSet={currentTabletImage}
                          />
                        )}
                        <img
                          src={currentImage}
                          alt={`${t(c.client, c.clientJp)} - ${t(c.title, c.titleJp)}`}
                          loading="lazy"
                          className={`w-full ${(c.id === 'taka' || c.id === 'lumina' || c.id === 'apex') ? 'h-auto' : 'h-full'} object-cover object-top transition-transform duration-[20000ms] ease-in-out group-hover:scale-[1.03]`}
                        />
                      </picture>
                      {c.id === 'taka' && (
                        <>
                          <div 
                            className={`absolute inset-0 bg-black/50 transition-opacity duration-500 pointer-events-none z-[5] ${
                              showInstaOverlay ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`} 
                          />
                          <div 
                            className={`absolute inset-0 z-10 pointer-events-none transition-all duration-500 ease-in-out ${
                              showInstaOverlay 
                                ? "opacity-100 scale-100" 
                                : "opacity-0 scale-[0.98] group-hover:opacity-100 group-hover:scale-100"
                            }`}
                          >
                            <img 
                              src={`${import.meta.env.BASE_URL}samples/gym01/Profile-half.png`.replace(/\/+/g, '/')}
                              alt="Takasaki Fitness Profile Overlay"
                              className="h-full mr-0 ml-auto object-contain block"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </a>
              ) : (
                <div className="relative group">
                  <div className="absolute -inset-px bg-gradient-to-br from-accent-brand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
                  <div className="relative bg-white p-2 sm:p-3 border rule shadow-[0_30px_60px_-30px_hsl(var(--ink)/0.25)]">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink-muted px-2 py-1.5">
                      <span>{c.index} / {t(c.client, c.clientJp)}</span>
                      <span>{c.year}</span>
                    </div>
                    <div className={`${(c.id === 'taka' || c.id === 'lumina' || c.id === 'apex') ? 'aspect-auto' : 'aspect-[16/10]'} relative overflow-hidden bg-surface-soft`}>
                      <picture>
                        {currentMobileImage && (
                          <source
                            media="(max-width: 639px) and (orientation: portrait)"
                            srcSet={currentMobileImage}
                          />
                        )}
                        {currentTabletImage && (
                          <source
                            media="(min-width: 640px) and (max-width: 1023px) and (orientation: portrait)"
                            srcSet={currentTabletImage}
                          />
                        )}
                        <img
                          src={currentImage}
                          alt={`${t(c.client, c.clientJp)} - ${t(c.title, c.titleJp)}`}
                          loading="lazy"
                          className={`w-full ${(c.id === 'taka' || c.id === 'lumina' || c.id === 'apex') ? 'h-auto' : 'h-full'} object-cover object-top transition-transform duration-[20000ms] ease-in-out group-hover:scale-[1.03]`}
                        />
                      </picture>
                      {c.id === 'taka' && (
                        <>
                          <div 
                            className={`absolute inset-0 bg-black/50 transition-opacity duration-500 pointer-events-none z-[5] ${
                              showInstaOverlay ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`} 
                          />
                          <div 
                            className={`absolute inset-0 z-10 pointer-events-none transition-all duration-500 ease-in-out ${
                              showInstaOverlay 
                                ? "opacity-100 scale-100" 
                                : "opacity-0 scale-[0.98] group-hover:opacity-100 group-hover:scale-100"
                            }`}
                          >
                            <img 
                              src={`${import.meta.env.BASE_URL}samples/gym01/Profile-half.png`.replace(/\/+/g, '/')}
                              alt="Takasaki Fitness Profile Overlay"
                              className="h-full mr-0 ml-auto object-contain block"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Copy */}
            <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-5">
                <span className="text-accent-brand">{c.index}</span>
                <span className="h-px w-8 bg-ink/20" />
                <span>{t(c.sector, c.sectorJp)}</span>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-2">
                {t(`${c.client} · ${c.clientJp}`, `${c.clientJp} · ${c.client}`)}
              </p>
              
              {currentLink ? (
                <a 
                  href={currentLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block group/text transition-colors duration-300 hover:text-accent-brand"
                >
                  <h3 className="font-serif-display text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight text-balance mb-5">
                    {t(c.title, c.titleJp)}
                  </h3>
                  <p className="text-ink-muted leading-relaxed mb-8 max-w-[52ch] group-hover/text:text-accent-brand transition-colors duration-300">
                    {t(c.summary, c.summaryJp)}
                  </p>
                </a>
              ) : (
                <>
                  <h3 className="font-serif-display text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight text-balance mb-5">
                    {t(c.title, c.titleJp)}
                  </h3>
                  <p className="text-ink-muted leading-relaxed mb-8 max-w-[52ch]">
                    {t(c.summary, c.summaryJp)}
                  </p>
                </>
              )}

              <dl className="grid grid-cols-3 gap-4 border-t rule pt-5">
                {c.outcomes.map((o) => (
                  <div key={o.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-1">
                      {t(o.label, o.jpLabel)}
                    </dt>
                    <dd className="font-serif-display text-2xl font-bold tracking-tight">
                      {o.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="text-[10px] font-mono text-ink-muted/70 italic mt-2 mb-6 border-b rule pb-5">
                * {t("Potential results based on website optimization and redesign.", "ウェブサイト最適化およびリニューアルによる想定の成果")}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
};
