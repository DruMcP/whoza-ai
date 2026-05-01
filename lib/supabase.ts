import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

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
