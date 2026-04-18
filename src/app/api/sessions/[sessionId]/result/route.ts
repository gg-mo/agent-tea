import { buildProfileCopy } from '@/lib/results/profile-copy';
import { getSessionResultById, trackEvent } from '@/lib/server/session-service';
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

    await trackEvent({
      sessionId,
      eventName: 'result_view',
      eventSource: 'server',
      eventPayload: {
        typeCode: result.typeCode,
      },
    });

    const normalProfile = buildProfileCopy({
      typeCode: result.typeCode,
      breakdown: result.dimensionBreakdown,
      strongestSignals: result.strongestSignals,
      tieFlags: result.tieFlags,
      mode: 'normal',
    });
    const intrusiveProfile = buildProfileCopy({
      typeCode: result.typeCode,
      breakdown: result.dimensionBreakdown,
      strongestSignals: result.strongestSignals,
      tieFlags: result.tieFlags,
      mode: 'intrusive',
    });

    for (const [mode, profile] of [
      ['normal', normalProfile],
      ['intrusive', intrusiveProfile],
    ] as const) {
      if (profile.moderation.rewriteCount <= 0) {
        continue;
      }

      await trackEvent({
        sessionId,
        eventName: 'moderation_rewrite',
        eventSource: 'server',
        eventPayload: {
          mode,
          typeCode: result.typeCode,
          rewriteCount: profile.moderation.rewriteCount,
          highestSeverity: profile.moderation.highestSeverity,
          terms: profile.moderation.terms,
        },
      });
    }

    return jsonResponse({ sessionId, result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch result';
    return jsonResponse({ error: message }, 500);
  }
}
