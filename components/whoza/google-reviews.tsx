"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const reviews = [
  { name: "Kat Hibbert-Jordan", date: "", text: "I realised recently that my business was not appearing in AI search results at all. Whoza.ai helped me fix that. Now I'm showing up in AI search results and getting more calls. Really pleased with the service.", rating: 5 },
  { name: "Ludmila Lamont", date: "", text: "I've tried different marketing tools before — they cost me over £350/month. Whoza.ai is by far the simplest and the cheapest. It's easy to use and I'm already seeing results. Highly recommend!", rating: 5 },
  { name: "Nicholas Wood", date: "", text: "Tried this company with anticipation but have to say was very impressed with the simplicity and how it helped me — sales followed pretty quickly which I was amazed at.", rating: 5 },
  { name: "Luke Winter", date: "", text: "The future is now. A powerful business tool well executed. This will yield both short and long term benefits.", rating: 5 },
  { name: "Garth McPherson", date: "", text: "As the owner of a small business I think the concept of Whoza is brilliant and will help businesses of all sizes improve their visibility to acquire more valued customers in the age of AI.", rating: 5 },
  { name: "Sandy Fyfe", date: "", text: "I am reluctant to try new things but this was recommended to me and seemed worth trying. Really really impressed.", rating: 5 },
]

export function GoogleReviews() {
  return (
    <section className="py-16 bg-[var(--off-white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Header */}
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-sm border border-[var(--border)] mb-8">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-[var(--navy-900)]">5.0 out of 5</span>
              </div>
              <p className="text-xs text-[var(--slate-500)]">Verified Google reviews · <a href="https://maps.app.goo.gl/dNHpTGPy1Kxeh7PV8" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--navy-900)]">View all on Google</a></p>
            </div>
          </div>

          {/* Mini Reviews */}
          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-4 rounded-xl border border-[var(--border)] text-left"
              >
                <div className="flex gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 text-[var(--claire-amber)] fill-[var(--claire-amber)]" />
                  ))}
                </div>
                <p className="text-xs text-[var(--slate-500)] mb-2 line-clamp-3">{`"${review.text}"`}</p>
                <p className="text-xs font-medium text-[var(--navy-900)]">{review.name}</p>
                <p className="text-[10px] text-[var(--slate-400)]">Google Review</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
