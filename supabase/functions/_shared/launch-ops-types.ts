// Launch Ops Agent System - Shared Types
// These types are used across all agent Edge Functions

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Campaign status workflow
export type CampaignStatus =
  | 'draft'
  | 'strategizing'
  | 'creating'
  | 'reviewing'
  | 'approved'
  | 'scheduled'
  | 'completed'
  | 'failed';

// Social media platforms
export type Platform = 'linkedin' | 'instagram' | 'youtube_shorts' | 'twitter';

// Content bucket types (Proof, Education, Offer)
export type ContentBucket = 'proof' | 'education' | 'offer';

// Compliance status
export type ComplianceStatus = 'pending' | 'approved' | 'rejected';
export type ComplianceScore = 'low' | 'medium' | 'high';

// Media types
export type MediaType = 'image' | 'video' | 'carousel' | 'none';

// Agent names
export type AgentName = 'orchestrator' | 'mara' | 'cody' | 'leo' | 'scheduler';

// Agent log status
export type AgentLogStatus = 'success' | 'error' | 'retry';

// Campaign memory content types
export type MemoryContentType = 'successful_post' | 'failed_post' | 'strategy' | 'learning';

// ============================================
// TABLE INTERFACES
// ============================================

export interface LaunchOpsCampaign {
  id: string;
  created_at: string | null;
  updated_at: string | null;
  name: string;
  goal: string;
  status: CampaignStatus | null;
  target_trade: string;
  target_territory: string | null;
  strategy_brief: Json | null;
  content_mix: Json | null;
  performance_metrics: Json | null;
  learnings: string | null;
  approved_by: string | null;
  approved_at: string | null;
}

export interface LaunchOpsPost {
  id: string;
  campaign_id: string | null;
  created_at: string | null;
  platform: Platform;
  content_bucket: ContentBucket;
  caption: string;
  hook: string | null;
  cta: string | null;
  hashtags: string[] | null;
  media_type: MediaType | null;
  media_url: string | null;
  media_concept: string | null;
  compliance_status: ComplianceStatus | null;
  compliance_score: ComplianceScore | null;
  compliance_notes: string | null;
  content_hash: string | null;
  scheduled_for: string | null;
  buffer_post_id: string | null;
  published_at: string | null;
  version: number | null;
  parent_post_id: string | null;
}

export interface AgentLog {
  id?: string;
  created_at?: string | null;
  campaign_id: string | null;
  post_id: string | null;
  agent_name: AgentName;
  action: string;
  input_data: Json | null;
  output_data: Json | null;
  model_used: string | null;
  prompt_tokens: number | null;
  completion_tokens: number | null;
  latency_ms: number | null;
  status: AgentLogStatus | null;
  error_message: string | null;
}

export interface BrandGuardrails {
  id: string;
  version: string;
  created_at: string | null;
  is_active: boolean | null;
  guardrails: BrandGuardrailsConfig;
}

export interface CampaignMemory {
  id: string;
  created_at: string | null;
  campaign_id: string | null;
  post_id: string | null;
  content_type: MemoryContentType;
  content_text: string;
  metadata: Json | null;
  embedding: string | null;
}

// ============================================
// BRAND GUARDRAILS CONFIG STRUCTURE
// ============================================

export interface BrandGuardrailsConfig {
  pricing: {
    allowed_exact: string[];
    forbidden_patterns: string[];
  };
  claims: {
    require_evidence: string[];
    forbidden_unsubstantiated: string[];
  };
  ctas: {
    allowed_destinations: string[];
    utm_required: boolean;
    soft_ctas: string[];
    hard_ctas: string[];
  };
  audience: {
    allowed_trades: string[];
    uk_focus: boolean;
  };
  tone: {
    forbidden_words: string[];
    required_tone: string;
  };
  platform_rules: {
    linkedin: PlatformRules;
    instagram: InstagramRules;
    youtube_shorts: YouTubeRules;
  };
}

export interface PlatformRules {
  max_length: number;
  max_paragraphs?: number;
  emoji_max: number;
}

export interface InstagramRules extends PlatformRules {
  visible_length: number;
  hashtag_max: number;
}

export interface YouTubeRules {
  title_max: number;
  description_max: number;
}

// ============================================
// AGENT INPUT/OUTPUT TYPES
// ============================================

// Leo (Compliance Agent) types
export interface LeoInput {
  content: string;
  platform: Platform;
  post_id?: string;
  campaign_id?: string;
}

export interface LeoOutput {
  approved: boolean;
  risk_level: ComplianceScore;
  issues: ComplianceIssue[];
  suggestions: string[];
}

export interface ComplianceIssue {
  type: 'forbidden_word' | 'unsubstantiated_claim' | 'length_exceeded' | 'invalid_cta' | 'missing_utm' | 'tone_violation';
  text: string;
  reason: string;
  severity: ComplianceScore;
}

// Cody (Content Creator Agent) types
export interface CodyInput {
  campaign_id: string;
  campaign_goal: string;
  target_trade: string;
  platform: Platform;
  content_bucket: ContentBucket;
  tone?: string;
  examples?: string[];
}

export interface CodyOutput {
  caption: string;
  hook: string;
  cta: string;
  hashtags: string[];
  media_concept: string;
  media_type: MediaType;
}

// MARA (Strategy Agent) types
export interface MARAInput {
  campaign_id: string;
  campaign_goal: string;
  target_trade: string;
  target_territory?: string;
  duration_weeks: number;
}

export interface MARAOutput {
  strategy_brief: string;
  content_calendar: ContentCalendarItem[];
  key_messages: string[];
  success_metrics: string[];
}

export interface ContentCalendarItem {
  week: number;
  day: string;
  platform: Platform;
  content_bucket: ContentBucket;
  topic: string;
}

// Orchestrator types
export interface OrchestratorInput {
  action: 'create_campaign' | 'generate_content' | 'check_compliance' | 'approve_post' | 'reject_post' | 'get_status';
  campaign_id?: string;
  post_id?: string;
  campaign_goal?: string;
  target_trade?: string;
  target_territory?: string;
  duration_weeks?: number;
  rejection_reason?: string;
}

export interface OrchestratorOutput {
  success: boolean;
  message: string;
  campaign_id?: string;
  post_id?: string;
  status?: CampaignStatus;
  data?: Json;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface AgentResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  agent: AgentName;
  latency_ms: number;
}
