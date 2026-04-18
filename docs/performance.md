# Performance and Reliability Checklist (AE-20)

This document defines launch targets, cache policy, and reliability checks for Agent Tea on Vercel.

## SLO Targets (Launch)
- Landing page (`/`) p95: <= 1.5s
- Stats endpoints (`/api/stats/*`) p95: <= 600ms
- Result API (`/api/sessions/:id/result`) p95: <= 800ms
- Share card OG (`/api/share-card/:id`) p95: <= 1.2s
- Error rate (5xx) per route: < 1% over 1 hour

## Caching Strategy
- `GET /api/stats/type-distribution`: `s-maxage=300`, `stale-while-revalidate=900`
- `GET /api/stats/funnel`: `s-maxage=300`, `stale-while-revalidate=900`
- `GET /api/share-card/:sessionId`: `s-maxage=86400`, `stale-while-revalidate=604800`
- Session-specific APIs stay uncached or user-scoped.

## Reliability Measures
- Global Next.js error boundary at `src/app/error.tsx`.
- Server API responses normalized through `jsonResponse`.
- Ingestion parser returns correction hints instead of generic failures.
- Moderation rewrites degrade safely instead of blocking render.

## Perf Scripts
### Quick route benchmark
```bash
npm run perf:critical -- https://agent-tea.vercel.app 20
```
Arguments:
- arg1: base URL (optional, defaults to `NEXT_PUBLIC_SITE_URL`)
- arg2: sample count per route (optional, default `15`)

### Smoke verification
```bash
npm run ops:smoke -- https://agent-tea.vercel.app
```

Optional session-aware smoke:
```bash
npm run ops:smoke -- https://agent-tea.vercel.app <session-id>
```

## Alert Conditions (Initial)
- Any route p95 breach for 2 consecutive checks.
- 5xx rate >= 1% for 15 minutes.
- Funnel conversion `session_created -> session_scored` drops below 40% week-over-week.

## Pre-Launch Perf Checklist
- Run `npm run build` successfully.
- Run `npm run perf:critical` against preview.
- Run `npm run ops:smoke` against preview.
- Confirm CDN cache headers in Vercel response inspector.
