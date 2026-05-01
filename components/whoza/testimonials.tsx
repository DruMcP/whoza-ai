"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

const colorMap = {
  blue: {
    quote: "text-[var(--katie-blue)]/20",
    avatar: "bg-[var(--katie-blue)]",
    metric: "text-[var(--katie-blue)]",
    card: "bg-[var(--katie-blue)]/10 border-[var(--katie-blue)]/20",
  },
  green: {
    quote: "text-[var(--rex-green)]/20",
    avatar: "bg-[var(--rex-green)]",
    metric: "text-[var(--rex-green)]",
    card: "bg-[var(--rex-green)]/10 border-[var(--rex-green)]/20",
  },
  amber: {
    quote: "text-[var(--claire-amber)]/20",
    avatar: "bg-[var(--claire-amber)]",
    metric: "text-[var(--claire-amber)]",
    card: "bg-[var(--claire-amber)]/10 border-[var(--claire-amber)]/20",
  },
}

const testimonialsConfig = {
  uk: [
    {
      name: "Dave Thompson",
      trade: "Plumber",
      location: "Manchester",
      avatar: "DT",
      rating: 5,
      quote: "I was losing 10-15 calls a week when I was on jobs. Katie's paid for herself twenty times over. My wife says I'm less stressed too!",
      metric: { value: "£3,200", label: "Extra monthly revenue" },
      color: "blue" as keyof typeof colorMap,
    },
    {
      name: "Sarah M.",
      trade: "Electrician",
      location: "Birmingham",
      avatar: "SM",
      rating: 5,
      quote: "Customers think Katie is a real person! She books jobs while I'm up a ladder. Best £129 I spend each month.",
      metric: { value: "£2,800", label: "Extra monthly revenue" },
      color: "green" as keyof typeof colorMap,
    },
    {
      name: "James W.",
      trade: "Builder",
      location: "Leeds",
      avatar: "JW",
      rating: 5,
      quote: "Paid for itself in the first week. 12 jobs booked in 7 days that I would've missed while on site.",
      metric: { value: "12", label: "Jobs in first week" },
      color: "amber" as keyof typeof colorMap,
    },
    {
      name: "Mike R.",
      trade: "Plumber",
      location: "Glasgow",
      avatar: "MR",
      rating: 5,
      quote: "Best investment I made this year. My wife noticed I'm less stressed and we're booking jobs I used to miss.",
      metric: { value: "£4,100", label: "Extra monthly revenue" },
      color: "blue" as keyof typeof colorMap,
    },
  ],
  us: [
    {
      name: "Mike Johnson",
      trade: "HVAC Contractor",
      location: "Dallas",
      avatar: "MJ",
      rating: 5,
      quote: "I was missing 20+ calls a week while on jobs. Katie's paid for herself thirty times over. My stress level has dropped significantly.",
      metric: { value: "$4,800", label: "Extra monthly revenue" },
      color: "blue" as keyof typeof colorMap,
    },
    {
      name: "Jennifer R.",
      trade: "Plumber",
      location: "Chicago",
      avatar: "JR",
      rating: 5,
      quote: "Customers think Katie is a real receptionist! She books jobs while I'm under a sink. Best $169 I spend each month.",
      metric: { value: "$3,600", label: "Extra monthly revenue" },
      color: "green" as keyof typeof colorMap,
    },
    {
      name: "Carlos M.",
      trade: "Roofer",
      location: "Phoenix",
      avatar: "CM",
      rating: 5,
      quote: "Paid for itself in the first week. 15 jobs booked in 7 days that I would've missed while on a roof.",
      metric: { value: "15", label: "Jobs in first week" },
      color: "amber" as keyof typeof colorMap,
    },
    {
      name: "David S.",
      trade: "Electrician",
      location: "Houston",
      avatar: "DS",
      rating: 5,
      quote: "Best investment I made this year. My wife noticed I'm less stressed and we're booking jobs I used to miss.",
      metric: { value: "$5,200", label: "Extra monthly revenue" },
      color: "blue" as keyof typeof colorMap,
    },
  ],
}

export function TestimonialCarousel() {
  const { country, config } = useLocale()
  const testimonials = testimonialsConfig[country]
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--claire-amber)]/10 text-[var(--claire-amber)] text-sm font-medium mb-4">
            Real Results
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
            Trusted by {config.language.tradesPeople} Across the {country === "uk" ? "UK" : "US"}
          </h2>
          <p className="mt-6 text-lg text-[var(--slate-500)]">
            {"Don't just take our word for it. Here's what real customers say."}
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <TestimonialCard testimonial={testimonials[current]} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-[var(--off-white)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--katie-blue)] hover:text-white hover:border-[var(--katie-blue)] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === current ? "bg-[var(--katie-blue)]" : "bg-[var(--slate-300)]"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-[var(--off-white)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--katie-blue)] hover:text-white hover:border-[var(--katie-blue)] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Trust Stats - Consolidated metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: "47,000+", label: "Calls Handled Monthly", color: "text-[var(--katie-blue)]" },
            { value: country === "uk" ? "£2.3M" : "$3.1M", label: "Revenue Saved", color: "text-[var(--rex-green)]" },
            { value: "8 sec", label: "Average Answer Time", color: "text-[var(--claire-amber)]" },
            { value: "99.7%", label: "Uptime Guarantee", color: "text-[var(--mark-grey)]" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-2xl lg:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-[var(--slate-500)]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  const colors = colorMap[testimonial.color]
  
  return (
    <div className="bg-[var(--off-white)] rounded-3xl p-8 lg:p-12 border border-[var(--border)]">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Quote Section */}
        <div className="flex-1">
          <Quote className={`w-12 h-12 ${colors.quote} mb-4`} />
          
          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-[var(--claire-amber)] fill-[var(--claire-amber)]" />
            ))}
          </div>

          <blockquote className="text-xl lg:text-2xl text-[var(--navy-900)] leading-relaxed font-medium">
            &quot;{testimonial.quote}&quot;
          </blockquote>

          {/* Author */}
          <div className="mt-6 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${colors.avatar} flex items-center justify-center text-white font-bold`}>
              {testimonial.avatar}
            </div>
            <div>
              <div className="font-semibold text-[var(--navy-900)]">{testimonial.name}</div>
              <div className="text-sm text-[var(--slate-500)]">
                {testimonial.trade} • {testimonial.location}
              </div>
            </div>
          </div>
        </div>

        {/* Metric Card */}
        <div className={`lg:w-56 p-6 rounded-2xl ${colors.card} border flex flex-col items-center justify-center text-center`}>
          <div className={`text-4xl font-bold ${colors.metric}`}>
            {testimonial.metric.value}
          </div>
          <div className="mt-2 text-sm text-[var(--slate-500)]">
            {testimonial.metric.label}
          </div>
        </div>
      </div>
    </div>
  )
}
