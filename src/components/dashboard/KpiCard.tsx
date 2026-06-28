export default function KpiCard({
  icon,
  label,
  value,
  sub,
  accent = false,
}: {
  icon: string;
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        accent ? "border-gold bg-navy text-cream" : "border-line bg-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <i
          className={`ti ${icon} text-lg ${accent ? "text-gold" : "text-navy-300"}`}
          aria-hidden
        />
        <span className={`text-[12px] ${accent ? "text-cream/70" : "text-muted"}`}>
          {label}
        </span>
      </div>
      <div className={`mt-2 text-2xl font-bold ${accent ? "text-cream" : "text-navy"}`}>
        {value}
      </div>
      {sub && (
        <div className={`mt-0.5 text-[11px] ${accent ? "text-gold" : "text-muted"}`}>
          {sub}
        </div>
      )}
    </div>
  );
}
