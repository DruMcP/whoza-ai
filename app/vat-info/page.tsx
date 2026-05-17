import { Metadata } from "next"
import { ChevronRight, Receipt } from "lucide-react"

export const metadata: Metadata = {
  title: "VAT Information | Whoza.ai",
  description: "VAT registration details and tax information for WHOZA AI LTD, including UK VAT number and invoicing policies.",
  alternates: {
    canonical: "https://whoza.ai/vat-info",
  },
  robots: { index: true, follow: true },
}

export default function VatInfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            VAT Information
          </h1>
          <p className="text-slate-400 text-lg">
            UK VAT registration and tax details for WHOZA AI LTD
          </p>
        </div>

        <div className="space-y-8">
          {/* VAT Registration */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Receipt className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">VAT Registration</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                <strong className="text-white">Company Name:</strong> WHOZA AI LTD
              </p>
              <p>
                <strong className="text-white">UK VAT Registration Number:</strong> [Pending Registration — will be updated once HMRC issues number]
              </p>
              <p>
                <strong className="text-white">Registered Address:</strong> 6 Atholl Crescent, Perth, PH1 5JN, United Kingdom
              </p>
              <p>
                <strong className="text-white">Company Registration Number:</strong> SC874716 (Scotland)
              </p>
              <p className="text-sm text-slate-400 mt-4">
                Note: As a newly incorporated company, we are in the process of registering for VAT with HMRC. Once our VAT number is issued, it will be displayed here and on all invoices.
              </p>
            </div>
          </section>

          {/* Pricing and VAT */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Pricing and VAT</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                All prices displayed on whoza.ai are quoted <strong className="text-white">exclusive of VAT</strong> unless otherwise stated. VAT is applied at the prevailing UK standard rate (currently 20%) at checkout.
              </p>
              <p>
                Example pricing breakdown:
              </p>
              <div className="bg-slate-900/50 rounded border border-slate-700 p-4 space-y-2 text-sm">
                <p>Starter Plan: £59.00 + £11.80 VAT = <strong className="text-white">£70.80 total</strong></p>
                <p>Growth Plan: £125.00 + £25.00 VAT = <strong className="text-white">£150.00 total</strong></p>
                <p>Pro Plan: £230.00 + £46.00 VAT = <strong className="text-white">£276.00 total</strong></p>
                <p>Scale Plan: £399.00 + £79.80 VAT = <strong className="text-white">£478.80 total</strong></p>
              </div>
              <p className="text-sm text-slate-400">
                Prices may be subject to change. VAT rates are determined by UK legislation and may change in accordance with government policy.
              </p>
            </div>
          </section>

          {/* Invoicing */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Invoicing</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                VAT invoices are issued for all subscription payments and are available in your account dashboard. Invoices include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Our business name and address</li>
                <li>Your business name and address (if provided)</li>
                <li>VAT registration number (once issued)</li>
                <li>Invoice date and unique invoice number</li>
                <li>Description of services</li>
                <li>Net amount, VAT amount, and gross total</li>
                <li>VAT rate applied</li>
              </ul>
            </div>
          </section>

          {/* Reverse Charge */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Business Customers (B2B)</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                If you are a VAT-registered business customer in the UK, you may be able to reclaim the VAT charged on our services. Please ensure your VAT registration number is provided in your account settings for proper invoicing.
              </p>
              <p>
                For EU business customers (outside UK), VAT may be charged under the reverse charge mechanism depending on your location and VAT status. Please contact us for specific guidance.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Tax Questions</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 text-slate-300">
              <p>
                For any questions regarding VAT, invoicing, or tax matters, please contact us:
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