import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BlogCover } from "./blog-cover"
import { blogHref, formatBlogDate, type BlogIndexEntry } from "@/lib/blog-index"

/** Category pill, then date and read time, as on every blog card and article header. */
export function BlogMeta({ entry, className = "" }: { entry: BlogIndexEntry; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-[var(--v2-muted)] ${className}`}>
      <span className="inline-flex items-center rounded-full bg-[var(--v2-mint)] px-3 py-1 text-[12.5px] font-medium text-[var(--v2-green-ink)]">
        {entry.category}
      </span>
      <time dateTime={entry.date}>{formatBlogDate(entry.date)}</time>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--v2-line)]" />
      <span>{entry.readTime}</span>
    </div>
  )
}

/** The dark pill used as the call to action on cards and slides. */
export function ReadMorePill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--v2-navy)] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors group-hover:bg-[var(--v2-green)]">
      Read more
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </span>
  )
}

interface BlogCardProps {
  entry: BlogIndexEntry
  /** Scopes the cover's SVG ids; unique per card on the page. */
  uid: string
  headingLevel?: "h2" | "h3"
}

export function BlogCard({ entry, uid, headingLevel = "h3" }: BlogCardProps) {
  const Heading = headingLevel
  return (
    <Link
      href={blogHref(entry)}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[var(--v2-line)] bg-white transition-[transform,border-color,box-shadow] duration-300 ease-[var(--v2-ease)] hover:-translate-y-1 hover:border-[#b9c6bf] hover:shadow-[0_18px_40px_-24px_rgba(15,22,40,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v2-green)]"
    >
      <div className="overflow-hidden">
        <BlogCover
          variant={entry.cover}
          uid={uid}
          image={entry.image}
          className="aspect-[16/10] w-full transition-transform duration-500 ease-[var(--v2-ease)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <BlogMeta entry={entry} />
        <Heading className="mt-4 line-clamp-2 text-[19px] font-semibold leading-snug tracking-[-0.01em] text-[var(--v2-ink)]">
          {entry.title}
        </Heading>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[var(--v2-body)]">{entry.excerpt}</p>
        <div className="mt-auto pt-6">
          <ReadMorePill />
        </div>
      </div>
    </Link>
  )
}
