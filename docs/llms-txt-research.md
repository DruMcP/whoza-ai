# LLMS.txt Research Notes

## Official Specification (llmstxt.org)
- Location: Must be at /llms.txt in root path
- Format: Markdown (human and LLM readable)
- Structure:
  1. H1 with project/site name (REQUIRED)
  2. Blockquote with short summary (key info)
  3. Zero or more markdown sections (paragraphs, lists - no headings)
  4. Zero or more H2 sections with "file lists" of URLs
- File lists: markdown hyperlink [name](url), optionally : and notes
- "Optional" section = can be skipped for shorter context

## Best Practices (Rankability Guide)
- File Requirements:
  - Location: yoursite.com/llms.txt
  - Format: Plain text using Markdown
  - Encoding: UTF-8
  - Size: Under 10KB recommended

- Essential Components:
  1. H1 Title (Required)
  2. Blockquote Summary (Required)
  3. Organized H2 Sections (Recommended)

- Content Guidelines:
  - Clear, concise language
  - Write for both humans and AI
  - Accurate and up-to-date
  - Specific details about content
  - Consistent formatting
  - 10-20 key pages recommended

- Avoid:
  - Marketing jargon
  - Overly technical explanations
  - Outdated information
  - Vague descriptions
  - Broken URLs

## Priority Sections to Include:
- About/Company Info
- Products/Services
- Key Content
- Contact Information
- Blog/Resources
- Documentation
- Support
- Legal (Terms, Privacy)

## Technical Considerations:
- MIME Type: text/plain
- Caching: 24 hours recommended
- HTTPS: Always serve over HTTPS
- Accessibility: Publicly accessible (not behind auth)
