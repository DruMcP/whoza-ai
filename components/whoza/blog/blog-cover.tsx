/*
 * Cover art for blog cards, the featured slider and article heroes. Each
 * article gets a small product-style illustration in the v2 palette, drawn as
 * SVG so it stays sharp at every size and costs no image requests. The art is
 * 800x450 and drawn with `slice`, so any container aspect (16:10 cards, 21:9
 * heroes) crops the edges and keeps the middle.
 *
 * A post can ship a photo instead: pass `image` and the illustration is skipped.
 */

import Image from "next/image"

export type BlogCoverVariant =
  | "ai-shortlist"
  | "answer-engine"
  | "caller-experience"
  | "voice-tech"
  | "research-chart"
  | "uk-built"
  | "night-call"
  | "pricing"
  | "reviews"
  | "growth"
  | "whatsapp-lead"

const NAVY = "#0f1628"
const NAVY_2 = "#172038"
const GREEN = "#0b7d50"
const BRIGHT = "#1fcd80"
const MINT = "#effdf4"
const PAPER = "#fbfcfa"
const LINE = "#e2e8e4"
const SOFT = "#cfd8d3"
const GOLD = "#f5b301"
const RED = "#e5484d"

/* ---------- small drawing helpers ---------- */

function starPoints(cx: number, cy: number, r: number): string {
  const pts: string[] = []
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? r : r * 0.45
    const angle = (Math.PI / 5) * i - Math.PI / 2
    pts.push(`${(cx + radius * Math.cos(angle)).toFixed(1)},${(cy + radius * Math.sin(angle)).toFixed(1)}`)
  }
  return pts.join(" ")
}

function Stars({ x, y, r, gap, fill = GOLD }: { x: number; y: number; r: number; gap: number; fill?: string }) {
  return (
    <g fill={fill}>
      {[0, 1, 2, 3, 4].map((i) => (
        <polygon key={i} points={starPoints(x + i * gap, y, r)} />
      ))}
    </g>
  )
}

/** Four-point sparkle, the usual "AI" mark. */
function Sparkle({ cx, cy, s, fill }: { cx: number; cy: number; s: number; fill: string }) {
  return (
    <path
      d={`M${cx} ${cy - s} Q${cx} ${cy} ${cx + s} ${cy} Q${cx} ${cy} ${cx} ${cy + s} Q${cx} ${cy} ${cx - s} ${cy} Q${cx} ${cy} ${cx} ${cy - s}Z`}
      fill={fill}
    />
  )
}

