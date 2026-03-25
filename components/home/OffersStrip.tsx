import type { Offer } from "@/types";

export default function OffersStrip({ offers }: { offers: Offer[] }) {
  if (offers.length === 0) return null;

  const items = [...offers, ...offers, ...offers];

  return (
    <div
      className="w-full overflow-hidden relative"
      style={{
        borderTop: "1px solid rgba(59,130,246,0.2)",
        borderBottom: "1px solid rgba(59,130,246,0.2)",
        background: "rgba(59,130,246,0.03)",
      }}
    >
      {/* Fade masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #06080f, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, #06080f, transparent)" }}
      />

      <div className="flex animate-marquee gap-0 py-3" style={{ width: "max-content" }}>
        {items.map((offer, i) => (
          <div
            key={`${offer.id}-${i}`}
            className="flex items-center gap-3 px-8"
            style={{ borderRight: "1px solid rgba(59,130,246,0.12)" }}
          >
            <span
              className="px-2 py-0.5 text-[10px] font-black tracking-[0.25em] uppercase rounded"
              style={{
                background: "rgba(59,130,246,0.12)",
                color: "#60a5fa",
                border: "1px solid rgba(59,130,246,0.25)",
              }}
            >
              {offer.badgeText}
            </span>
            <span className="text-white text-sm font-semibold whitespace-nowrap">{offer.title}</span>
            <span className="text-slate-500 text-xs whitespace-nowrap hidden sm:block">— {offer.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
