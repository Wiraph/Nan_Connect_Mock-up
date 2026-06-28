import { TINT_HEX } from "@/lib/data";

export type IlloKind =
  | "temple"
  | "naga-temple"
  | "stupa"
  | "museum"
  | "salt"
  | "mountain-mist"
  | "mountain-stars"
  | "rice-terrace"
  | "earth-pillars"
  | "temple-hill"
  | "weaving"
  | "market"
  | "viewpoint";

const KIND_BY_ID: Record<string, IlloKind> = {
  "wat-phumin": "temple",
  "wat-si-phan-ton": "naga-temple",
  "wat-phra-that-chae-haeng": "stupa",
  "nan-national-museum": "museum",
  "bo-kluea": "salt",
  "doi-phu-kha": "mountain-mist",
  "sapan-village": "rice-terrace",
  "doi-samer-dao": "mountain-stars",
  "sao-din-na-noi": "earth-pillars",
  "wat-phuket": "temple-hill",
  "lamduan-weaving": "weaving",
  "kad-khuang-walking-street": "market",
  "viewpoint-1715": "viewpoint",
  "wat-nong-bua": "temple",
};

export function placeIllo(id: string): IlloKind {
  return KIND_BY_ID[id] ?? "mountain-mist";
}

const NAVY = "#1b2a4a";
const NAVY6 = "#26395f";
const GOLD = "#c9a227";
const GOLDL = "#e0c873";
const CREAM = "#f5f1e6";
const INDIGO = "#2b3a67";
const INDIGO6 = "#3a4c80";
const WHITE = "#ffffff";

/* Lanna "lai nam lai" flowing-water band that ties every scene together */
function LannaBand() {
  return (
    <g>
      <rect x="0" y="74" width="160" height="26" fill={NAVY} />
      <path
        d="M0 78 L8 74 L16 78 L24 74 L32 78 L40 74 L48 78 L56 74 L64 78 L72 74 L80 78 L88 74 L96 78 L104 74 L112 78 L120 74 L128 78 L136 74 L144 78 L152 74 L160 78"
        fill="none"
        stroke={GOLD}
        strokeWidth="1.4"
      />
    </g>
  );
}

function Temple({ x = 80, naga = false }: { x?: number; naga?: boolean }) {
  return (
    <g>
      {/* body */}
      <rect x={x - 18} y={48} width={36} height={26} fill={WHITE} />
      {/* tiered roofs */}
      <polygon points={`${x - 22},48 ${x + 22},48 ${x},32`} fill={GOLD} />
      <polygon points={`${x - 16},38 ${x + 16},38 ${x},26`} fill={GOLDL} />
      {/* spire */}
      <rect x={x - 1.5} y={16} width={3} height={12} fill={GOLD} />
      <circle cx={x} cy={15} r={2.5} fill={GOLD} />
      {/* door */}
      <rect x={x - 4} y={58} width={8} height={16} rx={4} fill={NAVY6} />
      {naga && (
        <>
          <path d={`M${x - 18} 74 q -8 -6 -6 -18`} fill="none" stroke={GOLD} strokeWidth="2.2" />
          <path d={`M${x + 18} 74 q 8 -6 6 -18`} fill="none" stroke={GOLD} strokeWidth="2.2" />
          <circle cx={x - 24} cy={54} r={2.4} fill={GOLDL} />
          <circle cx={x + 24} cy={54} r={2.4} fill={GOLDL} />
        </>
      )}
    </g>
  );
}

