import { createSessionBodySchema } from '@/lib/ingestion/ingestion-schemas';
import { createSession } from '@/lib/server/session-service';
import { jsonResponse, safeParseJson } from '@/lib/server/http';

export async function POST(request: Request) {
  try {
    const body = await safeParseJson<unknown>(request);
    const parsed = createSessionBodySchema.safeParse(body);

    if (!parsed.success) {
      return jsonResponse(
        {
          error: 'Invalid request body',
          details: parsed.error.flatten(),
        },
        400,
      );
    }

    const intakeMode = parsed.data?.intakeMode ?? 'manual';

    const created = await createSession({
      intakeMode,
      questionSetVersion: parsed.data?.questionSetVersion,
    });

    return jsonResponse({
      sessionId: created.session.id,
      intakeMode: created.session.intakeMode,
      questionSetVersion: created.session.questionSetVersion,
      randomSeed: created.session.randomSeed,
      questions: created.questions,
    });
  } catch (error) {
    return jsonResponse(
      {
        error: error instanceof Error ? error.message : 'Failed to create session',
      },
      500,
    );
  }
}
