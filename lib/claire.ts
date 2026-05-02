import { supabase } from "./supabase";

/**
 * Claire Service — Post-Job Conversion Engine
 * 
 * Core business logic for:
 * - Queueing review requests after job completion
 * - Tracking conversion rates
 * - Dashboard metrics
 */

export interface ClaireMetrics {
  totalRequests: number;
  sentCount: number;
  clickedCount: number;
  completedCount: number;
  conversionRate: number; // completed / sent
  clickThroughRate: number; // clicked / sent
  averageRating: number | null;
  pendingCount: number;
  reminderCount: number;
  estimatedJobWinIncrease: number; // calculated: completedCount * avgRating * 0.03
  estimatedRevenueImpact: number; // calculated: estimatedJobWinIncrease * avgJobValue
  avgJobValue: number;
  period: "7d" | "30d" | "90d" | "all";
}

export interface ReviewRequestInput {
  client_id: string;
  customer_name: string;
  phone: string;
  job_type: "emergency" | "standard" | "install";
  job_value?: number;
  review_url: string;
  business_name?: string;
  trillet_call_id?: string;
}

/**
 * Create a review request after job completion
 */
export async function createReviewRequest(input: ReviewRequestInput) {
  const DELAYS = {
    emergency: 2 * 60 * 60 * 1000,  // 2 hours
    standard: 4 * 60 * 60 * 1000,   // 4 hours
    install: 24 * 60 * 60 * 1000,   // 24 hours
  };

  const delay = DELAYS[input.job_type] || DELAYS.standard;
  const sendAt = new Date(Date.now() + delay);

  const { data, error } = await supabase
    .from("review_requests")
    .insert({
      client_id: input.client_id,
      customer_name: input.customer_name,
      phone: input.phone,
      job_type: input.job_type,
      job_value: input.job_value,
      status: "pending",
      review_url: input.review_url,
      trillet_call_id: input.trillet_call_id,
      metadata: {
        business_name: input.business_name,
        scheduled_send_at: sendAt.toISOString(),
      },
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get Claire metrics for dashboard
 */
export async function getClaireMetrics(
  clientId: string,
  period: "7d" | "30d" | "90d" | "all" = "30d"
): Promise<ClaireMetrics> {
  let startDate: string | null = null;
  
  if (period !== "all") {
    const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
    startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  }

  let query = supabase
    .from("review_requests")
    .select("*", { count: "exact" })
    .eq("client_id", clientId);

  if (startDate) {
    query = query.gte("created_at", startDate);
  }

  const { data: allRequests, error, count } = await query;

  if (error) throw error;

  const requests = allRequests || [];
  
  const sent = requests.filter((r) => r.status === "sent" || r.status === "clicked" || r.status === "completed" || r.status === "declined");
  const clicked = requests.filter((r) => r.status === "clicked" || r.status === "completed");
  const completed = requests.filter((r) => r.status === "completed");
  const pending = requests.filter((r) => r.status === "pending");
  const reminders = requests.filter((r) => r.reminder_sent);

  const ratings = completed
    .map((r) => r.rating)
    .filter((r): r is number => r !== null && r !== undefined);

  const avgRating = ratings.length > 0 
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length 
    : null;

  const avgJobValue = 350; // £350 — typical trade job value, configurable per client
  const estimatedJobWinIncrease = Math.round(completedCount * (avgRating || 4.5) * 0.03);
  const estimatedRevenueImpact = Math.round(estimatedJobWinIncrease * avgJobValue);

  return {
    totalRequests: count || 0,
    sentCount: sent.length,
    clickedCount: clicked.length,
    completedCount: completed.length,
    conversionRate: sent.length > 0 ? Math.round((completed.length / sent.length) * 100) : 0,
    clickThroughRate: sent.length > 0 ? Math.round((clicked.length / sent.length) * 100) : 0,
    averageRating: avgRating ? Math.round(avgRating * 10) / 10 : null,
    estimatedJobWinIncrease,
    estimatedRevenueImpact,
    avgJobValue,
    pendingCount: pending.length,
    reminderCount: reminders.length,
    period,
  };
}

/**
 * Get recent review requests for client
 */
export async function getRecentReviewRequests(clientId: string, limit = 10) {
  const { data, error } = await supabase
    .from("review_requests")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

/**
 * Trigger immediate send (for testing or manual override)
 */
export async function sendReviewRequestNow(reviewRequestId: string) {
  const { data, error } = await supabase.functions.invoke("claire-send-request", {
    body: { review_request_id: reviewRequestId },
  });

  if (error) throw error;
  return data;
}

/**
 * Track review request event
 */
export async function trackReviewEvent(
  reviewRequestId: string,
  event: "clicked" | "completed" | "declined",
  metadata?: { rating?: number; platform?: string }
) {
  const { data, error } = await supabase.functions.invoke("claire-track", {
    body: {
      review_request_id: reviewRequestId,
      event,
      ...metadata,
    },
  });

  if (error) throw error;
  return data;
}
