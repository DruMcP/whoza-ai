"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import styles from "./styles/hero-phone.module.css"

export function HeroPhoneMockup() {
  const visualRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)

  /* Mouse tilt interaction — glass reflection only, no phone transform */
  useEffect(() => {
    const visual = visualRef.current
    const phone = phoneRef.current
    if (!visual || !phone) return
    if ("ontouchstart" in window) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = visual.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      phone.classList.add(styles.tiltActive)

      const glass = phone.querySelector(`.${styles.phoneGlass}`) as HTMLElement | null
      if (glass) {
        glass.style.backgroundPosition = `${50 + x * 25}% ${50 + y * 25}%`
      }
    }

    const handleMouseLeave = () => {
      phone.classList.remove(styles.tiltActive)
      const glass = phone.querySelector(`.${styles.phoneGlass}`) as HTMLElement | null
      if (glass) {
        glass.style.backgroundPosition = ""
      }
    }

    visual.addEventListener("mousemove", handleMouseMove)
    visual.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      visual.removeEventListener("mousemove", handleMouseMove)
      visual.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={visualRef}
      className={styles.heroVisual}
      role="img"
      aria-label="Demo: WhatsApp preview showing how a qualified plumbing lead from Sarah Williams in Bristol BS16 appears in your WhatsApp, with options to Accept, Call Back, or Decline"
    >
      {/* Phone mockup with photorealistic frame */}
      <div ref={phoneRef} id="phone-mockup" className={styles.phoneMockup}>

        {/* Photorealistic phone image (frame + screen content) */}
        <div className={styles.phoneFrameImage}>
          <Image
            src="/images/phone-screen.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 280px, 380px"
            style={{ objectFit: "cover" }}
            aria-hidden="true"
          />
        </div>

        {/* Glass reflection layer */}
        <div className={styles.phoneGlass} />

        {/* Demo label */}
        <div className={styles.demoLabel} aria-hidden="true">DEMO</div>
      </div>

      {/* Contact shadow */}
      <div className={styles.phoneShadow} />
    </div>
  )
}

/* Removed LeadItem - no longer needed with static phone image */
