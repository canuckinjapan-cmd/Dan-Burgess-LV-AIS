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
    title: "A neighborhood gym, engineered for sign-ups.",
    titleJp: "集客を最大化する、地域密着型ジムのWebサイト設計。",
    sector: "Fitness · Local Booking - Sample HP",
    sectorJp: "フィットネス・予約システム - サンプルHP",
    summary:
      "Repositioned a private Takasaki gym from an Instagram-only presence into a high-conversion landing site with bilingual booking, asymmetric editorial type, and a structured trial-class funnel tuned to local demographics.",
    summaryJp: "高崎市のプライベートジムを、Instagramのみの展開から、バイリンガルの予約機能、非対称なレイアウトのコンテンツ、そして地域の人口統計に合わせた体系的な体験レッスン誘導フローを備えた、コンバージョン率の高いランディングページへと再構築しました。",
    role: ["Strategy", "UX/UI", "Front-end", "Bilingual Copy"],
    roleJp: ["戦略策定", "UX/UIデザイン", "フロントエンド実装", "コピーライティング"],
    stack: ["Webflow", "GSAP", "Calendar API", "i18n"],
    outcomes: [
      { value: "+184%", label: "Trial bookings", jpLabel: "体験予約数" },
      { value: "2.3s", label: "LCP, mobile", jpLabel: "モバイル読込速度" },
      { value: "EN/JP", label: "Full parity", jpLabel: "完全多言語対応" },
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
    title: "Premium property listings, built for bilingual buyers.",
    titleJp: "国内外の買い手を繋ぐ、高級不動産プラットフォーム。",
    sector: "Real Estate · Property DB - Sample HP",
    sectorJp: "不動産・物件データベース - サンプルHP",
    summary:
      "Translated dense MLS-style data into an editorial property platform — generous typography, faceted search, and a content model that respects how Japanese and English buyers actually scan for homes.",
    summaryJp: "膨大な物件データを編集性の高い物件情報プラットフォームへと変換しました。ゆったりとした余白、検索、そして日本語と英語を扱う購入者が、実際に物件を探す大きな手助けとなります。",
    role: ["IA", "UX/UI", "Search UX", "Localization"],
    roleJp: ["情報設計", "UX/UIデザイン", "検索体験設計", "ローカライズ"],
    stack: ["Next.js", "Algolia", "Sanity", "Tailwind"],
    outcomes: [
      { value: "+62%", label: "Inquiry rate", jpLabel: "問い合わせ率" },
      { value: "8k+", label: "Listings indexed", jpLabel: "掲載物件数" },
      { value: "0", label: "JP/EN bugs at launch", jpLabel: "ローンチ時不具合" },
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
    title: "Cross-border auctions, simplified for global buyers.",
    titleJp: "国境を越えたオークション。世界中のバイヤーに、安心の購入体験を。",
    sector: "Automotive · E-commerce - Sample HP",
    sectorJp: "自動車・ECサイト - サンプルHP",
    summary:
      "An online storefront connecting overseas enthusiasts to Japan's domestic auction market. Complex logistics, customs and bidding flows compressed into a calm, confidence-building purchase experience.",
    summaryJp: "海外のJDMファンと日本の国内オークション市場を繋ぐECサイト。複雑な物流、通関、入札フローを整理し、ユーザーが安心して購入できるシンプルかつ信頼感のある購入体験を構築しました。",
    role: ["Product Strategy", "UI System", "Checkout UX"],
    roleJp: ["プロダクト戦略", "UIシステム設計", "チェックアウト体験"],
    stack: ["Framer", "Custom Liquid", "i18n"],
    outcomes: [
      { value: "4 mkts", label: "Shipping live", jpLabel: "配送対応市場" },
      { value: "+38%", label: "Repeat buyers", jpLabel: "リピート率" },
      { value: "🇬🇧 🇦🇺 🇺🇸", label: "Currency", jpLabel: "多通貨対応" },
    ],
    image: new URL("../assets/MacBook-Pro-indexbig.jpg", import.meta.url).href,
    mobileImage: new URL("../assets/iPhone-16-index.jpg", import.meta.url).href,
    tabletImage: new URL("../assets/iPad-index.jpg", import.meta.url).href,
    link: "https://www.danburgess.com/samples/jdm/",
  },
];

export const CaseStudies = () => {
  const { t, lang } = useLanguage();

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
            className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start"
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
                    <div className={`${(c.id === 'taka' || c.id === 'lumina' || c.id === 'apex') ? 'aspect-auto' : 'aspect-[16/10]'} overflow-hidden bg-surface-soft`}>
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
                          alt={`${t(c.client, c.clientJp)} — ${t(c.title, c.titleJp)}`}
                          loading="lazy"
                          className={`w-full ${(c.id === 'taka' || c.id === 'lumina' || c.id === 'apex') ? 'h-auto' : 'h-full'} object-cover object-top transition-transform duration-[20000ms] ease-in-out group-hover:scale-[1.03]`}
                        />
                      </picture>
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
                    <div className={`${(c.id === 'taka' || c.id === 'lumina' || c.id === 'apex') ? 'aspect-auto' : 'aspect-[16/10]'} overflow-hidden bg-surface-soft`}>
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
                          alt={`${t(c.client, c.clientJp)} — ${t(c.title, c.titleJp)}`}
                          loading="lazy"
                          className={`w-full ${(c.id === 'taka' || c.id === 'lumina' || c.id === 'apex') ? 'h-auto' : 'h-full'} object-cover object-top transition-transform duration-[20000ms] ease-in-out group-hover:scale-[1.03]`}
                        />
                      </picture>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Copy */}
            <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""} lg:pt-6`}>
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
                  <h3 className="font-serif-display text-3xl md:text-4xl font-semibold leading-[1.1] tracking-tight text-balance mb-5">
                    {t(c.title, c.titleJp)}
                  </h3>
                  <p className="text-ink-muted leading-relaxed mb-8 max-w-[52ch] group-hover/text:text-accent-brand transition-colors duration-300">
                    {t(c.summary, c.summaryJp)}
                  </p>
                </a>
              ) : (
                <>
                  <h3 className="font-serif-display text-3xl md:text-4xl font-semibold leading-[1.1] tracking-tight text-balance mb-5">
                    {t(c.title, c.titleJp)}
                  </h3>
                  <p className="text-ink-muted leading-relaxed mb-8 max-w-[52ch]">
                    {t(c.summary, c.summaryJp)}
                  </p>
                </>
              )}

              <dl className="grid grid-cols-3 gap-4 mb-8 border-y rule py-5">
                {c.outcomes.map((o) => (
                  <div key={o.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-1">
                      {t(o.label, o.jpLabel)}
                    </dt>
                    <dd className="font-serif-display text-2xl font-semibold tracking-tight">
                      {o.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="grid grid-cols-2 gap-6 text-[13px]">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-2">{t("Role", "役割")}</p>
                  <ul className="space-y-1">
                    {t(c.role, c.roleJp).map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-2">{t("Stack", "技術スタック")}</p>
                  <ul className="space-y-1">
                    {c.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
