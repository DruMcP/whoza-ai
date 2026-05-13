"use client"

import { motion } from "framer-motion"
import { Shield, Check, X, Phone, Clock, FileText, Bell, MessageCircle, Mail, Smartphone, CheckCircle2 } from "lucide-react"

const controlFeatures = [
  { icon: Check, text: "Accept or decline every enquiry instantly", color: "text-[var(--rex-green)]" },
  { icon: Phone, text: "Request callback before deciding", color: "text-[var(--katie-blue)]" },
  { icon: Clock, text: "Adjust booking time if needed", color: "text-[var(--claire-amber)]" },
  { icon: FileText, text: "See full job details before accepting", color: "text-[var(--mark-grey)]" },
]

const channels = [
  { icon: MessageCircle, name: "WhatsApp" },
  { icon: Smartphone, name: "SMS" },
  { icon: Mail, name: "Email" },
]

export function ControlSection() {
  return (
    <section className="section-padding-lg bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Control Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Full Control
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance reveal">
              You Stay In Control
            </h2>
            <p className="mt-6 text-lg text-[var(--slate-500)] text-pretty">
              Every job comes to you first. You decide which ones to take.
              <span className="block mt-2 font-semibold text-[var(--navy-900)]">Choose how your calls are answered — tone, questions and job types.</span>
            </p>

            <div className="mt-10 space-y-4 reveal-stagger">
              {controlFeatures.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[var(--off-white)] border border-[var(--border)]"
                >
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <span className="text-[var(--navy-900)] font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Multi-Channel + Trust */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Multi-Channel Card */}
            <div className="p-8 rounded-xl bg-[var(--navy-900)] text-white">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-[var(--claire-amber)]" />
                <h3 className="text-xl font-bold">You Never Miss a Job</h3>
              </div>

              <div className="space-y-4">
                <p className="text-white/90 text-sm mb-4">WhatsApp, SMS or email — your choice.</p>
                {channels.map((channel, index) => (
                  <motion.div
                    key={channel.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5"
                  >
                    <channel.icon className="w-6 h-6 text-[var(--rex-green)]" />
                    <span className="font-semibold">{channel.name}</span>
                  </motion.div>
                ))}
              </div>

              <p className="mt-6 text-white/60 text-sm">
                Jobs always reach you, even if one channel fails.
              </p>
            </div>

            {/* Trust Metrics */}
            <div className="p-6 rounded-2xl bg-[var(--off-white)] border border-[var(--border)]">
              <h4 className="font-semibold text-[var(--navy-900)] mb-4">Real-time reliability</h4>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "3 sec", label: "Call answered" },
                  { value: "60 sec", label: "Job qualified" },
                  { value: "Instant", label: "Sent to you" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-[var(--rex-green)]">{stat.value}</div>
                    <div className="text-xs text-[var(--slate-500)] mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
