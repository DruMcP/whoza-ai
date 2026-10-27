import Link from "next/link"
import { Play } from "lucide-react"
import { BlogCard } from "./blog-card"
import { BlogCover } from "./blog-cover"
import { TrialButton } from "@/components/whoza/trial-button"
import { formatBlogDate, relatedBlogEntries, type BlogIndexEntry } from "@/lib/blog-index"

/*
 * The shared pieces of an article page: header with byline, wide cover,
 * an in-article call to action and the related posts row.
 */

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

interface ArticleHeaderProps {
  entry: BlogIndexEntry
  title: string
  author?: string
  authorTitle?: string
  /** Override the listing's date or read time when the article states its own. */
  date?: string
  readTime?: string
  /** Extra line under the byline, e.g. the customer-story disclosure. */
  children?: React.ReactNode
}

export function ArticleHeader({
  entry,
  title,
  author = "whoza.ai Team",
  authorTitle,
  date = entry.date,
  readTime = entry.readTime,
  children,
}: ArticleHeaderProps) {
  return (
    <header className="mx-auto max-w-[1120px] px-4 pt-28 sm:px-6 sm:pt-36">
      <nav aria-label="Breadcrumb" data-reveal="load" className="text-[14px] text-[var(--v2-muted)]">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/blog" className="hover:text-[var(--v2-green)]">
              Blog
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[var(--v2-green-ink)]">{entry.category}</li>
        </ol>
      </nav>
      <h1
        data-reveal="load"
        style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
        className="article-headline mt-5 max-w-[900px] text-balance text-[clamp(32px,4.4vw,56px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--v2-ink)]"
      >
        {title}
      </h1>
      <div
        data-reveal="load"
        style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
        className="mt-7 flex flex-wrap items-center gap-4"
      >
        <span
          aria-hidden="true"
          className="grid h-12 w-12 place-items-center rounded-full bg-[var(--v2-navy)] text-[15px] font-semibold text-white"
        >
          {initials(author)}
        </span>
        <div className="leading-tight">
          <p className="text-[16px] font-semibold text-[var(--v2-ink)]">
            {author}
            {authorTitle && <span className="font-normal text-[var(--v2-muted)]">, {authorTitle}</span>}
          </p>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[14px] text-[var(--v2-muted)]">
            <time dateTime={date}>{formatBlogDate(date)}</time>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#b9c6bf]" />
            <span>{readTime}</span>
          </p>
        </div>
      </div>
      {children}
    </header>
  )
}

export function ArticleCover({ entry }: { entry: BlogIndexEntry }) {
  return (
    <div className="mx-auto mt-10 max-w-[1120px] px-4 sm:mt-14 sm:px-6">
      <BlogCover
        variant={entry.cover}
        uid={`hero-${entry.slug}`}
        image={entry.image}
        priority
        sizes="(min-width: 1152px) 1120px, 100vw"
        className="aspect-[16/10] w-full rounded-[28px] sm:aspect-[21/9]"
      />
    </div>
  )
}

/** "Try it yourself instead of just reading": sits mid-article. */
export function ArticleInlineCta({ source }: { source: string }) {
  return (
    <aside
      data-reveal
      className="not-prose my-12 rounded-[24px] border border-[var(--v2-line)] bg-[var(--v2-mint)] p-7 sm:p-9"
      aria-label="Try whoza.ai"
    >
      <p className="v2-eyebrow !mb-3">Try whoza.ai</p>
      <p className="text-[24px] font-semibold leading-snug tracking-[-0.015em] text-[var(--v2-ink)]">
        Hear Katie answer a real call, instead of just reading about it
      </p>
      <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-[var(--v2-body)]">
        Katie answers your missed calls 24/7, asks the right questions and sends the job to your WhatsApp. 7-day free
        trial on the Starter plan, no credit card required.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <TrialButton source={source} />
        <Link href="/#katie-demo-audio" className="v2-btn-secondary bg-white">
          <Play className="h-4 w-4" aria-hidden="true" />
          Hear a sample call
        </Link>
      </div>
    </aside>
  )
}

export function RelatedPosts({ slug }: { slug: string }) {
  const related = relatedBlogEntries(slug, 3)
  if (related.length === 0) return null
  return (
    <section aria-labelledby="related-heading" className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <h2 id="related-heading" data-reveal className="v2-h2">
        Keep reading
      </h2>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((entry, i) => (
          <li key={entry.slug} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
            <BlogCard entry={entry} uid={`related-${entry.slug}`} />
          </li>
        ))}
      </ul>
    </section>
  )
}
