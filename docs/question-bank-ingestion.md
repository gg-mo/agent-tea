# Question Bank Ingestion (AE-4)

This project ingests the versioned launch question bank from:

- `docs/launch-pack/09-question-bank-spec.json`

## Commands

```bash
npm run db:ingest-questions
npm run db:verify-questions
```

The scripts automatically load `.env.local` (or `.env`) before running, so manual `source` is not required.

## Required Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SECRET_KEY` (preferred) or `SUPABASE_SERVICE_ROLE_KEY` (legacy)

## What Ingestion Does

1. Reads `spec_version` from the JSON file.
2. Upserts a `question_sets` record by `version`.
3. Marks the ingested version as active (`is_active=true`) and deactivates older sets.
4. Upserts every question in the unified `questions` array into `questions` with generated canonical codes `Q01`–`QNN` in the authored order.
5. Preserves scoring metadata (`dimension`, `keyed_side`, `reverse_coded`, `letter`).

## Versioning Workflow

When creating a new bank revision:

1. Duplicate and update `docs/launch-pack/09-question-bank-spec.json`.
2. Bump `spec_version`.
3. Run `npm run db:ingest-questions`.
4. Run `npm run db:verify-questions`.
5. Verify session creation uses active `question_set_id` and stores `question_set_version` + `random_seed`.
