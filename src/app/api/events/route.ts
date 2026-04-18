import { z } from 'zod';

import { jsonResponse, safeParseJson } from '@/lib/server/http';
import { trackEvent } from '@/lib/server/session-service';

const bodySchema = z.object({
  eventName: z.string().min(1).max(80),
  sessionId: z.string().uuid().optional(),
  eventPayload: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await safeParseJson<unknown>(request);
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      return jsonResponse({ error: 'Invalid request body', details: parsed.error.flatten() }, 400);
    }

    await trackEvent({
      ...parsed.data,
      eventSource: 'client',
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : 'Failed to record event' },
      500,
    );
  }
}
