import { z } from 'zod';

import { jsonResponse, safeParseJson } from '@/lib/server/http';
import { createCompareSet, trackEvent } from '@/lib/server/session-service';

const bodySchema = z.object({
  sessionIds: z.array(z.string().uuid()).min(2).max(6),
  labels: z.array(z.string().max(40)).max(6).optional(),
  ownerUserId: z.string().uuid().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await safeParseJson<unknown>(request);
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      return jsonResponse({ error: 'Invalid request body', details: parsed.error.flatten() }, 400);
    }

    const compareSet = await createCompareSet(parsed.data);
    await trackEvent({
      eventName: 'compare_created',
      eventSource: 'server',
      eventPayload: {
        compareId: compareSet.id,
        sessionCount: parsed.data.sessionIds.length,
      },
    });

    return jsonResponse({ compareId: compareSet.id, compareSet });
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : 'Failed to create compare set' },
      500,
    );
  }
}
