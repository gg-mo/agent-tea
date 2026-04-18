# Release Operations Runbook (AE-21)

## Branch to Preview to Production Workflow
1. Develop in feature branch (`codex/...`).
2. Open PR to `main` and validate Vercel Preview deployment.
3. Run schema migrations in Supabase staging/project environment.
4. Execute smoke + perf checks against preview.
5. Merge PR to `main` only when checks pass.
6. Promote/deploy `main` to production in Vercel.
7. Run post-deploy smoke checks.

## Release Checklist
- [ ] `npm run lint`
- [ ] `npm run test`
- [ ] `npm run build`
- [ ] Supabase migrations applied in target environment
- [ ] Vercel env vars validated (prod/preview/development)
- [ ] `npm run ops:smoke -- <preview-url>`
- [ ] `npm run perf:critical -- <preview-url> 20`
- [ ] No blocker issues in PR review
- [ ] Merge approved

## DB Migration Gates
- Never run migration directly against production first.
- Apply migration to staging/sandbox project first.
- Validate:
  - tables/views created
  - RLS policies compile
  - app routes still pass smoke checks
- Promote same migration to production.

## Rollback Runbook

### App rollback (Vercel)
1. Identify last healthy deployment in Vercel dashboard.
2. Promote that deployment.
3. Re-run smoke checks.
4. Leave incident note with failed commit hash.

### DB rollback (Supabase)
1. Prefer forward-fix migration.
2. If urgent and safe, run explicit rollback SQL for affected objects.
3. Re-run smoke checks.
4. Verify critical routes:
   - `/`
   - `/api/stats/type-distribution`
   - `/api/stats/funnel`
   - session create/score/result loop

## Post-Deploy Smoke Command List
```bash
npm run ops:smoke -- https://agent-tea.vercel.app
npm run perf:critical -- https://agent-tea.vercel.app 20
```

## Rollback Decision Tree
- If deployment has build/runtime failure: rollback app immediately.
- If migration introduces data errors but app is up: disable affected features and forward-fix.
- If auth/session safety is impacted: rollback app and apply emergency migration fix before re-release.
