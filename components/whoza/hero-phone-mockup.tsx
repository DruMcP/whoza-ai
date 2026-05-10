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
      {/* Phone mockup */}
      <div ref={phoneRef} id="phone-mockup" className={styles.phoneMockup}>

        {/* Dynamic Island */}
        <div className={styles.dynamicIsland}>
          <div className={styles.dynamicIslandEdge} />
        </div>

        {/* Side buttons */}
        <div className={`${styles.phoneBtn} ${styles.phoneBtnVolumeUp}`} />
        <div className={`${styles.phoneBtn} ${styles.phoneBtnVolumeDown}`} />
        <div className={`${styles.phoneBtn} ${styles.phoneBtnPower}`} />

        {/* Glass reflection layer */}
        <div className={styles.phoneGlass} />

        {/* Screen gloss */}
        <div className={styles.screenGloss} />

        {/* ── Screen content — updated per prompt v6 ── */}
        <div className={styles.phoneScreen}>
          {/* WhatsApp Header with gradient */}
          <div
            style={{
              background: "linear-gradient(180deg, #075E54, #054A42)",
              padding: "8px 10px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
              minHeight: 44,
              position: "relative",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                background: "#128C7E",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <Image
                src="/assets/icons/katie-icon.png"
                alt=""
                width={20}
                height={20}
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
                aria-hidden="true"
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Whoza AI
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 10,
                  lineHeight: 1.2,
                }}
              >
                online
              </div>
            </div>
            {/* PILOT badge inside header */}
            <div
              style={{
                background: "linear-gradient(135deg, #10B981, #059669)",
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: 8,
                pointerEvents: "none",
                letterSpacing: "0.02em",
              }}
            >
              <span aria-hidden="true">🌱</span> PILOT
            </div>
          </div>

          {/* Date */}
          <div
            style={{
              textAlign: "center",
              fontSize: 10,
              color: "#8696A0",
              padding: "6px 0",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              flexShrink: 0,
              background: "#F0F2F5",
            }}
          >
            Today
          </div>

          {/* Notification */}
          <div
            style={{
              background: "#FFF9C4",
              margin: "0 10px 6px",
              padding: "6px 10px",
              borderRadius: 7,
              fontSize: 11,
              color: "#1A1A2E",
              textAlign: "center",
              fontWeight: 500,
              lineHeight: 1.3,
              flexShrink: 0,
            }}
          >
            <span>🔔</span> Whoza AI captured a new lead
          </div>

          {/* Chat bubble */}
          <div
            style={{
              background: "#fff",
              margin: "0 10px 6px",
              padding: "8px 10px",
              borderRadius: 8,
              boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
              borderLeft: "3px solid #D63031",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#1A1A2E",
                marginBottom: 2,
                lineHeight: 1.2,
              }}
            >
              New enquiry from Sarah Williams
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#475569",
                marginBottom: 4,
                lineHeight: 1.2,
              }}
            >
              <span>🔧</span> Plumbing — Leaking Boiler
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#1A1A2E",
                lineHeight: 1.35,
                marginBottom: 4,
              }}
            >
              "Leaking boiler, no hot water. Can you come today?"
            </div>
            <div
              style={{
                fontSize: 9,
                color: "#8696A0",
                textAlign: "right",
              }}
            >
              09:41
            </div>
          </div>

          {/* Lead Card */}
          <div
            style={{
              background: "#fff",
              margin: "0 10px 6px",
              padding: "8px 10px",
              borderRadius: 8,
              boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#1A1A2E",
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span>📋</span> Lead Summary
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 4,
              }}
            >
              <LeadItem label="Name" value="Sarah Williams" />
              <LeadItem label="Job Type" value="Boiler Repair" />
              <LeadItem label="Location" value="Bristol, BS16" />
              <LeadItem label="Priority" value="🔴 High" valueColor="#D63031" srOnly="(Urgent)" />
              <LeadItem label="Job Value" value="£250 – £450" />
              <LeadItem label="AI Verified" value="✓ Verified" valueColor="#008B6B" />
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateAreas: "'accept callback' 'decline decline'",
              gap: 5,
              padding: "0 10px 6px",
              flexShrink: 0,
            }}
          >
            <button
              style={{
                gridArea: "accept",
                background: "#008B6B",
                color: "#fff",
                border: "none",
                padding: "8px 0",
                borderRadius: 7,
                fontSize: 11,
                fontWeight: 600,
                cursor: "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                lineHeight: 1,
              }}
              tabIndex={-1}
              aria-hidden="true"
            >
              <span>👍</span> Accept
            </button>
            <button
              style={{
                gridArea: "callback",
                background: "rgba(16,185,129,0.12)",
                color: "#059669",
                border: "1px solid rgba(16,185,129,0.2)",
                padding: "8px 0",
                borderRadius: 7,
                fontSize: 11,
                fontWeight: 600,
                cursor: "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                lineHeight: 1,
              }}
              tabIndex={-1}
              aria-hidden="true"
            >
              <span>📞</span> Call Back
            </button>
            <button
              style={{
                gridArea: "decline",
                background: "rgba(214,48,49,0.08)",
                color: "#D63031",
                border: "1px solid rgba(214,48,49,0.15)",
                padding: "8px 0",
                borderRadius: 7,
                fontSize: 11,
                fontWeight: 600,
                cursor: "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                lineHeight: 1,
              }}
              tabIndex={-1}
              aria-hidden="true"
            >
              <span>❌</span> Decline
            </button>
          </div>

          {/* AI Qualification Badge */}
          <div
            style={{
              background: "#F0FDF4",
              borderTop: "1px solid #BBF7D0",
              padding: "6px 10px",
              fontSize: 9,
              color: "#166534",
              display: "flex",
              alignItems: "center",
              gap: 5,
              lineHeight: 1.3,
              flexShrink: 0,
              marginTop: "auto",
            }}
          >
            <span>🤖</span>
            <span>AI Qualification: Verified — Not spam | Real postcode | Job confirmed</span>
          </div>
        </div>

        {/* Demo label */}
        <div className={styles.demoLabel} aria-hidden="true">DEMO</div>

        {/* PILOT badge on phone frame */}
        <div className={styles.phonePilotBadge} aria-hidden="true">
          <span>🌱</span> PILOT
        </div>
      </div>

      {/* Contact shadow */}
      <div className={styles.phoneShadow} />
    </div>
  )
}

function LeadItem({
  label,
  value,
  valueColor,
  srOnly,
}: {
  label: string
  value: string
  valueColor?: string
  srOnly?: string
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <span style={{ fontSize: 9, color: "#8696A0", textTransform: "uppercase" }}>
        {label}
      </span>
      <span style={{ fontSize: 11, fontWeight: 600, color: valueColor || "#1A1A2E" }}>
        {value}
        {srOnly && <span className="sr-only">{srOnly}</span>}
      </span>
    </div>
  )
}
