"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Plus, Trash2, Download, ArrowRight, Check } from "lucide-react"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import Script from "next/script"

interface LineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

export function QuoteGenerator() {
  const [businessName, setBusinessName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")
  const [quoteRef, setQuoteRef] = useState(`WH-${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`)
  const [validDays, setValidDays] = useState(14)
  const [vatRegistered, setVatRegistered] = useState(false)
  const [paymentTerms, setPaymentTerms] = useState("On completion")
  const [notes, setNotes] = useState("")
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "1", description: "Labour", quantity: 4, unitPrice: 45 },
  ])
  const [showPreview, setShowPreview] = useState(false)

  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const vat = vatRegistered ? subtotal * 0.2 : 0
  const total = subtotal + vat

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Date.now().toString(), description: "", quantity: 1, unitPrice: 0 }])
  }

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id))
  }

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(lineItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
  }

  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />

      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[var(--coral)]/10 text-[var(--coral)] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              Free Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Quote Generator for UK Tradespeople</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Stop scribbling quotes on the back of receipts. Create professional, branded quotes that win more jobs — and look legit to customers checking you out on Google.
            </p>
          </motion.div>

          {!showPreview ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-8"
            >
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-white/80 mb-3">YOUR DETAILS</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your business name *"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--katie-blue)]"
                      />
                      <input
                        type="tel"
                        placeholder="Your phone number *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--katie-blue)]"
                      />
                      <input
                        type="email"
                        placeholder="Your email *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--katie-blue)]"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white/80 mb-3">CUSTOMER DETAILS</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Customer name *"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--katie-blue)]"
                      />
                      <textarea
                        placeholder="Customer address"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--katie-blue)] resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Quote reference"
                    value={quoteRef}
                    onChange={(e) => setQuoteRef(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--katie-blue)]"
                  />
                  <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white/60">
                    {formatDate(new Date())}
                  </div>
                  <select
                    value={validDays}
                    onChange={(e) => setValidDays(Number(e.target.value))}
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[var(--katie-blue)] appearance-none cursor-pointer"
                  >
                    <option value={7} className="bg-[var(--navy-900)]">Valid 7 days</option>
                    <option value={14} className="bg-[var(--navy-900)]">Valid 14 days</option>
                    <option value={30} className="bg-[var(--navy-900)]">Valid 30 days</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white/80 mb-3">LINE ITEMS</h3>
                  <div className="space-y-3">
                    {lineItems.map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                          className="col-span-5 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--katie-blue)] text-sm"
                        />
                        <input
                          type="number"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(item.id, "quantity", Number(e.target.value))}
                          className="col-span-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--katie-blue)] text-sm"
                        />
                        <div className="col-span-3 relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">£</span>
                          <input
                            type="number"
                            placeholder="Price"
                            value={item.unitPrice}
                            onChange={(e) => updateLineItem(item.id, "unitPrice", Number(e.target.value))}
                            className="w-full pl-6 pr-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--katie-blue)] text-sm"
                          />
                        </div>
                        <div className="col-span-1 text-right text-sm font-medium">
                          £{(item.quantity * item.unitPrice).toFixed(2)}
                        </div>
                        <button
                          onClick={() => removeLineItem(item.id)}
                          className="col-span-1 p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-[var(--coral)] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addLineItem}
                    className="mt-3 flex items-center gap-2 text-sm text-[var(--katie-blue)] hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add another line
                  </button>
                </div>

                <div className="bg-white/5 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="vat"
                      checked={vatRegistered}
                      onChange={(e) => setVatRegistered(e.target.checked)}
                      className="w-5 h-5 rounded border-white/20 bg-white/10 text-[var(--katie-blue)] accent-[var(--katie-blue)]"
                    />
                    <label htmlFor="vat" className="text-sm text-white/80">VAT registered (add 20%)</label>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Total ex VAT:</span>
                    <span className="font-medium">£{subtotal.toFixed(2)}</span>
                  </div>
                  {vatRegistered && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">VAT (20%):</span>
                      <span className="font-medium">£{vat.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-2">
                    <span>TOTAL:</span>
                    <span className="text-[var(--coral)]">£{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <select
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[var(--katie-blue)] appearance-none cursor-pointer"
                  >
                    <option value="On completion" className="bg-[var(--navy-900)]">Payment: On completion</option>
                    <option value="14 days" className="bg-[var(--navy-900)]">Payment: 14 days</option>
                    <option value="30 days" className="bg-[var(--navy-900)]">Payment: 30 days</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Notes for customer"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--katie-blue)]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="flex-1 py-4 rounded-lg bg-[var(--coral)] hover:bg-[var(--coral)]/90 text-white font-bold text-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    GENERATE QUOTE
                  </button>
                  <button
                    onClick={() => setShowPreview(true)}
                    className="flex-1 py-4 rounded-lg border border-white/20 hover:bg-white/10 text-white font-bold text-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    PREVIEW
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white text-[var(--navy-900)] rounded-2xl p-8 mb-8"
            >
              <div className="border-2 border-[var(--navy-900)]/10 rounded-xl p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--navy-900)]">{businessName || "Your Business"}</h2>
                    <p className="text-sm text-[var(--slate-500)]">{phone} · {email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[var(--navy-900)]">QUOTE</p>
                    <p className="text-sm text-[var(--slate-500)]">Ref: {quoteRef}</p>
                    <p className="text-sm text-[var(--slate-500)]">{formatDate(new Date())}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold text-[var(--navy-900)]">To:</p>
                  <p className="text-sm text-[var(--slate-500)]">{customerName || "Customer Name"}</p>
                  <p className="text-sm text-[var(--slate-500)] whitespace-pre-line">{customerAddress}</p>
                </div>

                <table className="w-full mb-6">
                  <thead>
                    <tr className="border-b-2 border-[var(--navy-900)]/10">
                      <th className="text-left py-2 text-sm font-semibold">Description</th>
                      <th className="text-right py-2 text-sm font-semibold">Qty</th>
                      <th className="text-right py-2 text-sm font-semibold">Unit Price</th>
                      <th className="text-right py-2 text-sm font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item) => (
                      <tr key={item.id} className="border-b border-[var(--navy-900)]/5">
                        <td className="py-2 text-sm">{item.description || "—"}</td>
                        <td className="py-2 text-sm text-right">{item.quantity}</td>
                        <td className="py-2 text-sm text-right">£{item.unitPrice.toFixed(2)}</td>
                        <td className="py-2 text-sm text-right font-medium">£{(item.quantity * item.unitPrice).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-end mb-6">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>£{subtotal.toFixed(2)}</span>
                    </div>
                    {vatRegistered && (
                      <div className="flex justify-between text-sm">
                        <span>VAT (20%)</span>
                        <span>£{vat.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold border-t-2 border-[var(--navy-900)]/10 pt-2">
                      <span>TOTAL</span>
                      <span className="text-[var(--coral)]">£{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--off-white)] rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-1">Terms</p>
                  <p className="text-sm text-[var(--slate-500)]">Payment: {paymentTerms}. Quote valid for {validDays} days. {notes}</p>
                </div>

                <div className="text-center text-xs text-[var(--slate-400)]">
                  Generated with whoza.ai Quote Generator
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 rounded-lg bg-[var(--navy-900)] hover:bg-[var(--navy-800)] text-white font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  PRINT / SAVE PDF
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex-1 py-3 rounded-lg border border-[var(--navy-900)]/20 hover:bg-[var(--navy-900)]/5 text-[var(--navy-900)] font-bold transition-colors"
                >
                  Edit Quote
                </button>
              </div>

              <div className="mt-6 p-4 bg-[var(--coral)]/10 rounded-xl border border-[var(--coral)]/20">
                <p className="text-sm text-[var(--navy-900)] font-medium mb-2">💡 Win more quotes by answering every call</p>
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-2 text-[var(--coral)] font-bold hover:underline"
                >
                  Try Katie free <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />

      <Script
        id="quote-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Free Quote Generator for UK Trades",
            applicationCategory: "BusinessApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
            operatingSystem: "Web",
            description: "Create professional, VAT-compliant quotes for UK trade jobs in 60 seconds.",
          }),
        }}
      />
    </div>
  )
}
