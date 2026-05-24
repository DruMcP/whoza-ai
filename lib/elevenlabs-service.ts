// ElevenLabs voice service
// Responsibilities:
// - Voice cloning (contractor voice sample)
// - Voice listing and management
// - Text-to-speech generation for testing
// - Integration with Retell voice_id

import { telephonyConfig, telephonyFeatures } from "./telephony-config";

interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  category: string;
  description?: string;
  preview_url?: string;
}

interface VoiceCloneRequest {
  name: string;
  description?: string;
  files: File[]; // Audio samples
  labels?: Record<string, string>;
}

interface TTSRequest {
  voiceId: string;
  text: string;
  model_id?: string;
  stability?: number;
  similarity_boost?: number;
  style?: number;
  use_speaker_boost?: boolean;
}

export class ElevenLabsService {
  private apiKey: string | undefined;
  private baseUrl: string;

  constructor() {
    this.apiKey = telephonyConfig.elevenLabsApiKey;
    this.baseUrl = telephonyConfig.elevenLabsBaseUrl;
  }

  isConfigured(): boolean {
    return telephonyFeatures.elevenLabsEnabled;
  }

  private async fetch(endpoint: string, options: RequestInit = {}): Promise<any> {
    if (!this.apiKey) {
      console.warn("[ElevenLabs] No API key configured — returning null");
      return null;
    }

    const url = `${this.baseUrl}${endpoint}`;
    const res = await fetch(url, {
      ...options,
      headers: {
        "xi-api-key": this.apiKey,
        "Content-Type": "application/json",
        Accept: options.headers?.["Accept"] || "application/json",
        ...options.headers,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`ElevenLabs API error: ${res.status} ${error}`);
    }

    return res.json();
  }

  // ─── Voice Management ───

  async listVoices(): Promise<ElevenLabsVoice[]> {
    if (!this.isConfigured()) return [];

    try {
      const data = await this.fetch("/voices");
      return (data?.voices || []).map((v: any) => ({
        voice_id: v.voice_id,
        name: v.name,
        category: v.category,
        description: v.description,
        preview_url: v.preview_url,
      }));
    } catch (err) {
      console.error("[ElevenLabs] List voices error:", err);
      return [];
    }
  }

  async getVoice(voiceId: string): Promise<ElevenLabsVoice | null> {
    if (!this.isConfigured()) return null;

    try {
      const data = await this.fetch(`/voices/${voiceId}`);
      if (!data) return null;

      return {
        voice_id: data.voice_id,
        name: data.name,
        category: data.category,
        description: data.description,
        preview_url: data.preview_url,
      };
    } catch (err) {
      console.error("[ElevenLabs] Get voice error:", err);
      return null;
    }
  }

  // ─── Voice Cloning ───

  async cloneVoice(
    name: string,
    audioSamples: Buffer[],
    description?: string
  ): Promise<string | null> {
    if (!this.isConfigured()) return null;

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (description) formData.append("description", description);

      audioSamples.forEach((sample, i) => {
        formData.append("files", new Blob([sample], { type: "audio/wav" }), `sample_${i}.wav`);
      });

      const res = await fetch(`${this.baseUrl}/voices/add`, {
        method: "POST",
        headers: {
          "xi-api-key": this.apiKey!,
        },
        body: formData,
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`ElevenLabs voice clone failed: ${res.status} ${error}`);
      }

      const data = await res.json();
      return data.voice_id || null;
    } catch (err) {
      console.error("[ElevenLabs] Voice clone error:", err);
      return null;
    }
  }

  async deleteVoice(voiceId: string): Promise<boolean> {
    if (!this.isConfigured()) return false;

    try {
      const res = await fetch(`${this.baseUrl}/voices/${voiceId}`, {
        method: "DELETE",
        headers: { "xi-api-key": this.apiKey! },
      });

      return res.ok;
    } catch (err) {
      console.error("[ElevenLabs] Delete voice error:", err);
      return false;
    }
  }

  // ─── Text-to-Speech ───

  async textToSpeech(request: TTSRequest): Promise<Buffer | null> {
    if (!this.isConfigured()) return null;

    try {
      const res = await fetch(`${this.baseUrl}/text-to-speech/${request.voiceId}`, {
        method: "POST",
        headers: {
          "xi-api-key": this.apiKey!,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: request.text,
          model_id: request.model_id || "eleven_monolingual_v1",
          voice_settings: {
            stability: request.stability ?? 0.5,
            similarity_boost: request.similarity_boost ?? 0.75,
            style: request.style ?? 0,
            use_speaker_boost: request.use_speaker_boost ?? true,
          },
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`ElevenLabs TTS failed: ${res.status} ${error}`);
      }

      return Buffer.from(await res.arrayBuffer());
    } catch (err) {
      console.error("[ElevenLabs] TTS error:", err);
      return null;
    }
  }

  async textToSpeechStream(request: TTSRequest): Promise<ReadableStream | null> {
    if (!this.isConfigured()) return null;

    try {
      const res = await fetch(`${this.baseUrl}/text-to-speech/${request.voiceId}/stream`, {
        method: "POST",
        headers: {
          "xi-api-key": this.apiKey!,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: request.text,
          model_id: request.model_id || "eleven_monolingual_v1",
          voice_settings: {
            stability: request.stability ?? 0.5,
            similarity_boost: request.similarity_boost ?? 0.75,
          },
        }),
      });

      if (!res.ok) return null;
      return res.body;
    } catch (err) {
      console.error("[ElevenLabs] TTS stream error:", err);
      return null;
    }
  }
}

export const elevenLabsService = new ElevenLabsService();
