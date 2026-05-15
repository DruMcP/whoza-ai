import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, trade, phone, postcode, source, plan } = body

    if (!email || !trade) {
      return NextResponse.json(
        { error: "Email and trade are required" },
        { status: 400 }
      )
    }

    const timestamp = new Date().toISOString()

    // Send notification to Dru
    await resend.emails.send({
      from: "Whoza.ai <pilot@whoza.ai>",
      to: "dru@whoza.ai",
      subject: `New Pilot Signup — ${trade} — ${email}`,
      text: `
New pilot signup:

Email: ${email}
Trade: ${trade}
Phone: ${phone || "Not provided"}
Postcode: ${postcode || "Not provided"}
Source: ${source || "homepage"}
Plan: ${plan || "N/A"}
Timestamp: ${timestamp}
      `.trim(),
    })

    // Send confirmation to user
    await resend.emails.send({
      from: "Dru @ Whoza.ai <pilot@whoza.ai>",
      to: email,
      subject: "You're on the whoza.ai pilot list",
      text: `
Hi there,

Thanks for joining the whoza.ai UK Pilot Programme!

You're on the list.

Here's what happens next:
1. Dru will personally email you within 48 hours
2. You'll get a call to discuss your setup
3. Katie goes live on your number in 30 minutes
4. 7 days free — no credit card needed

Got questions? Reply to this email or contact Dru at dru@whoza.ai.

— Dru & the whoza.ai team
      `.trim(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Waitlist submission error:", error)
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    )
  }
}
