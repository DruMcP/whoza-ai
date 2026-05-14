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
      aria-label="Demo: WhatsApp showing a new lead from Sarah Williams for a boiler repair in Bristol BS16, with quick reply buttons to Accept, Call Back, or Decline"
    >
      {/* Phone mockup with photorealistic frame */}
      <div ref={phoneRef} id="phone-mockup" className={styles.phoneMockup}>

        {/* Frame image (photorealistic) */}
        <div className={styles.phoneFrameImage}>
          <Image
            src="/images/phone-frame.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 280px, 380px"
            className="object-contain"
            aria-hidden="true"
          />
        </div>

        {/* Screen content overlay — AUTHENTIC WHATSAPP UI */}
        <div className={styles.phoneScreen}>
          <div className={styles.waScreen}>

            {/* WhatsApp Header */}
            <div className={styles.waHeader}>
              <div className={styles.waHeaderAvatar}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                  <path d="M8 12h8M12 8v8"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className={styles.waHeaderTitle}>Whoza AI</div>
                <div className={styles.waHeaderSubtitle}>online</div>
              </div>
              {/* PILOT badge inside header */}
              <div className={styles.waPilotBadge}>
                <span aria-hidden="true">&#127793;</span> PILOT
              </div>
            </div>

            {/* Date separator */}
            <div className={styles.waDate}>Today</div>

            {/* System encryption notice (authentic WhatsApp) */}
            <div className={styles.waEncrypt}>
              <span>Messages are end-to-end encrypted</span>
            </div>

            {/* THE LEAD MESSAGE — What Katie sends in WhatsApp */}
            <div className={styles.waMessageBubble}>
              <div className={styles.waSenderHeader}>&#128222; New Lead</div>
              <div className={styles.waLeadText}>
                <div className="mb-0.5"><strong>Sarah Williams</strong></div>
                <div>&#128295; Boiler Repair</div>
                <div>&#128205; Bristol, BS16</div>
                <div>&#128176; &#163;250 &#8211; &#163;450</div>
                <div className="text-[#D63031]">&#9889; High Priority</div>
              </div>
              {/* Time + read receipts */}
              <div className={styles.waMessageTime}>
                09:41 <span className="text-[#53BDEB]">&#10003;&#10003;</span>
              </div>
            </div>

            {/* Verified stamp (inline, authentic) */}
            <div className={styles.waVerified}>
              <span className="text-[13px]">&#10003;</span>
              <span>Verified by Katie AI</span>
            </div>

            {/* QUICK REPLY BUTTONS — WhatsApp Business style pills */}
            <div className={styles.waQuickReplies}>
              <button className={styles.waPillAccept} tabIndex={-1} aria-hidden="true">
                <span>&#128077;</span> Accept Job
              </button>
              <button className={styles.waPillCallback} tabIndex={-1} aria-hidden="true">
                <span>&#128222;</span> Call Back
              </button>
              <button className={styles.waPillDecline} tabIndex={-1} aria-hidden="true">
                <span>&#10060;</span> Decline
              </button>
            </div>

            {/* Typing indicator */}
            <div className={styles.waTyping}>
              <span className={styles.typingDot} />
              <span className={styles.typingDot} style={{ animationDelay: "0.2s" }} />
              <span className={styles.typingDot} style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        </div>

        {/* Rim lighting overlays */}
        <div className={styles.phoneRimLeft} aria-hidden="true" />
        <div className={styles.phoneRimRight} aria-hidden="true" />
        <div className={styles.phoneRimTop} aria-hidden="true" />

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
