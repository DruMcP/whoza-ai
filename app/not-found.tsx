import type { Metadata } from "next"
import { NotFoundContent } from "@/components/whoza/not-found-content"

/* Its own title, so the 404 page neither inherits the homepage title nor
   prints a second <title> next to it (which the SEO guard reads as one
   83-character title). */
export const metadata: Metadata = {
  title: { absolute: "Page not found | whoza.ai" },
}

export default function NotFound() {
  return <NotFoundContent />
}
