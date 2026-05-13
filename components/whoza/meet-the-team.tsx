"use client"

import { motion } from "framer-motion"
import { Phone, ArrowRight, Volume2, Eye, Star } from "lucide-react"

const voiceAgents = [
  {
    name: "Katie",
    role: "Call Capture",
    voice: "Female Voice",
    description: "Katie answers calls 24/7, qualifies real customer enquiries, and sends them to WhatsApp while you work. Friendly, professional and calm under pressure — she helps customers feel heard before the enquiry reaches you.",
    outcome: "Ready to accept, call back or decline.",
    audioSample: "Hi, you've reached Thompson Plumbing. My name is Katie. How can I help you today?",
    image: "/assets/icons/katie-icon.png",
    color: "var(--katie-blue)",
    bgLight: "bg-[var(--katie-blue)]/10",
    borderColor: "border-[var(--katie-blue)]/30",
    textColor: "text-[var(--katie-blue)]",
    roleIcon: Phone,
    isVoiceAgent: true,
  },
  {
    name: "Mark",
    role: "Call Capture",
    voice: "Male Voice",
    description: "Mark answers calls 24/7, qualifies real customer enquiries, and sends them to WhatsApp while you work. Clear, efficient and professional — ideal if you prefer a direct male voice.",
    outcome: "Job type, urgency, location and customer details captured.",
    audioSample: "Hi, you've reached Wilson Electrics. This is Mark speaking. What can I do for you?",
    image: "/assets/icons/mark-icon.png",
    color: "var(--mark-grey)",
    bgLight: "bg-[var(--mark-grey)]/10",
    borderColor: "border-[var(--mark-grey)]/30",
    textColor: "text-[var(--mark-grey)]",
    roleIcon: Phone,
    isVoiceAgent: true,
  },
  {
    name: "Claire",
    role: "Review Collection",
    headline: "Claire turns completed jobs into reviews",
    description: "Claire follows up after completed work to request reviews while the customer still remembers the good service. Polite, timely and consistent — she helps turn good jobs into future trust.",
    outcome: "More reviews. More trust. More customers choosing you.",
    entitlement: "Included in Growth plan and above.",
    whatsappMessage: "Hi John, thanks for choosing Thompson Plumbing yesterday. If you were happy with the service, would you mind leaving us a quick review? It really helps. [Google review link]",
    image: "/assets/icons/claire-icon.png",
    color: "var(--claire-amber)",
    bgLight: "bg-[var(--claire-amber)]/10",
    borderColor: "border-[var(--claire-amber)]/30",
    textColor: "text-[var(--claire-amber)]",
    roleIcon: Star,
    isVoiceAgent: false,
  },
  {
    name: "Rex",
    role: "Competitor Insights",
    headline: "Rex shows what to fix next",
    description: "Rex checks your competitors, reviews and AI visibility, then turns the data into simple actions you can use each week.",
    outcome: "Clear weekly actions to improve visibility and help AI search recommend your business.",
    entitlement: "Monthly competitor analysis on every plan. Weekly actions from Growth upwards.",
    insightCard: "Your nearest competitor has 41 reviews. You have 32.\n\nAction this week: request 5 more reviews from recent customers and reply to your last 3 Google reviews.",
    image: "/assets/icons/rex-icon.png",
    color: "var(--rex-green)",
    bgLight: "bg-[var(--rex-green)]/10",
    borderColor: "border-[var(--rex-green)]/30",
    textColor: "text-[var(--rex-green)]",
    roleIcon: Eye,
    isVoiceAgent: false,
  },
]

