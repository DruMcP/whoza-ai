"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { BlogCover } from "./blog-cover"
import { ReadMorePill } from "./blog-card"
import { blogHref, formatBlogDate, type BlogIndexEntry } from "@/lib/blog-index"

const AUTOPLAY_MS = 7000

/**
 * Featured articles as wide slides: the active one is centred in the page
 * container and its neighbours peek in from the sides. Swipe or scroll to move,
 * or use the dots. It advances on its own every 7s while it is on screen,
 * pauses on hover, focus or touch, and never moves under reduced motion.
 */
export function FeaturedSlider({ posts }: { posts: BlogIndexEntry[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLLIElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(true)

  const goTo = useCallback((index: number) => {
    const track = trackRef.current
    const slide = slideRefs.current[index]
    if (!track || !slide) return
    const left = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    track.scrollTo({ left, behavior: smooth ? "smooth" : "auto" })
  }, [])

  // Track which slide is centred.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index))
        }
      },
      { root: track, threshold: 0.6 },
    )
    slideRefs.current.forEach((slide) => slide && io.observe(slide))
    return () => io.disconnect()
  }, [posts.length])

  // Only autoplay while the slider is visible and motion is allowed.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener("change", onChange)
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.4 })
    io.observe(track)
    return () => {
      mq.removeEventListener("change", onChange)
      io.disconnect()
    }
  }, [])

  useEffect(() => {
    if (paused || !onScreen || reducedMotion || posts.length < 2) return
    const timer = window.setTimeout(() => {
      if (document.visibilityState === "visible") goTo((active + 1) % posts.length)
    }, AUTOPLAY_MS)
    return () => window.clearTimeout(timer)
  }, [active, paused, onScreen, reducedMotion, posts.length, goTo])

  return (
    <section aria-labelledby="featured-heading" className="relative">
      <h2 id="featured-heading" className="sr-only">
        Featured articles
      </h2>
      <div
        ref={trackRef}
        className="relative flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ paddingInline: "max(16px, calc((100vw - 1120px) / 2))" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onPointerDown={() => setPaused(true)}
      >
        <ul className="flex gap-4 sm:gap-6">
          {posts.map((post, i) => (
            <li
              key={post.slug}
              ref={(el) => {
                slideRefs.current[i] = el
              }}
              data-index={i}
              className="w-[min(1120px,calc(100vw-32px))] shrink-0 snap-center"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${posts.length}`}
            >
              <Link
                href={blogHref(post)}
                className="group block overflow-hidden rounded-[28px] border border-[var(--v2-line)] bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v2-green)]"
                tabIndex={i === active ? 0 : -1}
              >
                <div className="overflow-hidden">
                  <BlogCover
                    variant={post.cover}
                    uid={`featured-${post.slug}`}
                    image={post.image}
                    priority={i === 0}
                    sizes="(min-width: 1152px) 1120px, 100vw"
                    className="aspect-[16/10] w-full transition-transform duration-700 ease-[var(--v2-ease)] group-hover:scale-[1.02] sm:aspect-[16/8] lg:aspect-[16/6.4]"
                  />
                </div>
                <div className="bg-[var(--v2-mint)] px-6 py-7 sm:px-10 sm:py-9">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-[var(--v2-muted)]">
                    <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[12.5px] font-medium text-[var(--v2-green-ink)]">
                      {post.category}
                    </span>
                    <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#b9c6bf]" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-4 max-w-4xl text-[22px] font-semibold leading-snug tracking-[-0.015em] text-[var(--v2-ink)] sm:text-[28px]">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 max-w-4xl text-[15.5px] leading-relaxed text-[var(--v2-body)] sm:line-clamp-2 sm:text-[17px]">
                    {post.excerpt}
                  </p>
                  <div className="mt-6">
                    <ReadMorePill />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex justify-center gap-2" role="group" aria-label="Choose a featured article">
        {posts.map((post, i) => (
          <button
            key={post.slug}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show featured article ${i + 1}: ${post.title}`}
            aria-current={i === active ? "true" : undefined}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === active ? "w-7 bg-[var(--v2-green)]" : "w-2.5 bg-[#c9d4ce] hover:bg-[#9fb0a7]"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
