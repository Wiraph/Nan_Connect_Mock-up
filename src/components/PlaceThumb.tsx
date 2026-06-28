import { TINT_HEX } from "@/lib/data";

export default function PlaceThumb({
  tint,
  icon,
  className = "",
  iconSize = "text-4xl",
}: {
  tint: string;
  icon: string;
  className?: string;
  iconSize?: string;
}) {
  const c = TINT_HEX[tint] ?? TINT_HEX.navy;
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: c.bg }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #1b2a4a 0 8px, #c9a227 8px 16px)",
          opacity: 0.5,
        }}
      />
      <i className={`ti ${icon} ${iconSize}`} style={{ color: c.fg }} aria-hidden />
    </div>
  );
}
