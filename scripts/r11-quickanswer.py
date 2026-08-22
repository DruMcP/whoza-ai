#!/usr/bin/env python3
"""Add QuickAnswer to 14 trade pages for R11.2"""

import re

# Trade data: (dir_name, singular_name, service_url)
trades = [
    ("builders", "builder", "/for-builders"),
    ("carpenters", "carpenter", "/for-carpenters"),
    ("cleaners", "cleaner", "/for-cleaners"),
    ("drainage", "drainage company", "/for-drainage"),
    ("gas-engineers", "gas engineer", "/for-gas-engineers"),
    ("handymen", "handyman", "/for-handymen"),
    ("heating-engineers", "heating engineer", "/for-heating-engineers"),
    ("joiners", "joiner", "/for-joiners"),
    ("landscapers", "landscaper", "/for-landscapers"),
    ("locksmiths", "locksmith", "/for-locksmiths"),
    ("painters-decorators", "painter and decorator", "/for-painters-decorators"),
    ("pest-control", "pest control", "/for-pest-control"),
    ("plasterers", "plasterer", "/for-plasterers"),
    ("tilers", "tiler", "/for-tilers"),
]

# QuickAnswer content for each trade
items_map = {
    "builders": [
        ('"Instant pickup"', '"Katie answers every building enquiry in your company name within seconds, capturing project type, budget range, and timeline."'),
        ('"Project qualification"', '"Katie qualifies extensions and renovations with eight key questions including budget, property type, planning status, and both decision-makers\' contacts."'),
        ('"Budget prioritisation"', '"High-value projects (£50k+) are flagged for same-day callback, so you prioritise the most profitable enquiries."'),
        ('"WhatsApp delivery"', '"A full project brief lands on your phone in 3 seconds with project type, budget, timeline, postcode, and both contacts."'),
        ('"Cost"', '"Whoza starts at £59 per month for UK builders, with no long-term contract and a 7-day free trial."'),
    ],
    "carpenters": [
        ('"Instant pickup"', '"Katie answers every carpentry call in your business name within seconds, so customers seeking bespoke work do not hang up."'),
        ('"Project capture"', '"Katie records the project details — fitted kitchens, wardrobes, staircases, or bespoke furniture — and sends them to your WhatsApp."'),
        ('"Quote preparation"', '"Dimensions, materials, budget, and timeline are captured before you call back, so you arrive prepared for the discussion."'),
        ('"WhatsApp delivery"', '"A structured message lands on your phone with name, number, project type, and budget range."'),
        ('"Cost"', '"Whoza starts at £59 per month for UK carpenters, with no long-term contract."'),
    ],
    "cleaners": [
        ('"Instant pickup"', '"Katie answers every cleaning enquiry in your business name within seconds, so customers needing end-of-tenancy or commercial cleans do not call the next company."'),
        ('"Job capture"', '"Katie records the service type — domestic, commercial, carpet, or end-of-tenancy — along with property size and preferred time."'),
        ('"Schedule sync"', '"Katie checks your availability and offers specific time slots that the customer can confirm instantly."'),
        ('"WhatsApp delivery"', '"A structured message lands on your phone with name, number, service type, property size, and preferred time."'),
        ('"Cost"', '"Whoza starts at £59 per month for UK cleaners, with no long-term contract."'),
    ],
    "drainage": [
        ('"Instant pickup"', '"Katie answers every drainage call in your business name within seconds, so customers with blocked drains or flooding do not hang up."'),
        ('"Emergency triage"', '"Katie identifies emergency keywords like sewage backup and flooding and marks the enquiry as urgent for immediate response."'),
        ('"Job capture"', '"Katie records the problem type, property address, and whether the customer has attempted any fixes."'),
        ('"WhatsApp delivery"', '"A structured message lands on your phone with name, number, problem type, and urgency level."'),
        ('"Cost"', '"Whoza starts at £59 per month for UK drainage companies, with no long-term contract."'),
    ],
    "gas-engineers": [
        ('"Instant pickup"', '"Katie answers every gas safety call in your business name within seconds, so customers with boiler breakdowns or gas leaks do not hang up."'),
        ('"Emergency triage"', '"Katie identifies gas leak emergencies and carbon monoxide alarms, marking them as highest priority for immediate response."'),
        ('"Certificate enquiries"', '"CP12 certificate renewals and annual service enquiries are captured with property details and tenant contact information."'),
        ('"WhatsApp delivery"', '"A structured message lands on your phone with name, number, enquiry type, and urgency level."'),
        ('"Cost"', '"Whoza starts at £59 per month for UK gas engineers, with no long-term contract."'),
    ],
    "handymen": [
        ('"Instant pickup"', '"Katie answers every handyman call in your business name within seconds, so customers with odd jobs do not call the next person on Google."'),
        ('"Job variety"', '"Katie captures varied job types — repairs, maintenance, flat-pack assembly, or odd jobs — and records the details for your review."'),
        ('"Schedule sync"', '"Katie checks your availability and offers specific time slots that the customer can confirm instantly."'),
        ('"WhatsApp delivery"', '"A structured message lands on your phone with name, number, job type, and estimated duration."'),
        ('"Cost"', '"Whoza starts at £59 per month for UK handymen, with no long-term contract."'),
    ],
    "heating-engineers": [
        ('"Instant pickup"', '"Katie answers every heating call in your business name within seconds, so customers with boiler breakdowns do not hang up."'),
        ('"Fault identification"', '"Katie identifies boiler type from customer descriptions and captures fault symptoms, property size, and heating system type."'),
        ('"Emergency triage"', '"Boiler breakdowns in winter are identified and marked as urgent, with immediate WhatsApp alerts even at 6am on a Sunday."'),
        ('"Certificate routing"', '"Gas Safety Certificate and annual service enquiries are tagged for contract team follow-up."'),
        ('"Cost"', '"Whoza starts at £59 per month for UK heating engineers, with no long-term contract."'),
    ],
    "joiners": [
        ('"Instant pickup"', '"Katie answers every joinery call in your business name within seconds, so customers seeking bespoke woodwork do not hang up."'),
        ('"Project capture"', '"Katie records project details — fitted kitchens, wardrobes, staircases, or doors — along with dimensions and materials."'),
        ('"Quote preparation"', '"Budget range, timeline, and property type are captured before you call back, so you arrive prepared."'),
        ('"WhatsApp delivery"', '"A structured message lands on your phone with name, number, project type, and budget range."'),
        ('"Cost"', '"Whoza starts at £59 per month for UK joiners, with no long-term contract."'),
    ],
    "landscapers": [
        ('"Instant pickup"', '"Katie answers every landscaping call in your business name within seconds, so customers wanting garden transformations do not hang up."'),
        ('"Project capture"', '"Katie records the project scope — garden design, maintenance, patio laying, or fencing — along with property size and budget."'),
        ('"Seasonal awareness"', '"Katie captures seasonal preferences and timeline, helping you schedule jobs during optimal weather windows."'),
        ('"WhatsApp delivery"', '"A structured message lands on your phone with name, number, project type, and property size."'),
        ('"Cost"', '"Whoza starts at £59 per month for UK landscapers, with no long-term contract."'),
    ],
    "locksmiths": [
        ('"Instant pickup"', '"Katie answers every locksmith call in your business name within seconds, so customers locked out do not call a competitor."'),
        ('"Emergency triage"', '"Lockout emergencies are identified and marked as urgent, with immediate WhatsApp alerts even at 3am."'),
        ('"Service capture"', '"Katie records the service needed — lockout, key replacement, lock repair, or security upgrade — and property details."'),
        ('"WhatsApp delivery"', '"A structured message lands on your phone with name, number, service type, and location."'),
        ('"Cost"', '"Whoza starts at £59 per month for UK locksmiths, with no long-term contract."'),
    ],
    "painters-decorators": [
        ('"Instant pickup"', '"Katie answers every painting and decorating call in your business name within seconds, so customers do not hang up."'),
        ('"Project capture"', '"Katie records the project scope — interior, exterior, touch-ups, or full redecoration — along with property size and preferred colours."'),
        ('"Quote preparation"', '"Room count, surface condition, and timeline are captured before you call back, so you arrive prepared."'),
        ('"WhatsApp delivery"', '"A structured message lands on your phone with name, number, project type, and property details."'),
        ('"Cost"', '"Whoza starts at £59 per month for UK painters and decorators, with no long-term contract."'),
    ],
    "pest-control": [
        ('"Instant pickup"', '"Katie answers every pest control call in your business name within seconds, calming panicked customers and capturing details."'),
        ('"Infestation capture"', '"Katie records the pest type — wasps, rats, bed bugs, or mice — and property details so you arrive with the right equipment."'),
        ('"Emergency triage"', '"Katie identifies urgent infestations and marks them for priority response."'),
        ('"WhatsApp delivery"', '"A structured message lands on your phone with name, number, pest type, and property address."'),
        ('"Cost"', '"Whoza starts at £59 per month for UK pest control companies, with no long-term contract."'),
    ],
    "plasterers": [
        ('"Instant pickup"', '"Katie answers every plastering call in your business name within seconds, so customers do not hang up."'),
        ('"Job capture"', '"Katie records the work needed — skimming, rendering, dry lining, or plaster repair — along with room count and surface condition."'),
        ('"Builder liaison"', '"Katie handles enquiries from builders and developers, capturing project scale and timeline for commercial jobs."'),
        ('"WhatsApp delivery"', '"A structured message lands on your phone with name, number, job type, and property details."'),
        ('"Cost"', '"Whoza starts at £59 per month for UK plasterers, with no long-term contract."'),
    ],
    "tilers": [
        ('"Instant pickup"', '"Katie answers every tiling call in your business name within seconds, so customers do not hang up."'),
        ('"Project capture"', '"Katie records the project scope — bathroom, kitchen splashback, floor, or commercial — along with tile type and area size."'),
        ('"Builder liaison"', '"Katie handles enquiries from builders and developers, capturing project scale and timeline for commercial jobs."'),
        ('"WhatsApp delivery"', '"A structured message lands on your phone with name, number, project type, and estimated area."'),
        ('"Cost"', '"Whoza starts at £59 per month for UK tilers, with no long-term contract."'),
    ],
}

