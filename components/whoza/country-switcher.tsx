"use client"

import { useLocale } from "@/lib/locale-context"
import { Country } from "@/lib/locale-config"

const UK_FLAG = (
  <svg viewBox="0 0 60 30" className="w-5 h-3 rounded-sm">
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z"/>
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v-15 h-30 z h-30 v-15 z v15 h30 z"/>
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
)

const US_FLAG = (
  <svg viewBox="0 0 60 30" className="w-5 h-3 rounded-sm">
    <path d="M0,0 h60 v30 h-60 z" fill="#B22234"/>
    <path d="M0,2.31 h60 v2.31 h-60 z M0,6.92 h60 v2.31 h-60 z M0,11.54 h60 v2.31 h-60 z M0,16.15 h60 v2.31 h-60 z M0,20.77 h60 v2.31 h-60 z M0,25.38 h60 v2.31 h-60 z" fill="#fff"/>
    <path d="M0,0 h25.38 v16.15 h-25.38 z" fill="#3C3B6E"/>
  </svg>
)

const flags: { code: Country; icon: React.ReactNode; label: string }[] = [
  { code: "uk", icon: UK_FLAG, label: "United Kingdom" },
  { code: "us", icon: US_FLAG, label: "United States" },
]

export function CountrySwitcher() {
  const { country, setCountry } = useLocale()

  return (
    <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
      {flags.map((f) => (
        <button
          key={f.code}
          onClick={() => setCountry(f.code)}
          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-all cursor-pointer ${
            country === f.code
              ? "bg-white shadow-sm"
              : "hover:bg-white/10"
          }`}
          aria-label={f.label}
          title={f.label}
        >
          <span className={country === f.code ? "" : "opacity-60"}>
            {f.icon}
          </span>
          <span className={`text-xs font-bold uppercase tracking-wide ${
            country === f.code
              ? "text-[var(--navy-900)]"
              : "text-white/60"
          }`}>
            {f.code}
          </span>
        </button>
      ))}
    </div>
  )
}
