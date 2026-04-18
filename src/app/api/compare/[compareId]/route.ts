import { jsonResponse } from '@/lib/server/http';
import { getCompareSetResults } from '@/lib/server/session-service';

type ParamsContext = {
  params: { compareId: string } | Promise<{ compareId: string }>;
};

export async function GET(_request: Request, context: ParamsContext) {
  try {
    const { compareId } = await Promise.resolve(context.params);
    const compare = await getCompareSetResults(compareId);

    if (!compare) {
      return jsonResponse({ error: 'Compare set not found' }, 404);
    }

    return jsonResponse(compare);
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : 'Failed to load compare set' },
      500,
    );
  }
}
