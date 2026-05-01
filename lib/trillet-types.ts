# Trillet API Types and Interfaces

export interface TrilletCallEvent {
  event: 'call.started' | 'call.completed' | 'call.transferred' | 'appointment.booked' | 'lead.captured' | 'voicemail.left';
  callId: string;
  agentId: string;
  workspaceId: string;
  timestamp: string;
  duration?: number;
  recordingUrl?: string;
  transcript?: string;
  customer?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  outcome?: 'booked' | 'qualified' | 'voicemail' | 'transferred' | 'missed';
  appointment?: {
    date?: string;
    time?: string;
    service?: string;
  };
  customVariables?: Record<string, string>;
}

export interface TrilletAgentConfig {
  workspaceId: string;
  agentId: string;
  mode: 'voice' | 'text';
  variables?: Record<string, string>;
}

export interface TrilletCreateAgentRequest {
  name: string;
  voice?: string;
  language?: string;
  knowledgeBaseUrls?: string[];
  greeting?: string;
  capabilities?: ('appointment_booking' | 'lead_capture' | 'faq' | 'transfer')[];
  transferNumber?: string;
  businessHours?: {
    timezone: string;
    schedule: Record<string, { open: string; close: string }>;
  };
}

export interface TrilletCreateFlowRequest {
  name: string;
  agentId: string;
  steps: TrilletFlowStep[];
}

export interface TrilletFlowStep {
  id: string;
  type: 'greeting' | 'question' | 'booking' | 'transfer' | 'voicemail' | 'end';
  message?: string;
  variableName?: string;
  condition?: {
    variable: string;
    operator: 'equals' | 'contains' | 'exists';
    value: string;
    trueStepId: string;
    falseStepId: string;
  };
}

export interface TrilletInitiateCallRequest {
  agentId: string;
  phoneNumber: string;
  variables?: Record<string, string>;
  callbackUrl?: string;
}
