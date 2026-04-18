# Analytics and Funnel Instrumentation (AE-18)

This document defines the canonical event schema, funnel reporting, and query/readout expectations for Agent Tea.

## Principles
- Keep payloads PII-safe. Do not include raw user prompts, email addresses, or freeform chat logs.
- Prefer server-side events for critical journey milestones (`session_created`, `session_scored`).
- Treat client-side events as best-effort signals (`landing_view`, `share_click`).

## Canonical Events

| Event | Source | Required fields | Optional payload |
| --- | --- | --- | --- |
| `landing_view` | client | none | `referralCode` |
| `session_created` | server | `sessionId` | `intakeMode`, `questionSetVersion`, `referralCode`, `referrerSessionId` |
| `answers_ingested` | server | `sessionId` | `source`, `accepted`, `warningCount` |
| `answers_ingest_failed` | server/client | `sessionId` | `source`, `hintCount` |
| `session_scored` | server | `sessionId` | `typeCode` |
| `result_view` | server | `sessionId` | `typeCode` |
| `share_click` | client | `sessionId` | `action`, `mode`, `typeCode` |
| `compare_created` | server | none | `compareId`, `sessionCount` |
| `session_claimed` | server | `sessionId`, `userId` | none |
| `auth_magic_link_requested` | client | optional `sessionId` | none |
| `moderation_rewrite` | client | `sessionId` | `typeCode`, `mode`, `rewriteCount`, `highestSeverity`, `terms` |

## Event Storage
Events are written to `public.event_log`.

Columns used:
- `event_name`
- `event_source` (`client` or `server`)
- `session_id` (nullable)
- `user_id` (nullable)
- `event_payload` (JSONB)
- `created_at`

## Funnel Views

### `public.v_funnel_7d`
Provides 7-day stage counts and conversions:
- `landing_view`
- `session_created`
- `session_scored`
- `share_click`

Returned columns:
- `stage`
- `stage_order`
- `sample_count`
- `conversion_rate_from_previous`
- `conversion_rate_from_start`

### `public.v_type_share_7d`
Top shared output types from `share_click` payloads:
- `type_code`
- `share_events`

### `public.v_type_distribution_7d`
7-day frequency distribution of scored types:
- `type_code`
- `sample_count`

## API Readouts
- `GET /api/stats/funnel` returns funnel rows for dashboard widgets.
- `GET /api/stats/type-distribution` returns social-proof summary with minimum sample guardrail.

## Example Funnel Interpretation
If `v_funnel_7d` reports:
- `landing_view`: 1200
- `session_created`: 360
- `session_scored`: 220
- `share_click`: 58

Then:
- Start rate to create: `30%`
- Create to score: `61.1%`
- Score to share: `26.4%`
- Landing to share: `4.8%`

Use these four rates as the default weekly growth health snapshot.
