import { jsonResponse } from '@/lib/server/http';
import { getTypeDistributionSummary } from '@/lib/server/session-service';

export async function GET() {
  try {
    const summary = await getTypeDistributionSummary(7);

    return jsonResponse(summary, 200, {
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=900',
    });
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : 'Failed to load type distribution' },
      500,
    );
  }
}
