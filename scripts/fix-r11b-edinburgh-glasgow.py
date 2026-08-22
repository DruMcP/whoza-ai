#!/usr/bin/env python3
"""Fix R11b: Edinburgh/Glasgow city pages have trade-faq on schema wrapper instead of visible FAQ."""
import os, re

PAGES = [
    "app/for-builders-edinburgh/page.tsx",
    "app/for-builders-glasgow/page.tsx",
    "app/for-electricians-edinburgh/page.tsx",
    "app/for-electricians-glasgow/page.tsx",
    "app/for-gas-engineers-edinburgh/page.tsx",
    "app/for-gas-engineers-glasgow/page.tsx",
    "app/for-heating-engineers-edinburgh/page.tsx",
    "app/for-heating-engineers-glasgow/page.tsx",
    "app/for-plumbers-edinburgh/page.tsx",
    "app/for-plumbers-glasgow/page.tsx",
    "app/for-roofers-edinburgh/page.tsx",
    "app/for-roofers-glasgow/page.tsx",
]

for page in PAGES:
    path = os.path.join("/root/.openclaw/workspace/whoza-ai", page)
    with open(path, "r") as f:
        content = f.read()

    # 1. Remove className="trade-faq" from schema wrapper div
    content = content.replace('<div className="trade-faq">\n      <FAQPageSchema', '<div>\n      <FAQPageSchema')

    # 2. Add trade-faq to visible FAQ section
    # Find the FAQ section: <section className="py-16 lg:py-24"> before the FAQ heading
    content = re.sub(
        r'(<section className=")py-16 lg:py-24(">\s*\n\s*<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">\s*\n\s*<div className="text-center mb-12">\s*\n\s*<h2 className="text-3xl sm:text-4xl font-bold mb-4">\s*\n\s*Questions .+ Ask)',
        r'\1trade-faq py-16 lg:py-24\2',
        content,
    )

    with open(path, "w") as f:
        f.write(content)

    print(f"Fixed {page}")
