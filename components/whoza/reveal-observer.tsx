"use client"

import { useEffect } from "react"

export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    )

    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return null
}
