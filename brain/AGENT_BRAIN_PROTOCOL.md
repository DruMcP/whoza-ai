---
created: 2026-04-29
updated: 2026-04-29
tags: [meta, brain, agent-protocol]
---

# 🧠 whoza.ai Brain — Agent Protocol

## What This Is
The Brain is a markdown knowledge graph (Obsidian-style) that lives in `whoza-ai/brain/`. It is the **single source of truth** for project context, decisions, research, and relationships.

## Agent Rules

### 1. Read Before Writing
Before starting any task, search the Brain for relevant context:
- Check [[Index — Projects]] for active work
- Check [[Index — Decisions]] for constraints
- Check [[Index — Research]] for background intel
- Follow `[[Wiki Links]]` to discover connected ideas

### 2. Write After Finishing
When you complete work that generates lasting knowledge:
- Update existing notes (change `updated:` date)
- Create new notes from [[Templates/project|Templates]] if warranted
- Link new notes to related existing notes
- Never leave knowledge in chat only — chat evaporates; the Brain persists

### 3. Frontmatter Is Mandatory
Every note must have:
```yaml
---
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [tag1, tag2]
---
```

### 4. Use Wiki Links
Connect ideas with `[[Note Name]]`. If a link target doesn't exist yet, create it or add it to [[00-Inbox — Raw Captures]].

### 5. Maintain the Indexes
When you create a new note of a known type, add it to the appropriate [[Index — Projects|Index]]. If you're unsure, drop it in [[00-Inbox — Raw Captures]] and flag it.

### 6. Flat Files vs Brain
- **Existing flat files** (e.g., `TRILLET_DESIGN_AND_COSTING.md`) stay where they are. Reference them from Brain notes but don't duplicate them.
- **New knowledge** goes into the Brain first. If it grows very large, it can become a flat file with a Brain index entry.

## Folder Map
| Folder | Content | Template |
|--------|---------|----------|
| `00-Inbox/` | Fleeting notes, raw captures | none (freeform) |
| `01-Projects/` | Active and planned projects | [[Templates/project]] |
| `02-Decisions/` | ADRs, business decisions | [[Templates/decision]] |
| `03-Research/` | Market intel, competitor analysis | [[Templates/research]] |
| `04-People/` | Contacts, clients, partners | [[Templates/person]] |
| `05-Meetings/` | Meeting notes, action items | [[Templates/meeting]] |
| `06-Processes/` | SOPs, runbooks | [[Templates/process]] |
| `07-Reference/` | Long-term stable knowledge | freeform |
| `99-Archive/` | Completed, deprecated | none |
| `Templates/` | Note templates | — |

## Quick Start for New Agents
1. Read [[Index]] — understand the graph
2. Read [[Index — Projects]] — know what's active
3. Read relevant project/decision notes for your domain
4. Do your work
5. Update the Brain with outcomes

## Human Use (Dru)
Open `whoza-ai/brain/` in any markdown editor (Obsidian, VS Code, Typora). The graph is in the links. Indexes are your entry points.

## Related
- [[Index]] — Brain homepage
- [[HEARTBEAT.md]] — Operational monitoring
