import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { AudioDemo } from "@/components/whoza/audio-demo"
import { FinalCTA } from "@/components/whoza/final-cta"

export const metadata: Metadata = {
  title: "Hear Katie Handle a Call | Whoza.ai",
  description: "Listen to a real sample call where Katie, our AI voice agent, answers a plumbing emergency enquiry, captures details, and books the job — all in 60 seconds.",
  alternates: {
    canonical: "https://whoza.ai/sample-call",
  },
}

export default function SampleCallPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Hear Katie in Action
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Listen to a real 60-second call where Katie answers a plumbing emergency, 
              captures the customer&apos;s details, and books the job — while you&apos;re on another job.
            </p>
          </div>
          
          <AudioDemo />
          
          <div className="mt-16 text-center">
            <p className="text-slate-400 mb-6">
              This is exactly how Katie handles every call to your business.
            </p>
            <div className="inline-flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/pricing"
                className="px-8 py-4 bg-[#2DD4BF] hover:bg-[#14B8A6] text-[#0F172A] font-semibold rounded-xl transition-colors"
              >
                Start Free Trial
              </a>
              <a
                href="/"
                className="px-8 py-4 border border-[#334155] hover:border-[#2DD4BF] text-white font-semibold rounded-xl transition-colors"
              >
                Back to Homepage
              </a>
            </div>
          </div>
        </div>
      </main>
      <FinalCTA />
      <Footer />
    </>
  )
}
