import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FileText, Clock, ArrowLeft, User, Calendar, CheckCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { blogPostContents } from "@/lib/blog-content"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPostContents[slug]
  if (!post) {
    return {
      title: "Blog Post | whoza.ai",
    }
  }
  return {
    title: `${post.title} | whoza.ai Blog`,
    description: post.schema.description,
    alternates: {
      canonical: `https://whoza.ai/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: [post.category],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPostContents[slug]

  if (!post) {
    notFound()
  }

  const { content } = post

  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Blog", item: "https://whoza.ai/blog" },
        { name: post.title, item: `https://whoza.ai/blog/${slug}` },
      ]} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/50 hover:text-emerald-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            {post.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-10">
          <p className="text-white/70 text-lg leading-relaxed">{post.excerpt}</p>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <div
            className="text-white/80 leading-relaxed whitespace-pre-line mb-10"
            dangerouslySetInnerHTML={{ __html: formatText(content.introduction) }}
          />

          {content.sections.map((section, idx) => (
            <section key={idx} className="mb-10">
              {section.headingTag === "h2" ? (
                <h2 className="text-2xl font-bold text-white mb-4 mt-8">{section.heading}</h2>
              ) : (
                <h3 className="text-xl font-semibold text-white mb-3 mt-6">{section.heading}</h3>
              )}

              <div
                className="text-white/80 leading-relaxed whitespace-pre-line mb-4"
                dangerouslySetInnerHTML={{ __html: formatText(section.body) }}
              />

              {section.table && section.table.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-6">
                  <table className="w-full text-sm">
                    <tbody>
                      {section.table.map((row, ridx) => (
                        <tr key={ridx} className="border-b border-white/10 last:border-0">
                          <td className="px-4 py-3 font-medium text-white/70 w-1/3">{row.label}</td>
                          <td className="px-4 py-3 text-white/90">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.list && section.list.length > 0 && (
                <ul className="space-y-3 mb-6">
                  {section.list.map((item, lidx) => (
                    <li key={lidx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.callout && (
                <div className="bg-emerald-500/10 border-l-4 border-emerald-500 rounded-r-xl p-6 my-6">
                  <p className="text-emerald-200/90 font-medium leading-relaxed">{section.callout}</p>
                </div>
              )}
            </section>
          ))}

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-10">
            <div
              className="text-white/80 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: formatText(content.conclusion) }}
            />
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 mb-10 text-center">
            <div
              className="text-white/90 leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: formatText(content.cta) }}
            />
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
            >
              Start Your Free Trial
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {content.faq.map((faq, fidx) => (
                <div key={fidx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}

function formatText(text: string): string {
  let formatted = text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
  return formatted
}
