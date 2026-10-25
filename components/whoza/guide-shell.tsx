import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, Check, LifeBuoy } from "lucide-react"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { GUIDE_PAGES, type GuideBlock, type GuidePage } from "@/lib/guide-content"

/**
 * The frame every guide page is rendered in.
 *
 * A server component with no state, so the whole guide is in the served HTML: this is product
 * help that people search for, and help nobody can read without JavaScript is help nobody finds.
 * The contents list is a plain <nav> of links rather than a collapsible tree for the same reason.
 *
 * Heading levels are deliberate. The page title is the only h1 and every block heading is an h2,
 * which is what the SEO guard checks and, more to the point, what a screen reader reads out as
 * the shape of the page.
 */

function Blocks({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <section key={i} className="mb-10 last:mb-0">
          {block.heading && (
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--v2-ink)] mb-4">{block.heading}</h2>
          )}

          {block.type === "p" && (
            <p className="text-[var(--v2-body)] leading-relaxed">{block.text}</p>
          )}

          {block.type === "steps" && (
            <ol className="space-y-3">
              {block.items.map((item, n) => (
                <li key={n} className="flex gap-4 items-start">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-[var(--v2-mint)] text-[var(--v2-green)] text-sm font-semibold grid place-items-center tabular-nums">
                    {n + 1}
                  </span>
                  <span className="text-[var(--v2-body)] leading-relaxed pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
          )}

          {block.type === "bullets" && (
            <ul className="space-y-3">
              {block.items.map((item, n) => (
                <li key={n} className="flex gap-3 items-start">
                  <Check className="shrink-0 w-5 h-5 text-[var(--v2-green)] mt-0.5" aria-hidden="true" />
                  <span className="text-[var(--v2-body)] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {block.type === "table" && (
            <div className="overflow-x-auto rounded-2xl border border-[var(--v2-line)]">
              <table className="w-full text-left border-collapse min-w-[32rem]">
                <thead>
                  <tr className="bg-white">
                    {block.headers.map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-5 py-3 text-sm font-semibold text-[var(--v2-ink)] whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, n) => (
                    <tr key={n} className="border-t border-[var(--v2-line)]">
                      {row.map((cell, c) => (
                        <td
                          key={c}
                          className={`px-5 py-3 text-sm leading-relaxed align-top ${
                            c === 0 ? "text-[var(--v2-ink)] font-medium" : "text-[var(--v2-body)]"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}
    </>
  )
}

export function GuideShell({ page }: { page: GuidePage }) {
  const index = GUIDE_PAGES.findIndex((p) => p.slug === page.slug)
  const previous = index > 0 ? GUIDE_PAGES[index - 1] : null
  const next = index < GUIDE_PAGES.length - 1 ? GUIDE_PAGES[index + 1] : null

  const breadcrumbs =
    page.slug === "overview"
      ? [
          { name: "Home", item: "https://whoza.ai" },
          { name: "System Guide", item: "https://whoza.ai/guide" },
        ]
      : [
          { name: "Home", item: "https://whoza.ai" },
          { name: "System Guide", item: "https://whoza.ai/guide" },
          { name: page.navLabel, item: `https://whoza.ai${page.path}` },
        ]

  return (
    <div className="min-h-screen bg-[var(--v2-paper)] text-[var(--v2-body)] v2-page">
      <Header />
      <BreadcrumbSchema items={breadcrumbs} />

      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-12">
          {/* Contents. A plain list of links, sticky on desktop, scrolled sideways on a phone. */}
          <nav aria-label="Guide contents" className="mb-10 lg:mb-0">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--v2-muted)] mb-4">
                System Guide
              </p>
              <ul className="flex gap-2 overflow-x-auto pb-2 lg:block lg:overflow-visible lg:pb-0 lg:space-y-1">
                {GUIDE_PAGES.map((item) => {
                  const current = item.slug === page.slug
                  return (
                    <li key={item.slug} className="shrink-0">
                      <Link
                        href={item.path}
                        aria-current={current ? "page" : undefined}
                        className={`block whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm transition-colors ${
                          current
                            ? "bg-[var(--v2-mint)] text-[var(--v2-green)] font-semibold"
                            : "text-[var(--v2-body)] hover:text-[var(--v2-ink)] hover:bg-white/5"
                        }`}
                      >
                        {item.navLabel}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <div className="hidden lg:block mt-8 pt-8 border-t border-[var(--v2-line)]">
                <Link
                  href="/support"
                  className="inline-flex items-center gap-2 text-sm text-[var(--v2-body)] hover:text-[var(--v2-green)] transition-colors"
                >
                  <LifeBuoy className="w-4 h-4" aria-hidden="true" />
                  Still stuck? Ask support
                </Link>
              </div>
            </div>
          </nav>

          <article>
            <div className="v2-eyebrow inline-flex items-center gap-2 mb-6">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              System Guide
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
              {page.title}
            </h1>
            <p className="text-[var(--v2-body)] text-lg leading-relaxed mb-12 max-w-2xl">
              {page.subtitle}
            </p>

            <Blocks blocks={page.blocks} />

            {/* Previous and next, so the guide reads as a sequence rather than six loose pages. */}
            <nav
              aria-label="Guide pagination"
              className="mt-16 pt-8 border-t border-[var(--v2-line)] flex flex-col sm:flex-row gap-4 sm:justify-between"
            >
              {previous ? (
                <Link
                  href={previous.path}
                  className="group flex items-center gap-3 rounded-2xl border border-[var(--v2-line)] bg-white px-5 py-4 hover:border-[#b9c6bf] transition-colors"
                >
                  <ArrowLeft
                    className="w-4 h-4 text-[var(--v2-muted)] group-hover:text-[var(--v2-green)] transition-colors"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-xs text-[var(--v2-muted)]">Previous</span>
                    <span className="block text-sm font-semibold text-[var(--v2-ink)]">
                      {previous.navLabel}
                    </span>
                  </span>
                </Link>
              ) : (
                <span />
              )}

              {next && (
                <Link
                  href={next.path}
                  className="group flex items-center gap-3 rounded-2xl border border-[var(--v2-line)] bg-white px-5 py-4 hover:border-[#b9c6bf] transition-colors sm:text-right"
                >
                  <span className="sm:ml-auto">
                    <span className="block text-xs text-[var(--v2-muted)]">Next</span>
                    <span className="block text-sm font-semibold text-[var(--v2-ink)]">{next.navLabel}</span>
                  </span>
                  <ArrowRight
                    className="w-4 h-4 text-[var(--v2-muted)] group-hover:text-[var(--v2-green)] transition-colors"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </nav>

            <div className="mt-12 rounded-2xl border border-[var(--v2-green)]/20 bg-[var(--v2-mint)] p-8">
              <p className="text-lg font-semibold mb-2">Ready to put it to work?</p>
              <p className="text-[var(--v2-body)] text-sm mb-6 max-w-xl">
                Seven days free on Starter, with a real UK number, 100 call minutes and 10 booked
                jobs. Setup takes about half an hour.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://app.whoza.ai/signup"
                  className="inline-flex items-center gap-2 bg-[var(--v2-green)] hover:bg-[var(--v2-green-hover)] text-white font-semibold px-6 py-3 rounded-2xl transition-colors"
                >
                  Start your free trial
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 border border-white/15 hover:bg-white/5 text-[var(--v2-ink)] font-semibold px-6 py-3 rounded-2xl transition-colors"
                >
                  See the plans
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  )
}
