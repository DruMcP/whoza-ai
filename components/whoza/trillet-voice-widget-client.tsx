"use client"

import dynamic from "next/dynamic"

const TrilletVoiceWidget = dynamic(
  () => import("@/components/whoza/trillet-voice-widget").then((mod) => mod.TrilletVoiceWidget),
  { ssr: false, loading: () => <p className="text-white/60 text-sm">Loading demo...</p> }
)

export function TrilletVoiceWidgetClient() {
  return <TrilletVoiceWidget buttonLabel="Talk to Katie" />
}
