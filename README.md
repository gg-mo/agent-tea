# Agent Tea

Your AI has tea about you. Agent Tea turns agent feedback into a personality type.

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
See [docs/deployment-env.md](docs/deployment-env.md) for required environment variables.

## Quality Checks

```bash
npm run lint
npm run test
npm run build
npm run ops:smoke -- http://localhost:3000
npm run perf:critical -- http://localhost:3000 15
```

## Phase 3/4 Ops Docs

- `docs/analytics.md`
- `docs/safety.md`
- `docs/performance.md`
- `docs/release-ops.md`
- `docs/launch-readiness.md`

## E2E Skeleton

```bash
npm run test:e2e
```

This lists Playwright tests without requiring browser installation.
Run `npm run test:e2e:run` after installing Playwright browsers.
