import { notFound } from 'next/navigation';

import { CompareExperience, type CompareItem } from '@/components/compare/CompareExperience';
import { getCompareSetResults } from '@/lib/server/session-service';

type ParamsContext = {
  params: { compareId: string } | Promise<{ compareId: string }>;
};

export default async function ComparePage(context: ParamsContext) {
  const { compareId } = await Promise.resolve(context.params);
  const payload = await getCompareSetResults(compareId);

  if (!payload || payload.sessions.length < 2) {
    notFound();
  }

  const sessions: CompareItem[] = payload.sessions.flatMap((session) => {
    if (!session.result) {
      return [];
    }

    return [
      {
        sessionId: session.sessionId,
        label: session.label,
        intakeMode: session.intakeMode,
        createdAt: session.createdAt,
        result: {
          typeCode: session.result.typeCode,
          dimensionBreakdown: session.result.dimensionBreakdown,
        },
      },
    ];
  });

  if (sessions.length < 2) {
    notFound();
  }

  return <CompareExperience sessions={sessions} />;
}
