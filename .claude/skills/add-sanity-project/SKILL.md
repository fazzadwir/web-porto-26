---
name: add-sanity-project
description: Turn the user's informal description of a portfolio project into polished copy for every text field of the Sanity `project` schema, then create it as an unpublished draft in Sanity. Use when the user wants to add a new project to the portfolio, says "tambah project", "add project to sanity", or describes a project they want on the site. Images are added later by the user in Studio.
---

# Add a project to Sanity (text only, as a draft)

The user does not write long-form copy. They describe a project casually (often in Indonesian); you turn it into finished English copy for the site, show it, and push it to Sanity as a **draft**. The user adds images in Studio and publishes.

Project: `o1s2ofhu`, dataset `production`, schema in `sanity/schemaTypes/project.ts`. The Sanity CLI is already logged in (`npx sanity projects list` lists the project). Never use or ask for an API token.

## 1. Intake

Ask the user to describe the project in their own words. Then fill gaps. Ask only for what you cannot infer, in one short message:

- **category** (required): `Interface Design` | `Visual Design` | `Motion Design`
- **status** (required): `public` | `private` (NDA → private)
- **company / client**, **timeline** (e.g. `Jan 2025 – Mar 2025`), **roles**, **tools**
- **subcategory**: offer the existing values first so spelling stays consistent:

```bash
npx sanity documents query --api-version v2024-01-01 '*[_type=="project"]{"slug": slug.current, subcategory, category}'
```

Never invent facts: no made-up metrics, user numbers, clients, awards or outcomes. If the user gave no numbers, describe results qualitatively.

## 2. Write the copy

All copy in English, matching the site voice: confident, plain, specific, first person where natural ("I designed…"). Short sentences. No filler openers ("In today's fast-paced world"), no stacked buzzwords, no forced rule-of-three lists, at most one em dash per field.

| Field | Type | Guidance |
|---|---|---|
| `title` | string | Product/project name as the user calls it, e.g. `Maxcloud App`. |
| `slug.current` | slug | kebab-case from the title; must not collide with existing slugs. |
| `category` | string | One of the three values above, exactly. |
| `subcategory` | string | Reuse an existing value when it fits (exact spelling). It becomes a filter chip. |
| `status` | string | `public` or `private`. |
| `publishedAt` | datetime | ISO 8601. Ask for the date; default to today if the user doesn't care. Controls ordering (newest first). |
| `shortDescription` | text | One sentence, ≤ 140 characters: what it is and for whom. |
| `projectOverview` | text | 60–90 words: problem, who it served, what you delivered. |
| `roles` | string[] | 1–3 roles, e.g. `UI/UX Designer`, `Design System`. |
| `timeline` | string | As given. |
| `company` | string | As given. |
| `technologies` | string[] | Tool names only, e.g. `Figma`, `Framer`. |
| `body` | Portable Text | Case study, 250–400 words, four `h2` sections: **The Challenge**, **The Approach**, **The Solution**, **The Outcome**, each 1–2 short paragraphs. |
| `closingStatement` | text | One or two reflective sentences, ≤ 30 words. Rendered as a quote. |

Leave out: images (`mainImage`, `showcaseImage*`, body images) and legacy fields (`overview`, `categories`).

## 3. Preview and confirm

Show every field as a compact table plus the body sections in full. Wait for an explicit "ok" (or edits) before pushing. Pushing writes to the production dataset.

## 4. Push as a draft

Write the document to a temp file and create it. The `drafts.` id prefix keeps it unpublished, so nothing appears on the live site until the user publishes in Studio.

```bash
FILE="$(mktemp -d)/<slug>.json"   # write the JSON below into $FILE
npx sanity documents create "$FILE"
```

Document shape (keys: any unique 12-char alphanumeric strings):

```json
{
  "_id": "drafts.project-<slug>",
  "_type": "project",
  "title": "…",
  "slug": { "_type": "slug", "current": "<slug>" },
  "category": "Interface Design",
  "subcategory": "SaaS",
  "status": "public",
  "publishedAt": "2025-03-01T00:00:00.000Z",
  "shortDescription": "…",
  "projectOverview": "…",
  "roles": ["UI/UX Designer"],
  "timeline": "Jan 2025 – Mar 2025",
  "company": "…",
  "technologies": ["Figma"],
  "body": [
    { "_type": "block", "_key": "k1a2b3c4d5e6", "style": "h2", "markDefs": [],
      "children": [{ "_type": "span", "_key": "s1a2b3c4d5e6", "text": "The Challenge", "marks": [] }] },
    { "_type": "block", "_key": "k2a2b3c4d5e6", "style": "normal", "markDefs": [],
      "children": [{ "_type": "span", "_key": "s2a2b3c4d5e6", "text": "…", "marks": [] }] }
  ],
  "closingStatement": "…"
}
```

If the slug already exists as a draft and the user wants to overwrite it, add `--replace`. Never overwrite a published document (`_id` without `drafts.`) unless the user explicitly asks.

## 5. Verify and hand off

```bash
npx sanity documents query --api-version v2024-01-01 '*[_id == "drafts.project-<slug>"]{title, category, subcategory, status}'
```

Tell the user: open `/studio` → Project → the new draft → add the main image (and showcase images) → **Publish**. After publishing it appears on `/work` within ~60 seconds (page revalidation).
