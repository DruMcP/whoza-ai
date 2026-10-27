"use client"

import { useEffect } from "react"

/**
 * Sharpens every [data-reveal] element on the page as it scrolls into view
 * (see the blur-in rules in globals.css). Mount once per page. Elements that
 * are hidden when the page loads, such as blog cards on a later pagination
 * page, stay observed and reveal when they are shown.
 */
export function RevealObserver() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => el.setAttribute("data-shown", ""))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute("data-shown", "")
          io.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    )
    const scan = () => {
      document
        .querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal="load"]):not([data-shown])')
        .forEach((el) => io.observe(el))
    }
    scan()
    window.addEventListener("v2:reveal-scan", scan)
    return () => {
      window.removeEventListener("v2:reveal-scan", scan)
      io.disconnect()
    }
  }, [])

  return null
}
