"use client"

import { motion } from "framer-motion"
import { Phone, ArrowRight, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const voiceAgents = [
  {
    name: "Katie",
    voice: "Female Voice",
    description: "Professional, warm, and friendly. Perfect for customer-focused businesses.",
    audioSample: "Hi, you've reached ABC Plumbing. My name is Katie. How can I help you today?",
    color: "var(--katie-blue)",
    bgLight: "bg-[var(--katie-blue)]/10",
    borderColor: "border-[var(--katie-blue)]/30",
    textColor: "text-[var(--katie-blue)]",
  },
  {
    name: "Mark",
    voice: "Male Voice",
    description: "Confident, clear, and direct. Great for trade and technical businesses.",
    audioSample: "Hi, you've reached ABC Electrics. This is Mark speaking. What can I do for you?",
    color: "var(--mark-grey)",
    bgLight: "bg-[var(--mark-grey)]/10",
    borderColor: "border-[var(--mark-grey)]/30",
    textColor: "text-[var(--mark-grey)]",
  },
]

export function MeetTheTeam() {
  return (
    <section id="team" className="py-20 lg:py-32 bg-[var(--off-white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] text-sm font-medium mb-4">
            Your AI Call Agents
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
            Choose Your Voice
          </h2>
          <p className="mt-6 text-lg text-[var(--slate-500)] text-pretty">
            Pick the voice that fits your business. Both answer calls, capture enquiries, and book jobs.
          </p>
        </motion.div>

        {/* Voice Agent Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {voiceAgents.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-3xl p-8 border-2 ${agent.borderColor} shadow-lg hover:shadow-xl transition-shadow`}
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${agent.color}20` }}
                >
                  <Phone className="w-8 h-8" style={{ color: agent.color }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--navy-900)]">{agent.name}</h3>
                  <span className={`text-sm font-medium ${agent.textColor}`}>{agent.voice}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[var(--slate-500)] mb-6">{agent.description}</p>

              {/* Audio Sample Preview */}
              <div className={`p-4 rounded-xl ${agent.bgLight} mb-6`}>
                <div className="flex items-center gap-3 mb-2">
                  <Volume2 className="w-4 h-4" style={{ color: agent.color }} />
                  <span className="text-sm font-medium text-[var(--navy-900)]">Sample greeting:</span>
                </div>
                <p className="text-sm text-[var(--slate-500)] italic">"{agent.audioSample}"</p>
              </div>

              {/* CTA */}
              <Button 
                variant="outline"
                className={`w-full ${agent.borderColor} ${agent.textColor} hover:bg-[${agent.color}]/5`}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Hear {agent.name} in Action
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-[var(--slate-500)] mb-6">
            Choose the voice and name that fits your business. Switch anytime.
          </p>
          <Button 
            size="lg"
            className="bg-[var(--katie-blue)] hover:bg-[var(--katie-blue)]/90 text-white font-semibold px-8"
          >
            Get Started with Your AI Agent
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