base_path = "/root/.openclaw/workspace/whoza-ai/app"

for dir_name, singular, service_url in trades:
    filepath = f"{base_path}/for-{dir_name}/page.tsx"
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Add import if not present
    if 'QuickAnswer' not in content:
        # Add after FAQPageSchema import
        content = content.replace(
            'import { FAQPageSchema } from "@/components/whoza/faqpage-schema"',
            'import { FAQPageSchema } from "@/components/whoza/faqpage-schema"\nimport { QuickAnswer } from "@/components/whoza/quick-answer"'
        )

    # 2. Insert QuickAnswer after first section-divider
    items = items_map[dir_name]
    items_str = ",\n            ".join([f"{{\n              label: {label},\n              answer: {answer},\n            }}" for label, answer in items])

    qa_block = f'''        {{/* ─── QUICK ANSWER ─── */}}
        <QuickAnswer
          heading="What whoza.ai does for {singular}s"
          tradeName="{singular}"
          serviceUrl="{service_url}"
          items={{
            {items_str}
          }}
        />'''

    # Find first section-divider and insert after it
    pattern = r'(<div className="section-divider" />)'
    match = re.search(pattern, content)
    if match and 'QuickAnswer' not in content:
        insert_pos = match.end()
        content = content[:insert_pos] + "\n\n" + qa_block + content[insert_pos:]

    with open(filepath, 'w') as f:
        f.write(content)

    print(f"Updated for-{dir_name}")

print("All 14 trade pages updated.")
