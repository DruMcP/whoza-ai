"use client"

import { CheckCircle2, Star } from "lucide-react"
import { CtaBand } from "@/components/whoza/cta-band"

/* The closing call to action on the homepage, pricing, trade and city pages,
   in the shared CtaBand style. The copy is unchanged. */
export function FinalCTA() {
  return (
    <section id="final-cta" className="v2-section-tight bg-[var(--v2-paper)] px-3 sm:px-4" aria-label="Call to action">
      {/* Same width as the footer panel below it */}
      <div className="mx-auto max-w-[1600px]">
        <CtaBand
          id="final-cta"
          heading={["Don't Miss", "Another Job"]}
          text={
            <>
              Every missed call is a job going to your competitor.{" "}
              <strong className="font-semibold text-[var(--v2-green-ink)]">Try Whoza free for 7 days on Starter.</strong>
            </>
          }
          primaryLabel="Start your free week"
          source="final-cta"
          secondary={{ label: "Create your account", href: "/signup" }}
        >
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-[14px] text-[var(--v2-body)]">
            <CheckCircle2 className="h-4 w-4 text-[var(--v2-green)]" aria-hidden="true" />
            7-day free trial on Starter: 100 minutes + 10 jobs included. Cancel anytime.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-[var(--v2-muted)]">
            <span className="flex items-center gap-1.5 font-semibold text-[var(--v2-ink)]">
              <Star className="h-4 w-4 fill-[#f5b301] text-[#f5b301]" aria-hidden="true" />
              4.9/5 average rating from verified users
            </span>
            {["Installed in 30 minutes", "Runs in the background", "Always working for you"].map((point) => (
              <span key={point} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[var(--v2-green)]" aria-hidden="true" />
                {point}
              </span>
            ))}
          </div>
        </CtaBand>
      </div>
    </section>
  )
}
