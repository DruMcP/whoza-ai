"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"

export interface Call {
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

export function useCalls(clientId?: string) {
  const [calls, setCalls] = useState<Call[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCalls = useCallback(async () => {
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
    } catch (err: any) {
      console.error("[useCalls] Fetch error:", err)
      setError(err.message || "Failed to load calls")
    } finally {
      setLoading(false)
    }
  }, [clientId])

  useEffect(() => {
    fetchCalls()

    const channel = supabase
      .channel("calls-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "calls" },
        (payload) => {
          console.log("[useCalls] Real-time update:", payload)
          // For inserts, prepend to list. For updates, replace in place.
          if (payload.eventType === "INSERT") {
            setCalls((prev) => [payload.new as Call, ...prev].slice(0, 50))
          } else if (payload.eventType === "UPDATE") {
            setCalls((prev) =>
              prev.map((c) => (c.id === payload.new.id ? (payload.new as Call) : c))
            )
          } else if (payload.eventType === "DELETE") {
            setCalls((prev) => prev.filter((c) => c.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchCalls])

  return { calls, loading, error, refetch: fetchCalls }
}

export function useCallStats(clientId?: string) {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    accepted: 0,
    declined: 0,
    completed: 0,
    missed: 0,
    voicemail: 0,
    avgDuration: 0,
  })

  const { calls } = useCalls(clientId)

  useEffect(() => {
    const total = calls.length
    const newCount = calls.filter((c) => c.status === "new").length
    const accepted = calls.filter((c) => c.status === "accepted").length
    const declined = calls.filter((c) => c.status === "declined").length
    const completed = calls.filter((c) => c.status === "completed").length
    const missed = calls.filter((c) => c.status === "missed").length
    const voicemail = calls.filter((c) => c.status === "voicemail").length
    const avgDuration = total > 0
      ? Math.round(calls.reduce((sum, c) => sum + (c.duration_seconds || 0), 0) / total)
      : 0

    setStats({ total, new: newCount, accepted, declined, completed, missed, voicemail, avgDuration })
  }, [calls])

  return stats
}