function Scene({ kind, tintFg }: { kind: IlloKind; tintFg: string }) {
  switch (kind) {
    case "temple":
    case "naga-temple":
      return (
        <>
          <polygon points="0,74 40,46 80,66 120,44 160,74" fill={INDIGO6} />
          <circle cx="132" cy="26" r="11" fill={GOLDL} opacity="0.7" />
          <Temple naga={kind === "naga-temple"} />
          <LannaBand />
        </>
      );
    case "stupa":
      return (
        <>
          <polygon points="0,74 50,48 110,52 160,74" fill={INDIGO6} />
          <circle cx="130" cy="24" r="10" fill={GOLDL} opacity="0.7" />
          <rect x="68" y="60" width="24" height="14" fill={GOLD} />
          <polygon points="70,60 90,60 80,40" fill={GOLD} />
          <path d="M80 40 q -7 -6 0 -16 q 7 10 0 16" fill={GOLDL} />
          <rect x="78.5" y="14" width="3" height="12" fill={GOLD} />
          <LannaBand />
        </>
      );
    case "museum":
      return (
        <>
          <rect x="0" y="20" width="160" height="54" fill="#eef1e6" />
          {/* frangipani tree */}
          <rect x="26" y="40" width="3" height="34" fill={NAVY6} />
          <circle cx="22" cy="38" r="8" fill={tintFg} opacity="0.55" />
          <circle cx="32" cy="36" r="7" fill={tintFg} opacity="0.55" />
          {/* building */}
          <rect x="58" y="44" width="60" height="30" fill={WHITE} />
          <polygon points="54,44 122,44 88,30" fill={GOLD} />
          {[64, 76, 88, 100, 112].map((cx) => (
            <rect key={cx} x={cx - 2} y={50} width={4} height={24} fill={CREAM} stroke={NAVY6} strokeWidth="0.6" />
          ))}
          <LannaBand />
        </>
      );
    case "salt":
      return (
        <>
          <polygon points="0,74 60,50 120,54 160,74" fill={INDIGO6} />
          {/* salt pans */}
          {[
            [28, 62],
            [60, 66],
            [96, 62],
            [120, 67],
          ].map(([cx, cy], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx={16} ry={5} fill="#dbe7ea" stroke={GOLD} strokeWidth="0.8" />
          ))}
          {/* steam */}
          <path d="M60 60 q 4 -8 0 -14" fill="none" stroke={WHITE} strokeWidth="1.4" opacity="0.7" />
          <path d="M96 56 q 4 -8 0 -14" fill="none" stroke={WHITE} strokeWidth="1.4" opacity="0.7" />
          <LannaBand />
        </>
      );
    case "mountain-mist":
      return (
        <>
          <rect x="0" y="0" width="160" height="74" fill="#eaf0ea" />
          <circle cx="120" cy="24" r="12" fill={GOLDL} opacity="0.75" />
          <polygon points="0,74 36,34 70,74" fill={INDIGO} />
          <polygon points="48,74 96,28 150,74" fill={NAVY} />
          <polygon points="96,74 132,40 160,74" fill={INDIGO6} />
          <rect x="0" y="56" width="160" height="3.5" fill={CREAM} opacity="0.85" />
          <rect x="0" y="64" width="160" height="3" fill={CREAM} opacity="0.7" />
          <LannaBand />
        </>
      );
    case "mountain-stars":
      return (
        <>
          <rect x="0" y="0" width="160" height="74" fill={NAVY} />
          {[
            [20, 14],
            [40, 24],
            [64, 12],
            [88, 20],
            [112, 10],
            [134, 22],
            [150, 14],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={i % 2 ? 0.8 : 1.3} fill={CREAM} />
          ))}
          <circle cx="128" cy="18" r="8" fill={GOLDL} />
          <polygon points="0,74 50,40 100,74" fill={INDIGO} />
          <polygon points="70,74 120,46 160,74" fill={INDIGO6} />
          {/* tent */}
          <polygon points="36,72 52,72 44,56" fill={GOLD} />
          <line x1="44" y1="56" x2="44" y2="72" stroke={NAVY} strokeWidth="1" />
          <LannaBand />
        </>
      );
    case "rice-terrace":
      return (
        <>
          <rect x="0" y="0" width="160" height="74" fill="#eef1e6" />
          <polygon points="0,40 60,18 130,40" fill={INDIGO6} opacity="0.8" />
          {["#c7d6a0", "#b6c98c", "#a6bd7a", "#9ab06c"].map((c, i) => (
            <path
              key={i}
              d={`M0 ${44 + i * 8} Q 80 ${36 + i * 8} 160 ${46 + i * 8} L160 ${52 + i * 8} Q 80 ${42 + i * 8} 0 ${50 + i * 8} Z`}
              fill={c}
            />
          ))}
          <LannaBand />
        </>
      );
    case "earth-pillars":
      return (
        <>
          <rect x="0" y="0" width="160" height="74" fill="#f0ead9" />
          <circle cx="126" cy="22" r="11" fill={GOLDL} opacity="0.7" />
          {[
            [40, 30],
            [62, 22],
            [82, 34],
            [104, 26],
          ].map(([cx, h], i) => (
            <polygon
              key={i}
              points={`${cx - 7},74 ${cx - 4},${74 - h} ${cx + 4},${74 - h} ${cx + 7},74`}
              fill={i % 2 ? "#cda06a" : "#d8b48a"}
            />
          ))}
          <LannaBand />
        </>
      );
    case "temple-hill":
      return (
        <>
          <rect x="0" y="0" width="160" height="74" fill="#eef1e6" />
          <polygon points="0,74 70,30 150,74" fill={tintFg} opacity="0.5" />
          <Temple x={80} />
          <path d="M0 70 Q 80 60 160 70 L160 74 L0 74 Z" fill="#a6bd7a" />
          <LannaBand />
        </>
      );
    case "weaving":
      return (
        <>
          <rect x="0" y="0" width="160" height="74" fill="#efe9da" />
          {/* loom frame */}
          <rect x="34" y="30" width="92" height="44" fill="none" stroke={NAVY6} strokeWidth="2.4" />
          {/* warp threads */}
          {[44, 54, 64, 74, 84, 94, 104, 114].map((x) => (
            <line key={x} x1={x} y1="32" x2={x} y2="72" stroke={GOLD} strokeWidth="0.7" opacity="0.6" />
          ))}
          {/* flowing-water weave */}
          {[42, 52, 62].map((y, i) => (
            <path
              key={y}
              d={`M36 ${y} L48 ${y - 5} L60 ${y} L72 ${y - 5} L84 ${y} L96 ${y - 5} L108 ${y} L120 ${y - 5}`}
              fill="none"
              stroke={i === 1 ? INDIGO : GOLD}
              strokeWidth="1.8"
            />
          ))}
          <LannaBand />
        </>
      );
    case "market":
      return (
        <>
          <rect x="0" y="0" width="160" height="74" fill={NAVY6} />
          <circle cx="20" cy="16" r="8" fill={GOLDL} opacity="0.6" />
          {/* stalls */}
          {[28, 64, 100, 132].map((x, i) => (
            <g key={x}>
              <rect x={x - 14} y={52} width={28} height={22} fill={i % 2 ? CREAM : "#efe3c4"} />
              <polygon points={`${x - 17},52 ${x + 17},52 ${x},42`} fill={i % 2 ? GOLD : INDIGO} />
            </g>
          ))}
          {/* lanterns */}
          {[46, 82, 116].map((x) => (
            <g key={x}>
              <line x1={x} y1="30" x2={x} y2="38" stroke={GOLD} strokeWidth="0.8" />
              <circle cx={x} cy={41} r={3.4} fill={GOLD} />
            </g>
          ))}
          <LannaBand />
        </>
      );
    case "viewpoint":
    default:
      return (
        <>
          <rect x="0" y="0" width="160" height="74" fill="#eaf0ea" />
          <circle cx="126" cy="22" r="11" fill={GOLDL} opacity="0.7" />
          <polygon points="0,74 44,44 92,74" fill={INDIGO} />
          <polygon points="60,74 110,50 160,74" fill={INDIGO6} />
          <polygon points="110,74 140,56 160,74" fill={NAVY} />
          {/* coffee cup */}
          <rect x="22" y="60" width="14" height="9" rx="1.5" fill={CREAM} stroke={NAVY6} strokeWidth="0.8" />
          <path d="M36 62 q 5 1 0 5" fill="none" stroke={NAVY6} strokeWidth="0.8" />
          <path d="M27 58 q 3 -4 0 -8 M32 58 q 3 -4 0 -8" fill="none" stroke={WHITE} strokeWidth="0.9" opacity="0.7" />
          <LannaBand />
        </>
      );
  }
}

export default function PlaceIllustration({
  kind,
  tint = "navy",
  className = "",
}: {
  kind: IlloKind;
  tint?: string;
  className?: string;
}) {
  const tintFg = (TINT_HEX[tint] ?? TINT_HEX.navy).fg;
  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-hidden
    >
      <Scene kind={kind} tintFg={tintFg} />
    </svg>
  );
}
