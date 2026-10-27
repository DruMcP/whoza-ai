"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { WaitlistModal } from "@/components/whoza/waitlist-modal"
import { trackCTA } from "@/lib/gtag"

/** "Start your free trial": opens the same trial modal as the header and footer. */
export function TrialButton({ source, label = "Start your free trial" }: { source: string; label?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => {
          trackCTA(`Start Free Trial: ${source}`, source)
          setOpen(true)
        }}
        className="v2-btn cursor-pointer"
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
      {open && <WaitlistModal onClose={() => setOpen(false)} source={source} />}
    </>
  )
}
