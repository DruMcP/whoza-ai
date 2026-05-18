import { createClient } from "@supabase/supabase-js"

let _supabase: ReturnType<typeof createClient> | null = null

function getSupabaseClient() {
  if (_supabase) return _supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and anon key must be provided")
  }
  _supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
  return _supabase
}

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    const client = getSupabaseClient()
    return (client as any)[prop]
  },
}) as ReturnType<typeof createClient>

// Edge function invoker helpers
export async function joinWaitlist(data: { email: string; company?: string; name?: string }) {
  const { data: result, error } = await supabase.functions.invoke("join-waitlist", {
    body: data,
  })
  if (error) throw error
  return result as {
    success: boolean
    waitlist_id?: string
    position?: number
    message?: string
  }
}

export async function checkTrialAvailability() {
  const { data: result, error } = await supabase.functions.invoke("check-trial-availability", {
    method: "GET",
  })
  if (error) throw error
  return result as {
    available: boolean
    slots_remaining: number
    slots_total: number
    slots_used: number
    week_starting: string
    reset_at: string
  }
}

export async function getWaitlistStatus(email: string) {
  const { data: result, error } = await supabase.functions.invoke("get-waitlist-status", {
    body: { email },
  })
  if (error) throw error
  return result as {
    on_waitlist: boolean
    position?: number
    status?: string
    created_at?: string
    notified_at?: string
    expires_at?: string
  }
}