function Check({ cx, cy, color = "#fff", w = 2.6 }: { cx: number; cy: number; color?: string; w?: number }) {
  return (
    <path
      d={`M${cx - 5.5} ${cy + 0.5} l3.8 3.8 l7 -7.6`}
      fill="none"
      stroke={color}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
}

/** Lucide's phone glyph, 24x24, placed with its centre at (cx, cy). */
function PhoneGlyph({ cx, cy, size = 18, color = "#fff" }: { cx: number; cy: number; size?: number; color?: string }) {
  const s = size / 24
  return (
    <g transform={`translate(${cx - size / 2} ${cy - size / 2}) scale(${s})`}>
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        fill="none"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  )
}

/** A rounded bar standing in for a line of text. */
function Line({ x, y, w, h = 9, fill = LINE }: { x: number; y: number; w: number; h?: number; fill?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />
}

function Shadow({ id }: { id: string }) {
  return (
    <filter id={id} x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor={NAVY} floodOpacity="0.12" />
    </filter>
  )
}

/* ---------- the covers ---------- */

type Art = (id: (name: string) => string) => React.ReactNode

const ART: Record<BlogCoverVariant, Art> = {
  // ChatGPT-style answer naming three local trades, the first one highlighted.
  "ai-shortlist": (id) => (
    <>
      <defs>
        <radialGradient id={id("glow")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={BRIGHT} stopOpacity="0.28" />
          <stop offset="100%" stopColor={BRIGHT} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="450" fill={NAVY} />
      <circle cx="400" cy="225" r="280" fill={`url(#${id("glow")})`} />
      <rect x="220" y="64" width="360" height="322" rx="24" fill="#fff" />
      {[250, 268, 286].map((cx) => (
        <circle key={cx} cx={cx} cy="92" r="5.5" fill={LINE} />
      ))}
      <rect x="372" y="116" width="182" height="36" rx="18" fill={MINT} />
      <Line x={392} y={130} w={130} h={8} fill="#9fd8b8" />
      <circle cx="254" cy="184" r="15" fill={GREEN} />
      <Sparkle cx={254} cy={184} s={8} fill="#fff" />
      <Line x={280} y={174} w={210} h={8} fill="#d5ddd9" />
      <Line x={280} y={188} w={150} h={8} fill="#d5ddd9" />
      {[218, 270, 322].map((y, i) => (
        <g key={y}>
          <rect
            x="248"
            y={y}
            width="306"
            height="42"
            rx="13"
            fill={i === 0 ? MINT : "#f6f8f7"}
            stroke={i === 0 ? GREEN : LINE}
            strokeWidth={i === 0 ? 2 : 1}
          />
          <circle cx="273" cy={y + 21} r="11" fill={i === 0 ? GREEN : SOFT} />
          <Line x={294} y={y + 12} w={i === 0 ? 150 : 128} h={7} fill={i === 0 ? "#7cc9a2" : "#d5ddd9"} />
          <Line x={294} y={y + 25} w={96} h={6} fill={i === 0 ? "#b7e4cb" : LINE} />
          {i === 0 && (
            <>
              <circle cx="530" cy={y + 21} r="11" fill={GREEN} />
              <Check cx={530} cy={y + 21} w={2.2} />
            </>
          )}
        </g>
      ))}
      <Sparkle cx={618} cy={112} s={16} fill={BRIGHT} />
      <Sparkle cx={646} cy={146} s={8} fill={BRIGHT} />
      <Sparkle cx={180} cy={330} s={12} fill="#6ee7b7" />
    </>
  ),

  // Search bar over an AI answer box with its cited sources.
  "answer-engine": (id) => (
    <>
      <defs>
        <Shadow id={id("sh")} />
      </defs>
      <rect width="800" height="450" fill={MINT} />
      <circle cx="110" cy="70" r="120" fill="#fff" opacity="0.55" />
      <circle cx="700" cy="400" r="150" fill="#fff" opacity="0.55" />
      <g filter={`url(#${id("sh")})`}>
        <rect x="190" y="62" width="420" height="52" rx="26" fill="#fff" />
        <rect x="190" y="132" width="420" height="250" rx="22" fill="#fff" />
      </g>
      <circle cx="222" cy="88" r="9" fill="none" stroke={GREEN} strokeWidth="3" />
      <path d="M229 95 l8 8" stroke={GREEN} strokeWidth="3" strokeLinecap="round" />
      <Line x={248} y={83} w={200} h={10} fill={SOFT} />
      <circle cx="584" cy="88" r="11" fill={GREEN} />
      <rect x="214" y="154" width="116" height="28" rx="14" fill={MINT} />
      <Sparkle cx={232} cy={168} s={8} fill={GREEN} />
      <Line x={246} y={164} w={70} h={8} fill="#9fd8b8" />
      <Line x={214} y={200} w={372} />
      <Line x={214} y={218} w={340} />
      <Line x={214} y={236} w={356} />
      <Line x={214} y={254} w={240} />
      {[214, 340, 466].map((x, i) => (
        <g key={x}>
          <rect
            x={x}
            y="286"
            width="120"
            height="70"
            rx="14"
            fill="#f6f8f7"
            stroke={i === 0 ? GREEN : LINE}
            strokeWidth={i === 0 ? 2 : 1}
          />
          <circle cx={x + 22} cy="308" r="9" fill={[GREEN, NAVY, GOLD][i]} />
          <Line x={x + 38} y={304} w={66} h={8} fill={SOFT} />
          <Line x={x + 16} y={330} w={86} h={7} />
        </g>
      ))}
    </>
  ),

  // An incoming call next to a five-star, smiling rating card.
  "caller-experience": (id) => (
    <>
      <defs>
        <Shadow id={id("sh")} />
        <pattern id={id("grid")} width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke={LINE} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="450" fill={PAPER} />
      <rect width="800" height="450" fill={`url(#${id("grid")})`} opacity="0.7" />
      <g filter={`url(#${id("sh")})`}>
        <rect x="168" y="84" width="252" height="282" rx="26" fill={NAVY} />
        <rect x="438" y="126" width="204" height="198" rx="24" fill="#fff" />
      </g>
      <circle cx="294" cy="156" r="36" fill="#24304d" />
      <circle cx="294" cy="146" r="13" fill="#7c8aa8" />
      <path d="M270 178 a24 18 0 0 1 48 0" fill="#7c8aa8" />
      <Line x={244} y={210} w={100} h={10} fill="rgba(255,255,255,0.4)" />
      <Line x={262} y={230} w={64} h={8} fill="rgba(255,255,255,0.22)" />
      <circle cx="244" cy="306" r="24" fill={RED} />
      <path d="M234 306 h20" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="344" cy="306" r="24" fill={BRIGHT} />
      <PhoneGlyph cx={344} cy={306} size={20} color={NAVY} />
      <path d="M380 282 a34 34 0 0 1 0 48" fill="none" stroke={BRIGHT} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <path d="M392 270 a50 50 0 0 1 0 72" fill="none" stroke={BRIGHT} strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      <circle cx="540" cy="186" r="32" fill={MINT} />
      <circle cx="528" cy="180" r="4" fill={GREEN} />
      <circle cx="552" cy="180" r="4" fill={GREEN} />
      <path d="M524 194 q16 14 32 0" fill="none" stroke={GREEN} strokeWidth="3.5" strokeLinecap="round" />
      <Stars x={482} y={252} r={11} gap={29} />
      <Line x={490} y={282} w={100} h={8} />
    </>
  ),

  // A voice waveform running through a microphone node.
  "voice-tech": (id) => {
    const heights = [18, 34, 26, 52, 40, 70, 58, 96, 74, 120, 0, 0, 0, 0, 120, 88, 104, 66, 80, 46, 58, 30, 38, 20]
    return (
      <>
        <defs>
          <linearGradient id={id("bar")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BRIGHT} />
            <stop offset="100%" stopColor={GREEN} />
          </linearGradient>
          <pattern id={id("grid")} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#fff" strokeOpacity="0.05" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="800" height="450" fill={NAVY} />
        <rect width="800" height="450" fill={`url(#${id("grid")})`} />
        {heights.map((h, i) =>
          h === 0 ? null : (
            <rect key={i} x={168 + i * 19.5} y={232 - h / 2} width="10" height={h} rx="5" fill={`url(#${id("bar")})`} />
          ),
        )}
        <circle cx="400" cy="232" r="92" fill="none" stroke={BRIGHT} strokeOpacity="0.12" strokeWidth="2" />
        <circle cx="400" cy="232" r="68" fill="none" stroke={BRIGHT} strokeOpacity="0.22" strokeWidth="2" />
        <circle cx="400" cy="232" r="46" fill={NAVY_2} stroke={BRIGHT} strokeWidth="2" />
        <rect x="391" y="212" width="18" height="28" rx="9" fill={BRIGHT} />
        <path d="M382 230 a18 18 0 0 0 36 0" fill="none" stroke={BRIGHT} strokeWidth="3" strokeLinecap="round" />
        <path d="M400 248 v8" stroke={BRIGHT} strokeWidth="3" strokeLinecap="round" />
        <rect x="328" y="72" width="144" height="32" rx="16" fill={NAVY_2} stroke="rgba(255,255,255,0.1)" />
        <circle cx="348" cy="88" r="5" fill={BRIGHT} />
        <Line x={362} y={84} w={92} h={8} fill="rgba(255,255,255,0.28)" />
        <rect x="560" y="342" width="96" height="30" rx="15" fill={NAVY_2} stroke="rgba(255,255,255,0.1)" />
        <Line x={578} y={353} w={60} h={8} fill="rgba(110,231,183,0.5)" />
      </>
    )
  },

  // A rising bar chart with an adoption donut beside it.
  "research-chart": (id) => (
    <>
      <defs>
        <Shadow id={id("sh")} />
      </defs>
      <rect width="800" height="450" fill={PAPER} />
      <circle cx="660" cy="80" r="140" fill={MINT} />
      <g filter={`url(#${id("sh")})`}>
        <rect x="160" y="76" width="330" height="298" rx="24" fill="#fff" />
        <rect x="466" y="176" width="176" height="176" rx="24" fill="#fff" />
      </g>
      <Line x={188} y={102} w={150} h={10} fill={SOFT} />
      <Line x={188} y={120} w={90} h={8} />
      {[180, 230, 280].map((y) => (
        <path key={y} d={`M188 ${y} H462`} stroke="#eef2ef" strokeWidth="2" strokeDasharray="6 6" />
      ))}
      <path d="M188 334 H462" stroke={LINE} strokeWidth="2" />
      {[56, 82, 108, 138, 172, 206].map((h, i) => (
        <rect key={i} x={198 + i * 44} y={334 - h} width="30" height={h} rx="7" fill={i >= 4 ? GREEN : "#bfe8d1"} />
      ))}
      <circle cx="554" cy="252" r="46" fill="none" stroke={LINE} strokeWidth="18" />
      <circle
        cx="554"
        cy="252"
        r="46"
        fill="none"
        stroke={GREEN}
        strokeWidth="18"
        strokeDasharray="190 289"
        strokeLinecap="round"
        transform="rotate(-90 554 252)"
      />
      <circle cx="554" cy="252" r="6" fill={GOLD} />
      <Line x={510} y={318} w={88} h={8} />
      <circle cx="486" cy="104" r="26" fill={GREEN} />
      <path d="M475 115 L497 93 M484 93 H497 V106" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),

  // A location pin with a data-protection card: built and hosted in the UK.
  "uk-built": (id) => (
    <>
      <defs>
        <Shadow id={id("sh")} />
        <pattern id={id("dots")} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="2.2" fill="#a7dfbf" />
        </pattern>
      </defs>
      <rect width="800" height="450" fill={MINT} />
      <rect width="800" height="450" fill={`url(#${id("dots")})`} opacity="0.75" />
      {[132, 96, 60].map((r, i) => (
        <circle key={r} cx="400" cy="262" r={r} fill={i === 2 ? "#d6f5e3" : "none"} stroke={GREEN} strokeOpacity={0.12 + i * 0.1} strokeWidth="2" />
      ))}
      <g filter={`url(#${id("sh")})`}>
        <path d="M400 128 c-32 0 -56 24 -56 54 c0 42 56 94 56 94 s56 -52 56 -94 c0 -30 -24 -54 -56 -54z" fill={GREEN} />
        <rect x="146" y="96" width="160" height="78" rx="18" fill="#fff" />
        <rect x="498" y="246" width="158" height="118" rx="20" fill="#fff" />
      </g>
      <circle cx="400" cy="182" r="20" fill="#fff" />
      <circle cx="400" cy="182" r="8" fill={BRIGHT} />
      <circle cx="178" cy="135" r="17" fill="none" stroke={GREEN} strokeWidth="3" />
      <path d="M178 125 V135 L185 141" fill="none" stroke={GREEN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <Line x={206} y={124} w={80} h={8} fill={SOFT} />
      <Line x={206} y={140} w={56} h={7} />
      <path d="M534 268 l22 -8 l22 8 v18 c0 16 -10 26 -22 32 c-12 -6 -22 -16 -22 -32z" fill={MINT} stroke={GREEN} strokeWidth="3" strokeLinejoin="round" />
      <Check cx={556} cy={290} color={GREEN} w={3} />
      <Line x={592} y={278} w={46} h={8} fill={SOFT} />
      <Line x={592} y={294} w={34} h={7} />
      <Line x={522} y={334} w={110} h={8} />
    </>
  ),

  // A phone ringing at 2am, with the clock and an urgent flag.
  "night-call": (id) => (
    <>
      <defs>
        <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1120" />
          <stop offset="100%" stopColor="#1b2541" />
        </linearGradient>
        <mask id={id("moon")}>
          <rect width="800" height="450" fill="#fff" />
          <circle cx="640" cy="82" r="30" fill="#000" />
        </mask>
      </defs>
      <rect width="800" height="450" fill={`url(#${id("sky")})`} />
      {[
        [120, 70], [190, 130], [260, 54], [540, 60], [700, 150], [150, 380], [660, 390], [720, 260], [90, 220],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 2.4 : 1.6} fill="#fff" opacity="0.6" />
      ))}
      <circle cx="622" cy="96" r="34" fill="#f8f1cf" mask={`url(#${id("moon")})`} />
      <rect x="318" y="62" width="164" height="326" rx="30" fill="#060a14" stroke="#2a3555" strokeWidth="3" />
      <rect x="330" y="76" width="140" height="298" rx="22" fill="#121a31" />
      <Line x={372} y={98} w={56} h={10} fill="rgba(255,255,255,0.5)" />
      <circle cx="400" cy="176" r="30" fill="#24304d" />
      <circle cx="400" cy="168" r="11" fill="#7c8aa8" />
      <path d="M380 194 a20 15 0 0 1 40 0" fill="#7c8aa8" />
      <Line x={360} y={224} w={80} h={9} fill="rgba(255,255,255,0.45)" />
      <Line x={374} y={242} w={52} h={7} fill="rgba(255,255,255,0.22)" />
      <circle cx="362" cy="324" r="21" fill={RED} />
      <path d="M353 324 h18" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="438" cy="324" r="21" fill={BRIGHT} />
      <PhoneGlyph cx={438} cy={324} size={18} color={NAVY} />
      <path d="M498 128 a36 36 0 0 1 0 52" fill="none" stroke={BRIGHT} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <path d="M512 114 a54 54 0 0 1 0 80" fill="none" stroke={BRIGHT} strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      <circle cx="212" cy="236" r="60" fill={NAVY_2} stroke="#2a3555" strokeWidth="3" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (Math.PI / 6) * i
        return (
          <path
            key={i}
            d={`M${(212 + 48 * Math.sin(a)).toFixed(1)} ${(236 - 48 * Math.cos(a)).toFixed(1)} L${(212 + 54 * Math.sin(a)).toFixed(1)} ${(236 - 54 * Math.cos(a)).toFixed(1)}`}
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )
      })}
      <path d="M212 236 L238 221" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M212 236 V192" stroke={BRIGHT} strokeWidth="3" strokeLinecap="round" />
      <circle cx="212" cy="236" r="5" fill="#fff" />
      <rect x="488" y="274" width="154" height="44" rx="22" fill="rgba(245,158,11,0.14)" stroke="#f59e0b" strokeWidth="1.5" />
      <circle cx="511" cy="296" r="6" fill="#f59e0b" />
      <Line x={526} y={292} w={98} h={8} fill="rgba(245,158,11,0.55)" />
    </>
  ),

  // Three plan cards, the middle one raised.
  pricing: (id) => (
    <>
      <defs>
        <Shadow id={id("sh")} />
      </defs>
      <rect width="800" height="450" fill={PAPER} />
      <circle cx="400" cy="470" r="260" fill={MINT} />
      <g filter={`url(#${id("sh")})`}>
        <rect x="168" y="112" width="142" height="236" rx="20" fill="#fff" />
        <rect x="490" y="112" width="142" height="236" rx="20" fill="#fff" />
        <rect x="329" y="76" width="142" height="300" rx="20" fill={NAVY} />
      </g>
      {[
        { x: 168, y: 112, h: 236, dark: false },
        { x: 329, y: 76, h: 300, dark: true },
        { x: 490, y: 112, h: 236, dark: false },
      ].map(({ x, y, h, dark }) => (
        <g key={x}>
          <Line x={x + 20} y={y + (dark ? 44 : 26)} w={54} h={8} fill={dark ? "rgba(255,255,255,0.45)" : SOFT} />
          <rect x={x + 20} y={y + (dark ? 64 : 46)} width="76" height="24" rx="7" fill={dark ? "#fff" : NAVY} />
          {[0, 1, 2].map((r) => (
            <g key={r}>
              <circle cx={x + 26} cy={y + (dark ? 118 : 100) + r * 24} r="6" fill={dark ? BRIGHT : MINT} />
              <Line
                x={x + 40}
                y={y + (dark ? 114 : 96) + r * 24}
                w={[72, 56, 64][r]}
                h={7}
                fill={dark ? "rgba(255,255,255,0.25)" : LINE}
              />
            </g>
          ))}
          <rect
            x={x + 18}
            y={y + h - 48}
            width="106"
            height="30"
            rx="15"
            fill={dark ? BRIGHT : "none"}
            stroke={dark ? "none" : GREEN}
            strokeWidth="2"
          />
        </g>
      ))}
      <rect x="360" y="62" width="80" height="26" rx="13" fill={BRIGHT} />
      <polygon points={starPoints(378, 75, 7)} fill={NAVY} />
      <Line x={390} y={71} w={38} h={8} fill="rgba(15,22,40,0.55)" />
      <circle cx="654" cy="96" r="30" fill={GOLD} />
      <circle cx="654" cy="96" r="21" fill="none" stroke="#d99a00" strokeWidth="3" />
    </>
  ),

  // Stacked Google-style reviews with a big star badge.
  reviews: (id) => (
    <>
      <defs>
        <Shadow id={id("sh")} />
      </defs>
      <rect width="800" height="450" fill={MINT} />
      <circle cx="140" cy="380" r="140" fill="#fff" opacity="0.5" />
      <rect x="252" y="92" width="300" height="104" rx="18" fill="#fff" opacity="0.6" transform="rotate(-5 402 144)" />
      <g filter={`url(#${id("sh")})`}>
        <rect x="262" y="140" width="320" height="118" rx="18" fill="#fff" />
        <rect x="214" y="246" width="336" height="118" rx="18" fill="#fff" />
      </g>
      {[
        { x: 262, y: 140, avatar: SOFT },
        { x: 214, y: 246, avatar: GREEN },
      ].map(({ x, y, avatar }) => (
        <g key={y}>
          <circle cx={x + 38} cy={y + 38} r="20" fill={avatar} />
          <Line x={x + 70} y={y + 26} w={96} h={9} fill={SOFT} />
          <Stars x={x + 78} y={y + 52} r={8} gap={20} />
          <Line x={x + 24} y={y + 76} w={272} h={8} />
          <Line x={x + 24} y={y + 92} w={196} h={8} />
        </g>
      ))}
      <circle cx="604" cy="128" r="44" fill={GOLD} />
      <polygon points={starPoints(604, 130, 22)} fill="#fff" />
      <Sparkle cx={662} cy={196} s={12} fill={GOLD} />
      <Sparkle cx={186} cy={150} s={10} fill={BRIGHT} />
    </>
  ),

  // A revenue line chart climbing to the top right.
  growth: (id) => {
    const pts: [number, number][] = [
      [200, 318], [258, 300], [316, 306], [374, 262], [432, 244], [490, 196], [548, 160], [600, 124],
    ]
    const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ")
    return (
      <>
        <defs>
          <linearGradient id={id("area")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BRIGHT} stopOpacity="0.38" />
            <stop offset="100%" stopColor={BRIGHT} stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="800" height="450" fill={NAVY} />
        <circle cx="640" cy="80" r="180" fill={BRIGHT} opacity="0.06" />
        <rect x="166" y="72" width="468" height="304" rx="24" fill={NAVY_2} stroke="rgba(255,255,255,0.08)" />
        {[150, 200, 250, 300].map((y) => (
          <path key={y} d={`M196 ${y} H604`} stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
        ))}
        <path d={`${line} L600 340 L200 340 Z`} fill={`url(#${id("area")})`} />
        <path d={line} fill="none" stroke={BRIGHT} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="5.5" fill={NAVY_2} stroke={BRIGHT} strokeWidth="3" />
        ))}
        <rect x="196" y="96" width="128" height="30" rx="15" fill="rgba(31,205,128,0.14)" />
        <path d="M212 116 l8 -8 l6 6 l10 -10" fill="none" stroke={BRIGHT} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <Line x={246} y={107} w={62} h={8} fill="rgba(110,231,183,0.55)" />
        <circle cx="600" cy="124" r="16" fill={BRIGHT} />
        <path d="M593 131 L607 117 M598 117 H607 V126" fill="none" stroke={NAVY} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )
  },

  // The WhatsApp job card on a phone, over the homepage hero gradient.
  "whatsapp-lead": (id) => (
    <>
      <defs>
        <linearGradient id={id("bg")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={BRIGHT} />
          <stop offset="100%" stopColor={MINT} />
        </linearGradient>
        <Shadow id={id("sh")} />
      </defs>
      <rect width="800" height="450" fill={`url(#${id("bg")})`} />
      <g filter={`url(#${id("sh")})`}>
        <rect x="300" y="36" width="200" height="410" rx="34" fill="#070b16" />
        <rect x="150" y="168" width="134" height="58" rx="16" fill="#fff" />
        <rect x="516" y="262" width="134" height="58" rx="16" fill="#fff" />
      </g>
      <rect x="312" y="48" width="176" height="386" rx="26" fill={NAVY} />
      <circle cx="340" cy="86" r="12" fill={BRIGHT} />
      <Line x={360} y={79} w={72} h={8} fill="rgba(255,255,255,0.55)" />
      <Line x={360} y={93} w={40} h={6} fill="rgba(31,205,128,0.6)" />
      <rect x="326" y="120" width="148" height="182" rx="16" fill="#fdf8ec" />
      {[144, 172, 200, 228, 256].map((y, i) => (
        <g key={y}>
          <circle cx="344" cy={y + 4} r="6" fill={i === 4 ? RED : NAVY} />
          <Line x={358} y={y} w={[92, 70, 80, 60, 74][i]} h={8} fill="rgba(15,22,40,0.32)" />
        </g>
      ))}
      <Line x={418} y={284} w={44} h={6} fill="rgba(15,22,40,0.2)" />
      {[
        [326, BRIGHT],
        [377, "#3b82f6"],
        [428, RED],
      ].map(([x, fill]) => (
        <rect key={x as number} x={x as number} y="316" width="46" height="22" rx="11" fill={fill as string} />
      ))}
      <circle cx="176" cy="197" r="13" fill={GREEN} />
      <Check cx={176} cy={197} w={2.4} />
      <Line x={198} y={188} w={70} h={8} fill={SOFT} />
      <Line x={198} y={202} w={48} h={7} />
      <circle cx="542" cy="291" r="13" fill={NAVY} />
      <PhoneGlyph cx={542} cy={291} size={14} color="#fff" />
      <Line x={564} y={282} w={70} h={8} fill={SOFT} />
      <Line x={564} y={296} w={46} h={7} />
    </>
  ),
}

interface BlogCoverProps {
  variant: BlogCoverVariant
  /** Unique per cover on the page; scopes the SVG gradient and filter ids. */
  uid: string
  image?: string
  /** Only used when `image` is set. */
  alt?: string
  priority?: boolean
  sizes?: string
  className?: string
}

export function BlogCover({ variant, uid, image, alt = "", priority, sizes, className = "" }: BlogCoverProps) {
  if (image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={image} alt={alt} fill priority={priority} sizes={sizes ?? "(min-width: 1024px) 33vw, 100vw"} className="object-cover" />
      </div>
    )
  }
  const prefix = `bc-${uid.replace(/[^a-zA-Z0-9-]/g, "-")}`
  const id = (name: string) => `${prefix}-${name}`
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 800 450"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        {ART[variant](id)}
      </svg>
    </div>
  )
}