export function MeetTheTeam() {
  return (
    <section id="team" className="section-padding-lg bg-[var(--off-white)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] text-sm font-medium mb-4">
            Your AI Revenue Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance reveal">
            Meet{" "}
            <span className="text-[var(--rex-green)]">Katie, Mark, Claire & Rex</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--slate-500)] text-pretty">
            Four AI specialists working together to answer calls, capture enquiries, collect reviews and show you what to improve next.
          </p>
        </motion.div>

        {/* Agent Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-6xl mx-auto mb-12 reveal-stagger">
          {voiceAgents.map((agent, index) => {
            const RoleIcon = agent.roleIcon
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`persona-card relative bg-white rounded-xl p-6 border-2 ${agent.borderColor} shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col`}
                data-persona={agent.name.toLowerCase()}
              >
                {/* Role Badge */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${agent.bgLight} ${agent.textColor} text-xs font-bold mb-4`}>
                  <RoleIcon className="w-3.5 h-3.5" />
                  {agent.role}
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-14 h-14 rounded-full object-contain flex-shrink-0 p-1.5"
                    style={{ background: agent.color }}
                  />
                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold text-[var(--navy-900)]">{agent.name}</h3>
                    {agent.isVoiceAgent && (
                      <div className="flex flex-col gap-1 mt-1">
                        <span className={`text-sm font-medium ${agent.textColor}`}>{agent.voice}</span>
                        <span className="self-start px-2 py-0.5 rounded-full bg-[var(--rex-green)]/10 text-[var(--rex-green)] text-[10px] font-bold uppercase border border-[var(--rex-green)]/20 leading-tight max-w-full break-words">
                          Customisable
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Headline (for Claire/Rex) */}
                {agent.headline && (
                  <h4 className="text-lg font-semibold text-[var(--navy-900)] mb-3 leading-snug">
                    {agent.headline}
                  </h4>
                )}

                {/* Description */}
                <p className="text-[var(--slate-500)] mb-6 text-sm leading-relaxed">{agent.description}</p>

                {/* Audio Sample Preview — Voice Agents Only */}
                {agent.isVoiceAgent && agent.audioSample && (
                  <div className={`p-4 rounded-xl ${agent.bgLight} mb-6`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Volume2 className="w-4 h-4" style={{ color: agent.color }} />
                      <span className="text-sm font-medium text-[var(--navy-900)]">Sample greeting:</span>
                    </div>
                    <p className="text-sm text-[var(--slate-500)] italic">"{agent.audioSample}"</p>
                  </div>
                )}

                {/* WhatsApp Message Block — Claire */}
                {agent.whatsappMessage && (
                  <div 
                    className="p-3 mb-4 rounded-lg border-l-[3px]"
                    style={{ 
                      backgroundColor: "#F5F5F5", 
                      borderLeftColor: agent.color === "var(--claire-amber)" ? "#F59E0B" : agent.color 
                    }}
                  >
                    <p className="text-sm" style={{ color: "#555555" }}>
                      {agent.whatsappMessage}
                    </p>
                  </div>
                )}

                {/* Insight Card — Rex */}
                {agent.insightCard && (
                  <div 
                    className="p-3 mb-4 rounded-lg border-l-[3px]"
                    style={{ 
                      backgroundColor: "#F5F5F5", 
                      borderLeftColor: "#047857" 
                    }}
                  >
                    <p className="text-sm whitespace-pre-line" style={{ color: "#555555" }}>
                      {agent.insightCard}
                    </p>
                  </div>
                )}

                {/* Outcome line — desktop only (hidden on mobile < 768px) */}
                {agent.outcome && (
                  <p className="hidden md:block text-sm font-medium text-[var(--navy-900)] mt-auto pt-4 mb-2">
                    {agent.outcome}
                  </p>
                )}

                {/* Entitlement note */}
                {agent.entitlement && (
                  <p className="text-xs text-[var(--slate-400)] mt-auto pt-2">
                    {agent.entitlement}
                  </p>
                )}

                {/* CTA — Voice Agents Only */}
                {agent.isVoiceAgent && (
                  <a 
                    href="#final-cta"
                    className={`mt-4 inline-flex items-center justify-center w-full rounded-lg border-2 ${agent.borderColor} ${agent.textColor} hover:bg-[${agent.color}]/5 font-medium px-4 h-10 text-sm transition-colors`}
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Hear {agent.name} in Action
                  </a>
                )}
              </motion.div>
            )
          })}
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
          <a 
            href="#final-cta"
            className="inline-flex items-center justify-center rounded-lg bg-[var(--katie-blue)] hover:bg-[var(--katie-blue)]/90 text-white font-semibold px-8 h-11 text-base transition-colors"
          >
            Get Katie answering my calls
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </motion.div>
        {/* Gradient Transition to Dark Section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--off-white)] to-[var(--navy-900)]" />
      </div>
    </section>
  )
}
