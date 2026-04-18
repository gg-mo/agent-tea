import { getSessionResultById } from '@/lib/server/session-service';
import { jsonResponse } from '@/lib/server/http';

type ParamsContext = {
  params: { sessionId: string } | Promise<{ sessionId: string }>;
};

export async function GET(_request: Request, context: ParamsContext) {
  try {
    const { sessionId } = await Promise.resolve(context.params);
    const result = await getSessionResultById(sessionId);

    if (!result) {
      return jsonResponse({ error: 'Result not found' }, 404);
    }

    return jsonResponse({ sessionId, result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch result';
    return jsonResponse({ error: message }, 500);
  }
}
