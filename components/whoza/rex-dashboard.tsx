"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Target, TrendingUp, Shield, MessageSquare, Lightbulb, Award, ArrowRight, Clock, CheckCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface PillarScore {
  id: string
  name: string
  score: number
  maxScore: number
  description: string
  icon: string
  color: string
}

interface Evaluation {
  id: string
  entity_clarity_score: number
  consensus_score: number
  answer_readiness_score: number
  risk_reduction_score: number
  confidence_score: number
  weakest_pillar: string
  created_at: string
}

interface Recommendation {
  id: string
  target_pillar: string
  action_type: string
  title: string
  explanation: string
  exact_copy: string | null
  expected_impact: string
  estimated_minutes: number
  status: string
}

const PILLAR_ICONS: Record<string, React.ReactNode> = {
  CLARITY: <Target className="w-6 h-6" />,
  CONSENSUS: <TrendingUp className="w-6 h-6" />,
  ANSWERABILITY: <MessageSquare className="w-6 h-6" />,
  SAFETY: <Shield className="w-6 h-6" />,
  CONTEXT: <Lightbulb className="w-6 h-6" />,
}

export default function RexDashboard() {
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"overview" | "recommendations" | "history">("overview")

  useEffect(() => {
    loadRexData()
  }, [])

  const loadRexData = async () => {
    try {
      // Get latest evaluation
      const { data: evalData } = await supabase
        .from("rex_ece_evaluations")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (evalData) {
        setEvaluation(evalData)

        // Get recommendations for this evaluation
        const { data: recs } = await supabase
          .from("rex_recommendations")
          .select("*")
          .eq("evaluation_id", evalData.id)
          .order("created_at", { ascending: false })

        setRecommendations(recs || [])
      }
    } catch (error) {
      console.error("Error loading Rex data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    if (score >= 40) return "text-orange-400"
    return "text-red-400"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-400/20"
    if (score >= 60) return "bg-yellow-400/20"
    if (score >= 40) return "bg-orange-400/20"
    return "bg-red-400/20"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--navy-900)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[var(--rex-green)] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white/60">Loading Rex analysis...</p>
        </div>
      </div>
    )
  }

  if (!evaluation) {
    return (
      <div className="min-h-screen bg-[var(--navy-900)] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Award className="w-16 h-16 text-[var(--rex-green)] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Rex Analysis Yet</h2>
          <p className="text-white/60 mb-6">
            Run your first ECE evaluation to see your AI growth score and get personalized recommendations.
          </p>
          <button
            className="bg-[var(--rex-green)] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
            onClick={() => {
              // Trigger evaluation via API
            }}
          >
            Start Evaluation
          </button>
        </div>
      </div>
    )
  }

  const pillars = [
    { id: "CLARITY", name: "Entity Clarity", score: evaluation.entity_clarity_score, description: "How clearly AI can identify your business" },
    { id: "CONSENSUS", name: "Consensus", score: evaluation.consensus_score, description: "Agreement across sources" },
    { id: "ANSWERABILITY", name: "Answer Readiness", score: evaluation.answer_readiness_score, description: "Content ready for AI answers" },
    { id: "SAFETY", name: "Risk Reduction", score: evaluation.risk_reduction_score, description: "Trust and safety signals" },
    { id: "CONTEXT", name: "Confidence", score: evaluation.confidence_score, description: "Relevance and momentum" },
  ]

  const overallScore = Math.round(
    (evaluation.entity_clarity_score +
      evaluation.consensus_score +
      evaluation.answer_readiness_score +
      evaluation.risk_reduction_score +
      evaluation.confidence_score) /
      5
  )

  return (
    <section className="min-h-screen bg-[var(--navy-900)] py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-[var(--rex-green)]" />
            <h1 className="text-3xl font-bold text-white">Rex AI Visibility Engine</h1>
          </div>
          <p className="text-white/60">
            Entity Confidence Evaluation — How clearly AI sees and recommends your business
          </p>
        </div>

        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--navy-800)] rounded-2xl p-8 border border-white/10 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white/60 text-sm mb-1">Overall AI Visibility Score</div>
              <div className={`text-5xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}/100</div>
              <div className="text-white/40 text-sm mt-1">
                {overallScore >= 80
                  ? "Excellent — AI will confidently recommend you"
                  : overallScore >= 60
                    ? "Good — Some improvements needed"
                    : overallScore >= 40
                      ? "Fair — Significant gaps to address"
                      : "Poor — AI struggles to identify your business"}
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/60 text-sm mb-1">Weakest Pillar</div>
              <div className="text-white font-semibold capitalize">
                {evaluation.weakest_pillar.replace("_", " ")}
              </div>
              <div className="text-white/40 text-sm">Focus here first</div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "overview", label: "Pillar Breakdown" },
            { id: "recommendations", label: "Recommendations", count: recommendations.length },
            { id: "history", label: "History" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === tab.id
                  ? "bg-[var(--rex-green)] text-white"
                  : "bg-[var(--navy-800)] text-white/60 hover:text-white"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Pillar Breakdown */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.id}
                whileHover={{ scale: 1.02 }}
                className={`rounded-xl p-6 border ${
                  pillar.id === evaluation.weakest_pillar.toUpperCase()
                    ? "border-red-400/30 bg-red-400/5"
                    : "border-white/10 bg-[var(--navy-800)]"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={getScoreBg(pillar.score)}>
                      {PILLAR_ICONS[pillar.id]}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{pillar.name}</div>
                      <div className="text-sm text-white/40">{pillar.description}</div>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(pillar.score)}`}>{pillar.score}</div>
                </div>

                <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      pillar.score >= 80
                        ? "bg-green-400"
                        : pillar.score >= 60
                          ? "bg-yellow-400"
                          : pillar.score >= 40
                            ? "bg-orange-400"
                            : "bg-red-400"
                    }`}
                    style={{ width: `${pillar.score}%` }}
                  />
                </div>

                {pillar.id === evaluation.weakest_pillar.toUpperCase() && (
                  <div className="mt-3 flex items-center gap-2 text-red-400 text-sm">
                    <ArrowRight className="w-4 h-4" />
                    Weakest pillar — focus here first
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {activeTab === "recommendations" && (
          <div className="space-y-4">
            {recommendations.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/40">No active recommendations. Run a new evaluation to generate actions.</p>
              </div>
            ) : (
              recommendations.map((rec) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[var(--navy-800)] rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-[var(--rex-green)] text-sm font-medium mb-1">
                        {rec.target_pillar.replace("_", " ").toUpperCase()}
                      </div>
                      <h3 className="text-white font-semibold text-lg">{rec.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <Clock className="w-4 h-4" />
                      {rec.estimated_minutes} min
                    </div>
                  </div>

                  <p className="text-white/70 mb-4">{rec.explanation}</p>

                  {rec.exact_copy && (
                    <div className="bg-white/5 rounded-lg p-4 mb-4 border-l-2 border-[var(--rex-green)]">
                      <div className="text-white/40 text-xs mb-1">Suggested copy</div>
                      <div className="text-white font-medium">{rec.exact_copy}</div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-white/40 text-sm">
                      <span className="text-[var(--rex-green)]">Impact: </span>{rec.expected_impact}
                    </div>
                    <div className="flex gap-2">
                      {rec.status === "draft" && (
                        <button className="bg-[var(--rex-green)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
                          Start Now
                        </button>
                      )}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          rec.status === "completed"
                            ? "bg-green-400/20 text-green-400"
                            : rec.status === "in_progress"
                              ? "bg-yellow-400/20 text-yellow-400"
                              : "bg-white/10 text-white/60"
                        }`}
                      >
                        {rec.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* History */}
        {activeTab === "history" && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">Evaluation history will appear here after multiple evaluations.</p>
          </div>
        )}
      </div>
    </section>
  )
}
