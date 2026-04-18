import { requireSession, scoreSessionById } from '@/lib/server/session-service';
import { jsonResponse } from '@/lib/server/http';

type ParamsContext = {
  params: { sessionId: string } | Promise<{ sessionId: string }>;
};

export async function POST(_request: Request, context: ParamsContext) {
  try {
    const { sessionId } = await Promise.resolve(context.params);
    const session = await requireSession(sessionId);
    const result = await scoreSessionById(session);

    return jsonResponse({
      sessionId,
      result,
      status: 'scored',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to score session';
    const status = message === 'Session not found' ? 404 : 500;

    return jsonResponse({ error: message }, status);
  }
}
