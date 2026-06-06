"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, FileText, Clock, MapPin, Wrench, AlertCircle, Phone, Trash2, ChevronDown, ChevronUp } from "lucide-react"

interface Call {
  id: string
  call_id: string
  caller_name: string | null
  caller_number: string | null
  status: string
  duration_seconds: number
  started_at: string | null
  ended_at: string | null
  job_type: string | null
  postcode: string | null
  urgency: string | null
  transcript: string | null
  recording_url: string | null
  outcome: string | null
  created_at: string
}

const urgencyConfig: Record<string, { label: string; color: string; bg: string; emoji: string }> = {
  emergency: { label: "EMERGENCY", color: "text-red-600", bg: "bg-red-50", emoji: "🔴" },
  red: { label: "EMERGENCY", color: "text-red-600", bg: "bg-red-50", emoji: "🔴" },
  urgent: { label: "URGENT", color: "text-orange-600", bg: "bg-orange-50", emoji: "🟠" },
  amber: { label: "URGENT", color: "text-orange-600", bg: "bg-orange-50", emoji: "🟠" },
  standard: { label: "STANDARD", color: "text-green-600", bg: "bg-green-50", emoji: "🟢" },
  green: { label: "STANDARD", color: "text-green-600", bg: "bg-green-50", emoji: "🟢" },
}

export function CallNotes({ calls, loading, error }: { calls: Call[]; loading: boolean; error: string | null }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedNote, setExpandedNote] = useState<string | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  const filteredCalls = calls.filter((call) => {
    const matchesSearch =
      searchQuery === "" ||
      call.transcript?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.caller_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.job_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.postcode?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPriority =
      priorityFilter === "all" ||
      call.urgency?.toLowerCase() === priorityFilter.toLowerCase() ||
      (priorityFilter === "emergency" && (call.urgency === "emergency" || call.urgency === "red")) ||
      (priorityFilter === "urgent" && (call.urgency === "urgent" || call.urgency === "amber")) ||
      (priorityFilter === "standard" && (call.urgency === "standard" || call.urgency === "green" || !call.urgency))

    return matchesSearch && matchesPriority && call.transcript
  })

  const formatDate = (timestamp: string | null) => {
    if (!timestamp) return "—"
    return new Date(timestamp).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-8 h-8 border-2 border-[var(--katie-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[var(--slate-500)]">Loading call notes…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--slate-400)]" />
          <input
            type="text"
            placeholder="Search transcripts, names, job types, postcodes…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[var(--navy-900)] placeholder:text-[var(--slate-400)] focus:outline-none focus:border-[var(--katie-blue)]"
          />
        </div>
        <div className="flex gap-2">
          {[
            { id: "all", label: "All", count: calls.filter((c) => c.transcript).length },
            { id: "emergency", label: "Emergency", count: calls.filter((c) => c.urgency === "emergency" || c.urgency === "red").length },
            { id: "urgent", label: "Urgent", count: calls.filter((c) => c.urgency === "urgent" || c.urgency === "amber").length },
            { id: "standard", label: "Standard", count: calls.filter((c) => c.urgency === "standard" || c.urgency === "green" || !c.urgency).length },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setPriorityFilter(filter.id)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                priorityFilter === filter.id
                  ? "bg-[var(--navy-900)] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Call Notes List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredCalls.map((call) => {
            const urgency = urgencyConfig[call.urgency || "standard"] || urgencyConfig["standard"]
            const isExpanded = expandedNote === call.id

            return (
              <motion.div
                key={call.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
              >
                {/* Summary Row */}
                <div
                  className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setExpandedNote(isExpanded ? null : call.id)}
                >
                  <div className={`w-10 h-10 rounded-xl ${urgency.bg} flex items-center justify-center shrink-0 text-lg`}>
                    {urgency.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[var(--navy-900)]">
                        {call.caller_name || "Unknown Caller"}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${urgency.bg} ${urgency.color}`}>
                        {urgency.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-[var(--slate-500)]">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        {call.caller_number || "—"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDuration(call.duration_seconds)}
                      </span>
                      <span>{formatDate(call.started_at)}</span>
                      {call.job_type && (
                        <span className="flex items-center gap-1">
                          <Wrench className="w-3.5 h-3.5" />
                          {call.job_type}
                        </span>
                      )}
                      {call.postcode && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {call.postcode}
                        </span>
                      )}
                    </div>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[var(--slate-500)] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--slate-500)] shrink-0" />
                  )}
                </div>

                {/* Expanded Transcript */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-200"
                    >
                      <div className="p-4 space-y-4">
                        <div className="bg-white rounded-xl p-4 border border-gray-100">
                          <div className="flex items-center gap-2 mb-3">
                            <FileText className="w-4 h-4 text-[var(--katie-blue)]" />
                            <h4 className="text-sm font-semibold text-[var(--navy-900)]">Call Transcript</h4>
                          </div>
                          <p className="text-sm text-[var(--slate-500)] leading-relaxed whitespace-pre-wrap">
                            {call.transcript}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-[var(--slate-400)]">
                            Call ID: {call.call_id} · Retention: 30 days (Starter)
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              // TODO: Implement delete call note API
                              console.log("Delete call note:", call.id)
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete Note
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {filteredCalls.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-[var(--slate-500)]">
            {searchQuery || priorityFilter !== "all"
              ? "No call notes match your search"
              : "No call notes yet — transcripts appear after calls are processed"}
          </p>
        </div>
      )}
    </div>
  )
}
