"use client"

import { motion } from "framer-motion"
import { Phone, ArrowRight, Volume2, Eye, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const voiceAgents = [
  {
    name: "Katie",
    role: "Call Capture",
    voice: "Female Voice",
    description: "Katie answers your calls 24/7 in seconds. She books qualified jobs and sends them to your WhatsApp while you work. You pick which jobs to accept.",
    audioSample: "Hi, you've reached Thompson Plumbing. My name is Katie. How can I help you today?",
    image: "/images/katie.jpg",
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
    description: "Mark answers your calls 24/7 in seconds. He books qualified jobs and sends them to your WhatsApp while you work. You pick which jobs to accept.",
    audioSample: "Hi, you've reached Wilson Electrics. This is Mark speaking. What can I do for you?",
    image: "/images/mark.jpg",
    color: "var(--mark-grey)",
    bgLight: "bg-[var(--mark-grey)]/10",
    borderColor: "border-[var(--mark-grey)]/30",
    textColor: "text-[var(--mark-grey)]",
    roleIcon: Phone,
    isVoiceAgent: true,
  },
  {
    name: "Claire",
    role: "Review Capture",
    description: "Claire automatically follows up after every completed job to collect Google reviews. She also monitors review sites and alerts you when competitors get praised or criticised.",
    image: "/images/claire.jpg",
    color: "var(--claire-amber)",
    bgLight: "bg-[var(--claire-amber)]/10",
    borderColor: "border-[var(--claire-amber)]/30",
    textColor: "text-[var(--claire-amber)]",
    roleIcon: Star,
    isVoiceAgent: false,
  },
  {
    name: "Rex",
    role: "AI Visibility + Competitor Tracking",
    description: "Rex tracks which competitors are appearing in ChatGPT, Google AI, and search results — and gives you weekly recommendations on how to show up more. Get more work every week, without ads. Rex shows you what to fix this week so you get more calls and more jobs.",
    image: "/images/rex.jpg",
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
            Meet Your AI Agents
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
            Meet the{" "}
            <span className="text-[var(--rex-green)]">Team</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--slate-500)] text-pretty">
            Choose your call capture voice. Add review collection and competitor tracking for complete job capture.
          </p>
        </motion.div>

        {/* Voice Agent Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-12">
          {voiceAgents.map((agent, index) => {
            const RoleIcon = agent.roleIcon
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-3xl p-8 border-2 ${agent.borderColor} shadow-lg hover:shadow-xl transition-shadow`}
              >
                {/* Role Badge */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${agent.bgLight} ${agent.textColor} text-xs font-bold mb-4`}>
                  <RoleIcon className="w-3.5 h-3.5" />
                  {agent.role}
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={agent.image} 
                    alt={agent.name}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--navy-900)]">{agent.name}</h3>
                    {agent.isVoiceAgent && (
                      <span className={`text-sm font-medium ${agent.textColor}`}>{agent.voice}</span>
                    )}
                  </div>
                </div>

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

                {/* CTA — Voice Agents Only */}
                {agent.isVoiceAgent && (
                  <Button 
                    variant="outline"
                    className={`w-full ${agent.borderColor} ${agent.textColor} hover:bg-[${agent.color}]/5`}
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Hear {agent.name} in Action
                  </Button>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Rex Weekly Output Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="bg-white rounded-2xl p-6 border border-[var(--border)] shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[var(--rex-green)]/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-[var(--rex-green)]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[var(--navy-900)]">Weekly AI Visibility Report — Rex</div>
                <div className="text-xs text-[var(--slate-500)]">Delivered every Monday at 8am</div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-100">
                <TrendingUp className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-red-700">3 competitors appeared in ChatGPT results for "emergency plumber near me"</div>
                  <div className="text-red-600 mt-1">You were not listed. Action: Add "24/7 emergency plumber" to your website meta description.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--rex-green)]/10 border border-[var(--rex-green)]/20">
                <TrendingUp className="w-4 h-4 text-[var(--rex-green)] mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-[var(--navy-900)]">Your competitor "Speedy Plumbers" dropped Google Ads spend by 40%</div>
                  <div className="text-[var(--slate-500)] mt-1">Opportunity: Increase your review collection this week so customers find you first.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--katie-blue)]/10 border border-[var(--katie-blue)]/20">
                <Eye className="w-4 h-4 text-[var(--katie-blue)] mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-[var(--navy-900)]">Google AI Overviews now show 5 local plumbers — you're in position 3</div>
                  <div className="text-[var(--slate-500)] mt-1">To reach position 1: Add 2 more Google reviews this week (you're at 12, position 1 has 18).</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

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
