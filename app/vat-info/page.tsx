import { Metadata } from "next"
import { Receipt, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing Information | Whoza.ai",
  description: "Simple, transparent pricing for whoza.ai. No hidden fees, no setup costs, no VAT to add. The price you see is the price you pay.",
  alternates: {
    canonical: "https://whoza.ai/vat-info",
  },
  robots: { index: true, follow: true },
}

export const revalidate = 3600

export default function VatInfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-slate-400 text-lg">
            No hidden fees. No setup costs. No VAT to add. The price you see is the price you pay.
          </p>
        </div>

        <div className="space-y-8">
          {/* No VAT Charged */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-semibold text-white">No VAT Charged</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                <strong className="text-white">WHOZA AI LTD is not currently VAT-registered.</strong> Our annual turnover is below the UK VAT registration threshold (£85,000), so we do not charge VAT on any of our services.
              </p>
              <p>
                This means the price you see on our website is exactly what you pay. No surprises, no tax add-ons at checkout.
              </p>
              <div className="bg-slate-900/50 rounded border border-slate-700 p-4 space-y-2 text-sm mt-4">
                <p className="text-emerald-400 font-semibold">What you see is what you pay:</p>
                <p>Starter Plan: <strong className="text-white">£59/month</strong> — total, no extras</p>
                <p>Growth Plan: <strong className="text-white">£125/month</strong> — total, no extras</p>
                <p>Pro Plan: <strong className="text-white">£230/month</strong> — total, no extras</p>
                <p>Scale Plan: <strong className="text-white">£399/month</strong> — total, no extras</p>
              </div>
            </div>
          </section>

          {/* Company Info */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Receipt className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Company Information</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                <strong className="text-white">Company Name:</strong> WHOZA AI LTD
              </p>
              <p>
                <strong className="text-white">Registered Address:</strong> 6 Atholl Crescent, Perth, PH1 5JN, United Kingdom
              </p>
              <p>
                <strong className="text-white">Company Registration Number:</strong> SC874716 (Scotland)
              </p>
              <p className="text-sm text-slate-400 mt-4">
                If our turnover reaches the UK VAT registration threshold in the future, we will register for VAT and update this page accordingly. At that time, VAT will be applied in line with UK legislation.
              </p>
            </div>
          </section>

          {/* Invoicing */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Receipt className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Invoicing</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                Invoices are issued for all subscription payments and are available in your account dashboard. Our invoices are simple and clear:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Our business name and address</li>
                <li>Your business name and address (if provided)</li>
                <li>Invoice date and unique invoice number</li>
                <li>Description of services</li>
                <li>Total amount due</li>
              </ul>
              <p className="text-sm text-slate-400 mt-4">
                No VAT line item appears on invoices because VAT is not charged.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Receipt className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Questions?</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                For any questions regarding pricing, invoicing, or billing, please contact us:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email: <a href="mailto:dru@whoza.ai" className="text-blue-400 hover:text-blue-300 underline">dru@whoza.ai</a></li>
                <li>Postal: WHOZA AI LTD, 6 Atholl Crescent, Perth, PH1 5JN</li>
              </ul>
            </div>
          </section>

          <p className="text-slate-500 text-sm mt-12 pt-8 border-t border-slate-800">
            Last updated: May 2025
          </p>
        </div>
      </div>
    </div>
  )
}