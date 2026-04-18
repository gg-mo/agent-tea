import { jsonResponse } from '@/lib/server/http';
import { claimSessionForUser, trackEvent } from '@/lib/server/session-service';
import { createSupabaseAuthServerClient } from '@/lib/supabase/auth-server';

type ParamsContext = {
  params: { sessionId: string } | Promise<{ sessionId: string }>;
};

export async function POST(_request: Request, context: ParamsContext) {
  try {
    const { sessionId } = await Promise.resolve(context.params);
    const supabase = await createSupabaseAuthServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return jsonResponse({ error: 'Unauthorized' }, 401);
    }

    await claimSessionForUser(sessionId, user.id);
    await trackEvent({
      sessionId,
      userId: user.id,
      eventName: 'session_claimed',
      eventSource: 'server',
    });

    return jsonResponse({ ok: true, sessionId, userId: user.id });
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : 'Failed to claim session' },
      500,
    );
  }
}
