"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, PhoneOff, PhoneForwarded, Voicemail, Clock, MapPin, Wrench, AlertCircle, CheckCircle, XCircle, RotateCcw, ChevronDown, ChevronUp, Play, Pause, Volume2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

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

const statusConfig: Record<string, { label: string; icon: typeof Phone; color: string; bg: string }> = {
  started: { label: "In Progress", icon: Phone, color: "text-blue-600", bg: "bg-blue-50" },
  completed: { label: "Completed", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  qualified: { label: "Qualified", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  booked: { label: "Booked", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  transferred: { label: "Transferred", icon: PhoneForwarded, color: "text-amber-600", bg: "bg-amber-50" },
  voicemail: { label: "Voicemail", icon: Voicemail, color: "text-purple-600", bg: "bg-purple-50" },
  missed: { label: "Missed", icon: PhoneOff, color: "text-red-600", bg: "bg-red-50" },
  declined: { label: "Declined", icon: XCircle, color: "text-gray-600", bg: "bg-gray-50" },
  accepted: { label: "Accepted", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  callback_scheduled: { label: "Callback", icon: RotateCcw, color: "text-blue-600", bg: "bg-blue-50" },
  new: { label: "New", icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-50" },
}

export function CallHistory({ clientId }: { clientId?: string }) {
  const [calls, setCalls] = useState<Call[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [expandedCall, setExpandedCall] = useState<string | null>(null)
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)

  useEffect(() => {
    fetchCalls()

    // Real-time subscription
    const channel = supabase
      .channel("calls-updates")
      .on("postgres_changes", { event: "*", schema: "public", table: "calls" }, (payload) => {
        console.log("[CallHistory] Real-time update:", payload)
        fetchCalls()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [clientId])

  async function fetchCalls() {
    try {
      setLoading(true)
      let query = supabase
        .from("calls")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50)

      if (clientId) {
        query = query.eq("client_id", clientId)
      }

      const { data, error } = await query

      if (error) throw error
      setCalls(data || [])
    } catch (err) {
      console.error("[CallHistory] Fetch error:", err)
      setError("Failed to load calls")
    } finally {
      setLoading(false)
    }
  }

  const filteredCalls = filter === "all"
    ? calls
    : calls.filter(c => c.status === filter || c.outcome === filter)

  const uniqueStatuses = Array.from(new Set(calls.map(c => c.status)))

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatTime = (timestamp: string | null) => {
    if (!timestamp) return "—"
    return new Date(timestamp).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (timestamp: string | null) => {
    if (!timestamp) return "—"
    return new Date(timestamp).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    })
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-8 h-8 border-2 border-[var(--katie-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[var(--slate-500)]">Loading calls…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchCalls}
          className="mt-4 text-[var(--katie-blue)] hover:underline"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-[var(--navy-900)] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All ({calls.length})
        </button>
        {uniqueStatuses.map(status => {
          const count = calls.filter(c => c.status === status).length
          if (count === 0) return null
          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === status
                  ? "bg-[var(--navy-900)] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {statusConfig[status]?.label || status} ({count})
            </button>
          )
        })}
      </div>

      {/* Call List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredCalls.map((call) => {
            const status = statusConfig[call.status] || statusConfig["new"]
            const StatusIcon = status.icon
            const isExpanded = expandedCall === call.id

            return (
              <motion.div
                key={call.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
              >
                {/* Summary Row */}
                <div
                  className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedCall(isExpanded ? null : call.id)}
                >
                  <div className={`w-10 h-10 rounded-xl ${status.bg} flex items-center justify-center shrink-0`}>
                    <StatusIcon className={`w-5 h-5 ${status.color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[var(--navy-900)]">
                        {call.caller_name || "Unknown Caller"}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-[var(--slate-500)]">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        {call.caller_number || "—"}
                      </span>
                      {call.duration_seconds > 0 && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {formatDuration(call.duration_seconds)}
                        </span>
                      )}
                      <span>{formatDate(call.started_at)} · {formatTime(call.started_at)}</span>
                    </div>
                  </div>

                  {call.job_type && (
                    <div className="hidden sm:flex items-center gap-1 text-sm text-[var(--slate-500)]">
                      <Wrench className="w-4 h-4" />
                      {call.job_type}
                    </div>
                  )}

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[var(--slate-500)] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--slate-500)] shrink-0" />
                  )}
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-100"
                    >
                      <div className="p-4 space-y-4">
                        {/* Details Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {call.postcode && (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-[var(--slate-400)]" />
                              <span className="text-[var(--slate-500)]">{call.postcode}</span>
                            </div>
                          )}
                          {call.urgency && (
                            <div className="flex items-center gap-2 text-sm">
                              <AlertCircle className="w-4 h-4 text-[var(--slate-400)]" />
                              <span className="text-[var(--slate-500)] capitalize">{call.urgency}</span>
                            </div>
                          )}
                          {call.outcome && (
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-[var(--slate-400)]" />
                              <span className="text-[var(--slate-500)] capitalize">{call.outcome}</span>
                            </div>
                          )}
                        </div>

                        {/* Transcript */}
                        {call.transcript && (
                          <div className="bg-gray-50 rounded-xl p-4">
                            <h4 className="text-sm font-semibold text-[var(--navy-900)] mb-2">Transcript</h4>
                            <p className="text-sm text-[var(--slate-500)] leading-relaxed">{call.transcript}</p>
                          </div>
                        )}

                        {/* Recording */}
                        {call.recording_url && (
                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setPlayingAudio(playingAudio === call.id ? null : call.id)
                              }}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] hover:bg-[var(--katie-blue)]/20 transition-colors text-sm font-medium"
                            >
                              {playingAudio === call.id ? (
                                <>
                                  <Pause className="w-4 h-4" /> Pause
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4" /> Play Recording
                                </>
                              )}
                            </button>
                            {playingAudio === call.id && (
                              <audio
                                src={call.recording_url}
                                controls
                                autoPlay
                                className="flex-1 h-10"
                                onEnded={() => setPlayingAudio(null)}
                              />
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        {call.status === "new" || call.status === "qualified" ? (
                          <div className="flex items-center gap-2 pt-2">
                            <button
                              onClick={(e) => handleAction(e, call.id, "accept")}
                              className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                            >
                              Accept
                            </button>
                            <button
                              onClick={(e) => handleAction(e, call.id, "call_back")}
                              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                              Call Back
                            </button>
                            <button
                              onClick={(e) => handleAction(e, call.id, "decline")}
                              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 transition-colors"
                            >
                              Decline
                            </button>
                          </div>
                        ) : null}
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
          <Phone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-[var(--slate-500)]">No calls yet</p>
          <p className="text-sm text-[var(--slate-400)] mt-1">Calls will appear here once Katie starts answering</p>
        </div>
      )}
    </div>
  )

  async function handleAction(e: React.MouseEvent, callId: string, action: string) {
    e.stopPropagation()
    try {
      const res = await fetch(`/api/enquiries/${callId}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })
      if (!res.ok) throw new Error("Action failed")
      fetchCalls()
    } catch (err) {
      console.error("[CallHistory] Action failed:", err)
    }
  }
}
