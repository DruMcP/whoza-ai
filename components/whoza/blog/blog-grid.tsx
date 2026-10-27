"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { BlogCard } from "./blog-card"
import type { BlogIndexEntry } from "@/lib/blog-index"

/**
 * The article grid with client-side pages. Every card is in the HTML, so each
 * article keeps its link from /blog; cards off the current page are `hidden`.
 * The page number lives in ?page= so it survives a reload and can be shared,
 * without creating new URLs for search engines (the canonical stays /blog).
 */
export function BlogGrid({ posts, perPage = 6 }: { posts: BlogIndexEntry[]; perPage?: number }) {
  const pageCount = Math.max(1, Math.ceil(posts.length / perPage))
  const [page, setPage] = useState(1)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fromUrl = Number(new URLSearchParams(window.location.search).get("page"))
    if (Number.isInteger(fromUrl) && fromUrl >= 1 && fromUrl <= pageCount) setPage(fromUrl)
  }, [pageCount])

  // Newly shown cards were hidden when the observer first looked; ask it to look again.
  useEffect(() => {
    window.dispatchEvent(new Event("v2:reveal-scan"))
  }, [page])

  const goTo = (next: number) => {
    if (next < 1 || next > pageCount || next === page) return
    setPage(next)
    const url = new URL(window.location.href)
    if (next === 1) url.searchParams.delete("page")
    else url.searchParams.set("page", String(next))
    window.history.replaceState(window.history.state, "", url)
    const top = gridRef.current?.getBoundingClientRect().top ?? 0
    if (top < 0) {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      gridRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" })
    }
  }

  const start = (page - 1) * perPage
  const end = start + perPage

  return (
    <div ref={gridRef} className="scroll-mt-28">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => {
          const visible = i >= start && i < end
          return (
            <li
              key={post.slug}
              hidden={!visible}
              data-reveal
              style={{ "--reveal-delay": `${((i - start) % 3) * 90}ms` } as React.CSSProperties}
            >
              <BlogCard entry={post} uid={`grid-${post.slug}`} />
            </li>
          )
        })}
      </ul>

      {pageCount > 1 && (
        <nav aria-label="Blog pages" className="mt-12 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--v2-line)] bg-white text-[var(--v2-ink)] transition-colors hover:border-[var(--v2-ink)] disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => goTo(n)}
              aria-label={`Page ${n}`}
              aria-current={n === page ? "page" : undefined}
              className={`grid h-11 w-11 place-items-center rounded-full text-[15px] font-semibold transition-colors ${
                n === page
                  ? "bg-[var(--v2-navy)] text-white"
                  : "border border-transparent text-[var(--v2-body)] hover:border-[var(--v2-line)] hover:bg-white"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={page === pageCount}
            aria-label="Next page"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--v2-line)] bg-white text-[var(--v2-ink)] transition-colors hover:border-[var(--v2-ink)] disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  )
}
