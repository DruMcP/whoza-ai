"use client"

import { Inter_Tight } from "next/font/google"
import Image from "next/image"
import { useState } from "react"
import { Play } from "lucide-react"

/*
 * The 51-second explainer, laid out like the echocall.de "explained in 2
 * minutes" section and set in the same typeface (Inter Tight): a centred
 * heading and one line of copy over a wide video with a frosted play button
 * and the running time. Only the poster loads with the page; the video
 * (2.9 MB) is fetched when someone presses play.
 */

const tight = Inter_Tight({ subsets: ["latin"], weight: ["400", "500"], display: "swap" })

export function ExplainerVideo() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className={`${tight.className} v2-section bg-[#f1f5f2]`} aria-labelledby="explainer-heading">
      <div className="v2-container space-y-12 md:space-y-[76px]">
        <div className="space-y-3 text-center">
          <h2
            id="explainer-heading"
            className="text-balance text-[clamp(34px,4vw,52px)] font-normal leading-[1.2] text-[var(--v2-ink)]"
          >
            whoza.ai explained in <span className="font-medium text-[var(--v2-green)]">51 seconds</span>
          </h2>
          <p className="mx-auto max-w-[600px] text-[16px] leading-6 text-[var(--v2-ink)]/70">
            Watch Katie answer the call, the job land on WhatsApp, Claire ask for the review and Rex show what to improve next.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[970px]">
          <div className="relative aspect-video w-full overflow-hidden rounded-[24px] bg-[#1a1a1c] sm:rounded-[32px]">
            {playing ? (
              <video className="h-full w-full" controls autoPlay playsInline poster="/images/explainer-poster.webp" preload="auto">
                <source src="/whoza-explainer.mp4" type="video/mp4" />
                <track kind="captions" src="/whoza-explainer-captions.vtt" srcLang="en" label="English" default />
              </video>
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 block h-full w-full cursor-pointer"
                aria-label="Play the whoza.ai explainer video, 51 seconds"
              >
                <Image
                  src="/images/explainer-poster.webp"
                  alt="Still from the whoza.ai explainer video"
                  fill
                  sizes="(min-width: 1024px) 970px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30" />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--v2-ink)]/80 text-white backdrop-blur-[8px] transition-transform duration-300 group-hover:scale-105 md:h-20 md:w-20">
                  <Play className="ml-1 h-7 w-7 md:h-9 md:w-9" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-[14px] tabular-nums text-white">0:51</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
