export const KineticWordmark = () => {
  const Block = () => (
    <span className="font-serif-display font-semibold text-[14vw] lg:text-[12vw] tracking-tight leading-[0.85] whitespace-nowrap">
      <span className="text-ink/[0.07]">DAN</span>
      <span className="text-accent-brand/30">BURGESS</span>
      <span className="text-ink/[0.07]">DESIGN</span>
      <span className="text-ink/[0.07]">&nbsp;·&nbsp;</span>
    </span>
  );

  return (
    <div
      aria-hidden
      className="relative w-full overflow-hidden border-y rule py-4 select-none pointer-events-none"
    >
      <div className="flex w-max animate-marquee-h">
        {Array.from({ length: 6 }).map((_, i) => (
          <Block key={i} />
        ))}
      </div>
    </div>
  );
};
