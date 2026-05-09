---
created: 2026-04-29
updated: 2026-04-29
tags: [process, triage, daily]
frequency: daily
owner: "Any Agent"
---

# Process — Inbox Triage

## Trigger
New note in `00-Inbox/`, or daily heartbeat.

## Steps
1. **Review `00-Inbox — Raw Captures`**
   - Read all uncategorized notes from last 24h

2. **Categorize each note**
   - Idea for a project? → Create [[Templates/project]] in `01-Projects/`
   - Competitor intel? → Create [[Templates/research]] in `03-Research/`
   - New contact met? → Create [[Templates/person]] in `04-People/`
   - Decision reached? → Create [[Templates/decision]] in `02-Decisions/`
   - Quick task? → Add to relevant project note or create task
   - Junk? → Delete

3. **Link new notes**
   - Add wiki links `[[Note Name]]` to related existing notes
   - Update relevant [[Index — *]] pages

4. **Clean inbox**
   - Move processed notes to proper folders
   - Delete processed raw captures
   - Inbox should be empty (or nearly empty) after triage

## Rule
**No note should sit in inbox >48 hours.** Process it, link it, or delete it.

## Related
- [[00-Inbox — Raw Captures]] — The inbox
- [[AGENT_BRAIN_PROTOCOL.md]] — Full agent rules
- [[Index — Processes]]
