import { useEffect, useRef, useState } from "react";

export const PortraitPlate = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState<"photo" | "manga">("photo");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setPhase("photo");
            setCycle((c) => c + 1);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setPhase("manga"), 2000);
    return () => window.clearTimeout(t);
  }, [cycle]);

  return (
    <div ref={ref} className="relative aspect-square bg-surface-soft overflow-hidden">
      <div
        className="absolute inset-6 border border-dashed border-ink/15 rounded-full animate-spin-slow"
        aria-hidden
      />
      <img
        key={`photo-${cycle}`}
        src="https://www.danburgess.com/2026-assets/DJB-headshot01.jpg"
        alt="Photo portrait of Dan Burgess"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        style={{ opacity: phase === "photo" ? 1 : 0 }}
        loading="eager"
      />
      <img
        key={`manga-${cycle}`}
        src="https://www.danburgess.com/2026-assets/danface_manga-2025.png"
        alt="Manga-style self portrait of Dan Burgess"
        className="relative w-full h-full object-contain p-6 transition-opacity duration-700 ease-in-out"
        style={{ 
          opacity: phase === "manga" ? 1 : 0,
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        }}
        loading="eager"
      />
      <span
        className="absolute bottom-4 right-4 size-3 bg-accent-brand rotate-45 border-2 border-surface-elevated z-10"
        aria-hidden
      />
    </div>
  );
};
