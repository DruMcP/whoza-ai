"use client"

import { useState } from "react"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { PhoneSetup } from "@/components/dashboard/phone-setup"
import { CallHistory } from "@/components/dashboard/call-history"
import { CallNotes } from "@/components/dashboard/call-notes"
import { VoiceSelector } from "@/components/dashboard/voice-selector"
import { useCalls, useCallStats } from "@/hooks/use-calls"
import {
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  Voicemail,
  PhoneOff,
  AlertCircle,
  FileText,
  Mic2,
} from "lucide-react"

export default function DashboardPage() {
  const { calls, loading, error, refetch } = useCalls()
  const stats = useCallStats()
  const [activeTab, setActiveTab] = useState<"calls" | "notes" | "voice">("calls")

  const statCards = [
    { label: "Total", value: stats.total, icon: <Phone className="w-5 h-5" />, color: "bg-blue-500/10 text-blue-400" },
    { label: "New", value: stats.new, icon: <AlertCircle className="w-5 h-5" />, color: "bg-amber-500/10 text-amber-400" },
    { label: "Accepted", value: stats.accepted, icon: <CheckCircle className="w-5 h-5" />, color: "bg-green-500/10 text-green-400" },
    { label: "Completed", value: stats.completed, icon: <CheckCircle className="w-5 h-5" />, color: "bg-emerald-500/10 text-emerald-400" },
    { label: "Declined", value: stats.declined, icon: <XCircle className="w-5 h-5" />, color: "bg-red-500/10 text-red-400" },
    { label: "Missed", value: stats.missed, icon: <PhoneOff className="w-5 h-5" />, color: "bg-gray-500/10 text-gray-400" },
    { label: "Voicemail", value: stats.voicemail, icon: <Voicemail className="w-5 h-5" />, color: "bg-purple-500/10 text-purple-400" },
    { label: "Avg Duration", value: stats.avgDuration > 0 ? `${Math.floor(stats.avgDuration / 60)}m ${stats.avgDuration % 60}s` : "—", icon: <Clock className="w-5 h-5" />, color: "bg-slate-500/10 text-slate-400" },
  ]

  const tabs = [
    { id: "calls" as const, label: "Recent Calls", icon: Phone },
    { id: "notes" as const, label: "Call Notes", icon: FileText },
    { id: "voice" as const, label: "Voice Settings", icon: Mic2 },
  ]

  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Calls Dashboard</h1>
          <p className="text-white/60">
            Real-time view of all calls captured by Katie. {calls.length} calls total.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className={`${stat.color} rounded-xl p-3 border border-white/5`}
            >
              <div className="flex items-center gap-1.5 text-xs font-medium opacity-70 mb-1">
                {stat.icon}
                {stat.label}
              </div>
              <div className="text-xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "text-white border-[var(--katie-blue)]"
                    : "text-white/50 border-transparent hover:text-white/70"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "calls" && (
          <div className="bg-white rounded-2xl overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-[var(--navy-900)]">Recent Calls</h2>
              <button
                onClick={refetch}
                className="text-sm text-[var(--katie-blue)] hover:underline"
              >
                Refresh
              </button>
            </div>
            <div className="p-4">
              <CallHistory />
            </div>
          </div>
        )}

        {activeTab === "notes" && (
          <div className="bg-white rounded-2xl overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-[var(--navy-900)]">Call Notes</h2>
              <p className="text-sm text-[var(--slate-500)] mt-1">
                Searchable text transcripts of all your calls. No audio recordings stored.
              </p>
            </div>
            <div className="p-4">
              <CallNotes calls={calls} loading={loading} error={error} />
            </div>
          </div>
        )}

        {activeTab === "voice" && (
          <div className="bg-white rounded-2xl overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-[var(--navy-900)]">Voice Settings</h2>
              <p className="text-sm text-[var(--slate-500)] mt-1">
                Choose the AI voice that answers your calls. Change anytime.
              </p>
            </div>
            <div className="p-4">
              <VoiceSelector />
            </div>
          </div>
        )}

        {/* Phone Setup */}
        <PhoneSetup />
      </main>

      <Footer />
    </div>
  )
}
