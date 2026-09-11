"use client"

import { useCallback, useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

/**
 * Back to the top of the page.
 *
 * The homepage runs to about 26,000 pixels, so someone who reads to the bottom has no way back
 * to the navigation except scrolling the whole way up by hand. The button appears once there is
 * enough page behind you to be worth skipping, and sits above the WhatsApp bubble rather than
 * under it.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Two screens down is far enough that scrolling back is a chore, and near enough that the
    // button does not appear over the hero on a short page.
    const threshold = () => window.innerHeight * 2

    const onScroll = () => setVisible(window.scrollY > threshold())
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toTop = useCallback(() => {
    // A long smooth scroll through 26,000 pixels is unpleasant for anyone who asked the system
    // to reduce motion, so they get an instant jump instead.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
  }, [])

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      title="Back to top"
      // Hidden from assistive tech and the tab order while it is off screen, so it is never a
      // focus stop that lands on nothing.
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-6 bottom-40 lg:bottom-24 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[var(--navy-900)] text-white shadow-lg transition-all duration-200 hover:bg-[var(--navy-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rex-green)] focus-visible:ring-offset-2 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  )
}
