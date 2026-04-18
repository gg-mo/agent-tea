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

function ms(startNs) {
  return Number(process.hrtime.bigint() - startNs) / 1_000_000;
}

async function check(url, expectedStatuses = [200]) {
  const start = process.hrtime.bigint();
  const response = await fetch(url, {
    redirect: 'manual',
    headers: { 'user-agent': 'agent-tea-smoke/1.0' },
  });
  const elapsed = ms(start);

  const ok = expectedStatuses.includes(response.status);
  return {
    url,
    status: response.status,
    elapsed,
    ok,
  };
}

async function run() {
  const baseUrl = resolveBaseUrl();
  const sessionId = process.argv[3]?.trim();

  const checks = [
    [baseUrl, [200]],
    [`${baseUrl}/api/stats/type-distribution`, [200]],
    [`${baseUrl}/api/stats/funnel`, [200]],
    [`${baseUrl}/auth`, [200]],
  ];

  if (sessionId) {
    checks.push([`${baseUrl}/results/${sessionId}`, [200, 404]]);
    checks.push([`${baseUrl}/api/sessions/${sessionId}/result`, [200, 404]]);
    checks.push([`${baseUrl}/api/share-card/${sessionId}`, [200, 404]]);
  }

  const results = [];
  for (const [url, statuses] of checks) {
    try {
      results.push(await check(url, statuses));
    } catch (error) {
      results.push({
        url,
        status: 0,
        elapsed: 0,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  console.log(`Smoke test target: ${baseUrl}`);
  console.log('');

  for (const result of results) {
    const flag = result.ok ? 'PASS' : 'FAIL';
    const time = `${result.elapsed.toFixed(1)}ms`;
    const detail = result.error ? ` (${result.error})` : '';
    console.log(`[${flag}] ${result.status} ${time} ${result.url}${detail}`);
  }

  const failures = results.filter((result) => !result.ok);
  if (failures.length > 0) {
    console.error(`\nSmoke checks failed: ${failures.length}`);
    process.exit(1);
  }

  console.log('\nAll smoke checks passed.');
}

run().catch((error) => {
  console.error('Smoke test crashed.');
  console.error(error);
  process.exit(1);
});
