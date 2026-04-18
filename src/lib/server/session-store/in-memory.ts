import { getBundledQuestionSet } from '@/lib/server/session-store/spec-loader';
import type {
  CompareSetRow,
  EventLogInput,
  FunnelStatsRow,
  InstructionRun,
  PersistedAnswer,
  PersistedResult,
  QuestionRow,
  QuestionSetRow,
  SessionRow,
  SessionStatus,
  SessionStore,
  TypeDistributionRow,
} from '@/lib/server/session-store/types';

type StoreState = {
  questionSet: QuestionSetRow;
  questions: QuestionRow[];
  sessions: Map<string, SessionRow>;
  answers: Map<string, Map<string, PersistedAnswer>>;
  results: Map<string, PersistedResult>;
  instructionRuns: InstructionRun[];
  eventLog: Array<{
    sessionId?: string;
    userId?: string;
    eventName: string;
    eventSource: 'client' | 'server';
    eventPayload: Record<string, unknown>;
    createdAt: string;
  }>;
  compareSets: Map<string, CompareSetRow>;
};

function createInitialState(): StoreState {
  const bundled = getBundledQuestionSet();

  return {
    questionSet: {
      id: bundled.id,
      version: bundled.version,
    },
    questions: bundled.questions,
    sessions: new Map(),
    answers: new Map(),
    results: new Map(),
    instructionRuns: [],
    eventLog: [],
    compareSets: new Map(),
  };
}

let state = createInitialState();

function nowIso() {
  return new Date().toISOString();
}

function daysAgo(days: number): number {
  return Date.now() - days * 24 * 60 * 60 * 1000;
}

export function resetInMemorySessionStore() {
  state = createInitialState();
}

export const inMemorySessionStore: SessionStore = {
  async getActiveQuestionSet(version) {
    if (version && version !== state.questionSet.version) {
      return null;
    }

    return state.questionSet;
  },

  async getQuestions(questionSetId) {
    if (questionSetId !== state.questionSet.id) {
      return [];
    }

    return [...state.questions];
  },

  async createSession(input) {
    const timestamp = nowIso();
    const session: SessionRow = {
      id: crypto.randomUUID(),
      questionSetId: input.questionSetId,
      questionSetVersion: input.questionSetVersion,
      intakeMode: input.intakeMode,
      status: 'pending',
      randomSeed: input.randomSeed,
      referralCode: input.referralCode,
      referrerSessionId: input.referrerSessionId,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    state.sessions.set(session.id, session);

    return session;
  },

  async getSession(sessionId) {
    return state.sessions.get(sessionId) ?? null;
  },

  async listSessionsByUser(userId) {
    return [...state.sessions.values()]
      .filter((session) => session.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async attachSessionToUser(sessionId, userId) {
    const session = state.sessions.get(sessionId);

    if (!session) {
      return;
    }

    state.sessions.set(sessionId, {
      ...session,
      userId,
      updatedAt: nowIso(),
    });
  },

  async upsertAnswers(sessionId, answers) {
    const sessionAnswers = state.answers.get(sessionId) ?? new Map<string, PersistedAnswer>();

    for (const answer of answers) {
      sessionAnswers.set(answer.questionCode, answer);
    }

    state.answers.set(sessionId, sessionAnswers);
  },

  async getAnswers(sessionId) {
    const answers = state.answers.get(sessionId);

    if (!answers) {
      return [];
    }

    return [...answers.values()];
  },

  async setSessionStatus(sessionId, status: SessionStatus) {
    const session = state.sessions.get(sessionId);

    if (!session) {
      return;
    }

    state.sessions.set(sessionId, {
      ...session,
      status,
      completedAt: status === 'scored' ? nowIso() : session.completedAt,
      updatedAt: nowIso(),
    });
  },

  async recordInstructionRun(input) {
    state.instructionRuns.push(input);
  },

  async recordEvent(input: EventLogInput) {
    state.eventLog.push({
      sessionId: input.sessionId,
      userId: input.userId,
      eventName: input.eventName,
      eventSource: input.eventSource ?? 'server',
      eventPayload: input.eventPayload ?? {},
      createdAt: nowIso(),
    });
  },

  async upsertResult(sessionId, result) {
    state.results.set(sessionId, result);
  },

  async getResult(sessionId) {
    return state.results.get(sessionId) ?? null;
  },

  async getTypeDistribution(days: number): Promise<TypeDistributionRow[]> {
    const cutoff = daysAgo(days);
    const sessionById = state.sessions;
    const counts = new Map<string, number>();

    for (const [sessionId, result] of state.results.entries()) {
      const session = sessionById.get(sessionId);
      if (!session) {
        continue;
      }

      if (new Date(session.createdAt).getTime() < cutoff) {
        continue;
      }

      counts.set(result.typeCode, (counts.get(result.typeCode) ?? 0) + 1);
    }

    return [...counts.entries()]
      .map(([typeCode, count]) => ({ typeCode, count }))
      .sort((a, b) => b.count - a.count);
  },

  async getFunnelStats(days: number): Promise<FunnelStatsRow[]> {
    const cutoff = daysAgo(days);
    const stages = new Map<string, number>([
      ['landing_view', 0],
      ['session_created', 0],
      ['session_scored', 0],
      ['share_click', 0],
    ]);

    for (const event of state.eventLog) {
      if (new Date(event.createdAt).getTime() < cutoff) {
        continue;
      }

      if (stages.has(event.eventName)) {
        stages.set(event.eventName, (stages.get(event.eventName) ?? 0) + 1);
      }
    }

    const landing = stages.get('landing_view') ?? 0;
    const created = stages.get('session_created') ?? 0;
    const scored = stages.get('session_scored') ?? 0;
    const shared = stages.get('share_click') ?? 0;
    const rows: Array<{ stage: string; count: number; previous: number | null }> = [
      { stage: 'landing_view', count: landing, previous: null },
      { stage: 'session_created', count: created, previous: landing },
      { stage: 'session_scored', count: scored, previous: created },
      { stage: 'share_click', count: shared, previous: scored },
    ];

    return rows.map((row) => ({
      stage: row.stage,
      count: row.count,
      conversionFromPrevious:
        row.previous === null || row.previous === 0 ? null : row.count / row.previous,
      conversionFromStart: landing === 0 ? null : row.count / landing,
    }));
  },

  async createCompareSet(input): Promise<CompareSetRow> {
    const compareSet: CompareSetRow = {
      id: crypto.randomUUID(),
      ownerUserId: input.ownerUserId,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      items: input.sessionIds.map((sessionId, index) => ({
        sessionId,
        label: input.labels?.[index],
      })),
    };

    state.compareSets.set(compareSet.id, compareSet);

    return compareSet;
  },

  async getCompareSet(compareSetId): Promise<CompareSetRow | null> {
    return state.compareSets.get(compareSetId) ?? null;
  },
};
