"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Check, AlertCircle, Loader2, ArrowRight, Globe } from "lucide-react"
import { trilletServer } from "@/lib/trillet-server"

interface PhoneNumber {
  phoneNumber: string
  country: string
  areaCode: string
  city: string
  type: "local" | "mobile" | "tollfree"
  monthlyCost: number
}

const MOCK_UK_NUMBERS: PhoneNumber[] = [
  { phoneNumber: "+442039567001", country: "GB", areaCode: "020", city: "London", type: "local", monthlyCost: 3.99 },
  { phoneNumber: "+441619680002", country: "GB", areaCode: "0161", city: "Manchester", type: "local", monthlyCost: 3.99 },
  { phoneNumber: "+44121680003", country: "GB", areaCode: "0121", city: "Birmingham", type: "local", monthlyCost: 3.99 },
  { phoneNumber: "+441134560004", country: "GB", areaCode: "0113", city: "Leeds", type: "local", monthlyCost: 3.99 },
  { phoneNumber: "+441414340005", country: "GB", areaCode: "0141", city: "Glasgow", type: "local", monthlyCost: 3.99 },
  { phoneNumber: "+441179340006", country: "GB", areaCode: "0117", city: "Bristol", type: "local", monthlyCost: 3.99 },
  { phoneNumber: "+441513190007", country: "GB", areaCode: "0151", city: "Liverpool", type: "local", monthlyCost: 3.99 },
  { phoneNumber: "+441312200008", country: "GB", areaCode: "0131", city: "Edinburgh", type: "local", monthlyCost: 3.99 },
]

export function PhoneSetup() {
  const [step, setStep] = useState<"search" | "select" | "confirm" | "provisioning" | "done">("search")
  const [selectedNumber, setSelectedNumber] = useState<PhoneNumber | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleProvision() {
    if (!selectedNumber) return
    setStep("provisioning")
    setIsLoading(true)
    setError(null)

    try {
      // In mock mode, this returns immediately. In real mode, it provisions.
      await trilletServer.provisionNumber(selectedNumber.phoneNumber, "katie-agent")
      setStep("done")
    } catch (err: any) {
      setError(err.message || "Failed to provision number")
      setStep("confirm")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-[var(--navy-900)] flex items-center gap-2">
          <Phone className="w-5 h-5 text-[var(--katie-blue)]" />
          Phone Number Setup
        </h2>
        <p className="text-sm text-[var(--slate-500)] mt-1">
          Choose a UK number for Katie to answer. Your existing number can forward to this one.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === "search" && (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-[var(--slate-400)]" />
              <span className="text-sm font-medium text-[var(--navy-900)]">United Kingdom</span>
            </div>
            <button
              onClick={() => setStep("select")}
              className="w-full py-3 px-4 rounded-xl bg-[var(--katie-blue)] text-white font-medium hover:bg-[var(--katie-blue)]/90 transition-colors flex items-center justify-center gap-2"
            >
              Browse Available Numbers
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-[var(--slate-400)] mt-3 text-center">
              {trilletServer.isMockMode() && "(Mock mode — showing example numbers. Real numbers appear once trial starts.)"}
            </p>
          </motion.div>
        )}

        {step === "select" && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 space-y-3"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[var(--navy-900)]">Available Numbers</span>
              <button
                onClick={() => setStep("search")}
                className="text-xs text-[var(--katie-blue)] hover:underline"
              >
                Back
              </button>
            </div>

            {MOCK_UK_NUMBERS.map((num) => (
              <button
                key={num.phoneNumber}
                onClick={() => {
                  setSelectedNumber(num)
                  setStep("confirm")
                }}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  selectedNumber?.phoneNumber === num.phoneNumber
                    ? "border-[var(--katie-blue)] bg-[var(--katie-blue)]/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[var(--navy-900)]">
                      {num.phoneNumber}
                    </div>
                    <div className="text-sm text-[var(--slate-500)]">
                      {num.city} · {num.type} · {num.areaCode}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-[var(--slate-500)]">
                    £{num.monthlyCost.toFixed(2)}/mo
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {step === "confirm" && selectedNumber && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 space-y-4"
          >
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-[var(--slate-500)] mb-1">Selected Number</div>
              <div className="text-2xl font-bold text-[var(--navy-900)]">{selectedNumber.phoneNumber}</div>
              <div className="text-sm text-[var(--slate-500)] mt-1">
                {selectedNumber.city} · {selectedNumber.type}
              </div>
            </div>

            <div className="space-y-2 text-sm text-[var(--slate-500)]">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span>Katie will answer calls to this number</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span>Enquiries forwarded to your WhatsApp</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span>You can port this number later if needed</span>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep("select")}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-200 font-medium text-[var(--slate-500)] hover:bg-gray-50 transition-colors"
              >
                Change
              </button>
              <button
                onClick={handleProvision}
                className="flex-1 py-3 px-4 rounded-xl bg-[var(--katie-blue)] text-white font-medium hover:bg-[var(--katie-blue)]/90 transition-colors"
              >
                Confirm & Provision
              </button>
            </div>
          </motion.div>
        )}

        {step === "provisioning" && (
          <motion.div
            key="provisioning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-12 text-center"
          >
            <Loader2 className="w-8 h-8 text-[var(--katie-blue)] animate-spin mx-auto mb-4" />
            <p className="text-[var(--navy-900)] font-medium">Provisioning your number…</p>
            <p className="text-sm text-[var(--slate-500)] mt-2">
              This usually takes 30–60 seconds
            </p>
          </motion.div>
        )}

        {step === "done" && selectedNumber && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 space-y-4"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--navy-900)]">Number Active</h3>
              <p className="text-[var(--slate-500)]">{selectedNumber.phoneNumber} is ready</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2">
              <p className="font-medium text-[var(--navy-900)]">Next Steps:</p>
              <div className="flex items-start gap-2">
                <span className="text-[var(--katie-blue)] font-bold">1.</span>
                <span className="text-[var(--slate-500)]">Forward your existing number to {selectedNumber.phoneNumber}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--katie-blue)] font-bold">2.</span>
                <span className="text-[var(--slate-500)]">Test: call the number and hear Katie answer</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--katie-blue)] font-bold">3.</span>
                <span className="text-[var(--slate-500)]">Check WhatsApp for the test enquiry</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
