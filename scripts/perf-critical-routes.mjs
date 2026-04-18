import { loadScriptEnv } from './load-script-env.mjs';

loadScriptEnv();

function resolveBaseUrl() {
  const arg = process.argv[2]?.trim();
  if (arg) {
    return arg.replace(/\/$/, '');
  }

  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '');
  }

  return 'http://localhost:3000';
}

function percentile(values, p) {
  if (values.length === 0) {
    return 0;
  }

  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, index)];
}

function average(values) {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

async function measure(url, samples) {
  const durations = [];

  for (let i = 0; i < samples; i += 1) {
    const start = process.hrtime.bigint();
    const response = await fetch(url, {
      headers: { 'user-agent': 'agent-tea-perf/1.0' },
      redirect: 'manual',
    });
    const elapsed = Number(process.hrtime.bigint() - start) / 1_000_000;

    if (response.status >= 500) {
      throw new Error(`${url} returned ${response.status}`);
    }

    durations.push(elapsed);
  }

  return {
    p50: percentile(durations, 50),
    p95: percentile(durations, 95),
    avg: average(durations),
    min: Math.min(...durations),
    max: Math.max(...durations),
  };
}

async function run() {
  const baseUrl = resolveBaseUrl();
  const samples = Number.parseInt(process.argv[3] ?? '15', 10);

  const targets = [
    { path: '/', sloP95Ms: 1500 },
    { path: '/api/stats/type-distribution', sloP95Ms: 600 },
    { path: '/api/stats/funnel', sloP95Ms: 600 },
  ];

  console.log(`Perf target: ${baseUrl}`);
  console.log(`Samples per route: ${samples}\n`);

  let failed = 0;
  for (const target of targets) {
    const url = `${baseUrl}${target.path}`;

    try {
      const metric = await measure(url, samples);
      const pass = metric.p95 <= target.sloP95Ms;
      const flag = pass ? 'PASS' : 'FAIL';

      if (!pass) {
        failed += 1;
      }

      console.log(
        `[${flag}] ${target.path}  p50=${metric.p50.toFixed(1)}ms  p95=${metric.p95.toFixed(1)}ms  avg=${metric.avg.toFixed(1)}ms  slo(p95)<=${target.sloP95Ms}ms`,
      );
    } catch (error) {
      failed += 1;
      console.log(`[FAIL] ${target.path} ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (failed > 0) {
    console.error(`\nPerf checks failed on ${failed} route(s).`);
    process.exit(1);
  }

  console.log('\nPerf checks passed.');
}

run().catch((error) => {
  console.error('Perf script crashed.');
  console.error(error);
  process.exit(1);
});
