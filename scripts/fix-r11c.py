#!/usr/bin/env python3
"""
R11c fix: Reconcile faqs arrays with visible inline arrays on for-electricians and for-plumbers.
Replace inline arrays with faqs.map() pattern from for-gas-engineers.
"""

import re

# ============ FOR-ELECTRICIANS ============

with open("app/for-electricians/page.tsx", "r") as f:
    e_content = f.read()

# 1. Update faqs[1] - emergency question
old = '''  {
    question: "Can Katie handle emergency electrical calls at night?",
    answer: "Absolutely. Katie answers 24/7, including nights, weekends, and bank holidays. She identifies electrical emergencies (no power, burning smell, sparking sockets, RCD tripping) and marks them as highest priority in your WhatsApp alert. You'll see the emergency tag immediately and can call back within minutes.",
  },'''
new = '''  {
    question: "Can Katie handle electrical emergencies at 2am?",
    answer: "Yes. Katie answers 24/7, including weekends and bank holidays. She identifies emergency electrical keywords like 'power cut', 'tripping', 'burning smell', 'sparking', 'fuse box', 'no lights' — and marks the enquiry as emergency priority. You get an immediate WhatsApp with 'ELECTRICAL EMERGENCY — URGENT' in the header, even at 2am.",
  },'''
assert old in e_content, "Could not find electricians faqs[1]"
e_content = e_content.replace(old, new, 1)

# 2. Update faqs[3] - existing phone number
old = '''  {
    question: "Does it work with my existing business phone number?",
    answer: "Yes. You simply set up call forwarding from your existing electrician business number to your whoza.ai number. Your customers dial the same number they've always used — Katie answers when you can't. Setup takes under 10 minutes and your existing voicemail stays as a backup.",
  },'''
new = '''  {
    question: "Does whoza.ai work with my existing business phone number?",
    answer: "Yes. You keep your existing number. We set up call forwarding from your current line to your whoza.ai number. Most electricians have this active within 10 minutes. No need to change business cards, van signage, or Google Business Profile.",
  },'''
assert old in e_content, "Could not find electricians faqs[3]"
e_content = e_content.replace(old, new, 1)

# 3. Update faqs[4] - EICR
old = '''  {
    question: "Can Katie handle EICR and landlord certificate enquiries?",
    answer: "Yes. Katie is specifically trained to handle electrical safety certificate enquiries. She captures: property size, number of circuits, certificate type (EICR, PAT testing, fire alarm), number of properties, landlord or letting agent details, and urgency. These are tagged as 'landlord' in your dashboard for fast bulk follow-up — your biggest repeat customer base.",
  },'''
new = '''  {
    question: "Can Katie handle EICR certificate enquiries?",
    answer: "Yes. Katie identifies landlord-specific calls by keywords like 'EICR', 'electrical certificate', 'landlord', 'tenant', or 'rental property'. She captures the number of properties, number of circuits, preferred inspection dates, and tenant contact details. EICR enquiries get flagged as 'landlord/certificate' in your dashboard for efficient batch scheduling.",
  },'''
assert old in e_content, "Could not find electricians faqs[4]"
e_content = e_content.replace(old, new, 1)

# 4. Add two new FAQs after the last one (before the closing ]
old = '''  {
    question: "Can an AI receptionist handle emergency electrical calls?",
    answer: "Yes — Katie identifies emergency electrical keywords like 'power cut' and 'burning smell' and marks them as urgent priority, sending an immediate WhatsApp alert even at 2am.",
  },
]'''
new = '''  {
    question: "Can an AI receptionist handle emergency electrical calls?",
    answer: "Yes — Katie identifies emergency electrical keywords like 'power cut' and 'burning smell' and marks them as urgent priority, sending an immediate WhatsApp alert even at 2am.",
  },
  {
    question: "Will customers know they're talking to AI?",
    answer: "Katie introduces herself as your AI assistant and explains that she's capturing details so you can call back prepared. Most customers are relieved to speak to someone immediately rather than leaving a voicemail. Most callers are satisfied with the AI experience.",
  },
  {
    question: "Can Katie handle rewire and installation quote enquiries?",
    answer: "Yes. Katie captures installation enquiries with: property type and size, number of rooms, current wiring condition, whether it's a partial or full rewire, and timeline. These high-value enquiries (£2,000-£8,000+) get flagged as 'installation quote' for priority follow-up.",
  },
]'''
assert old in e_content, "Could not find electricians end of faqs array"
e_content = e_content.replace(old, new, 1)

# 5. Replace inline array with faqs.map()
# Find the inline array block from "{[\n" to "</section>\n"
pattern = r'<div className="space-y-6">\s*\{\[.*?\]\.map\(\(faq, idx\) => \(.*?\)\)\}\s*</div>\s*</div>\s*</section>'
match = re.search(pattern, e_content, re.DOTALL)
assert match, "Could not find electricians inline array block"

replacement = '''<div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-white/60 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              ))}
            </div>
          </div>
        </section>'''

e_content = e_content[:match.start()] + replacement + e_content[match.end():]

with open("app/for-electricians/page.tsx", "w") as f:
    f.write(e_content)

print("Updated app/for-electricians/page.tsx")

# ============ FOR-PLUMBERS ============

with open("app/for-plumbers/page.tsx", "r") as f:
    p_content = f.read()

# 1. Update faqs[4] - existing phone number
old = '''  {
    question: "Does it work with my existing business phone number?",
    answer: "Yes. You simply set up call forwarding from your existing plumbing business number to your whoza.ai number. Your customers dial the same number they've always used — Katie just answers when you can't. Setup takes under 10 minutes.",
  },'''
new = '''  {
    question: "Does whoza.ai work with my existing business phone number?",
    answer: "Yes. You keep your existing number. We set up call forwarding from your current line to your whoza.ai number. Most plumbers have this active within 10 minutes. No need to change business cards, van signage, or Google Business Profile.",
  },'''
assert old in p_content, "Could not find plumbers faqs[4]"
p_content = p_content.replace(old, new, 1)

# 2. Add one new FAQ after the last one
old = '''  {
    question: "Can an AI receptionist handle emergency plumbing calls?",
    answer: "Yes — Katie identifies emergency plumbing keywords like 'burst pipe' and 'flooding' and marks them as urgent priority, sending an immediate WhatsApp alert even at 2am.",
  },
]'''
new = '''  {
    question: "Can an AI receptionist handle emergency plumbing calls?",
    answer: "Yes — Katie identifies emergency plumbing keywords like 'burst pipe' and 'flooding' and marks them as urgent priority, sending an immediate WhatsApp alert even at 2am.",
  },
  {
    question: "Can Katie distinguish between a routine service and an emergency?",
    answer: "Yes. Katie is trained to identify urgency from the customer's language. 'Annual boiler service' or 'tap replacement' goes to routine scheduling. 'Burst pipe', 'flooding', 'no water', or 'sewage backup' gets emergency priority. She also asks specific questions to help you assess urgency before you call back.",
  },
]'''
assert old in p_content, "Could not find plumbers end of faqs array"
p_content = p_content.replace(old, new, 1)

# 3. Replace inline array with faqs.map()
match = re.search(pattern, p_content, re.DOTALL)
assert match, "Could not find plumbers inline array block"

p_content = p_content[:match.start()] + replacement + p_content[match.end():]

with open("app/for-plumbers/page.tsx", "w") as f:
    f.write(p_content)

print("Updated app/for-plumbers/page.tsx")
print("Done.")
