import { jsonResponse } from '@/lib/server/http';
import { getFunnelSummary } from '@/lib/server/session-service';

export async function GET() {
  try {
    const rows = await getFunnelSummary(7);

    return jsonResponse(
      { rows },
      200,
      {
        'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=900',
      },
    );
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : 'Failed to load funnel stats' },
      500,
    );
  }
}
