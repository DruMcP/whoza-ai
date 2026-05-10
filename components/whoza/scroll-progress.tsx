"use client"

import { useEffect } from "react"

export function ScrollProgress() {
  useEffect(() => {
    /* ── Scroll progress bar ── */
    const bar = document.querySelector(".scroll-progress") as HTMLElement | null
    if (bar) {
      const onScroll = () => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? scrollTop / docHeight : 0
        bar.style.setProperty("--progress", String(progress))
      }
      window.addEventListener("scroll", onScroll, { passive: true })
      onScroll()
      return () => window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    /* ── Scroll entrance observer for .reveal / .reveal-stagger ── */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed")
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    )

    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => {
      obs.observe(el)
    })

    return () => obs.disconnect()
  }, [])

  return <div className="scroll-progress" aria-hidden="true" />
}
